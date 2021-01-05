
## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly, Software Engineering Immersive


# Project #4: Travel Explorer


## Overview 

The final project at GA was to create a full-stack web application. This two-person, week-long project utilised a Python Flask RESTful API.
TravelExplorer allows users to navigate the world, exploring new cities and find some new places and even suggest an itinerary for specified dates. User functionality allows the creation of travel wish-lists, and comments and reviews.
The idea was born out of a mutual love for travel and frustration with the lack of user interaction with travel websites, specifically as a place to plan a trip! 
You can find the project here.


## Technologies

* React
* Python
* Flask
* CSS
* Bulma
* npm
* Git and GitHub
* Ziteboard
* Libraries
* Moment.js
* Marshmallow
* PostgreSQL
* SQLAlchemy
* Insominia
* TablePlus
* APIs
	- Triposo
	- Open Cage


## Brief

### Requirements

​* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Flask API** using a Flask REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
* **Be deployed online** so it's publicly accessible.
* **A working app** hosted on the internet
* **A link to your hosted working app** in the URL section of your Github repo
* **A git repository hosted on Github**, with a link to your hosted project, and frequent commits dating back to the _very beginning_ of the project


### Suggested Enhancements


## Approach

### Wireframes

We used a mixture of ziteboard and googledocs to outline what we wanted to achieve. A combination of blueprints and to-do lists:

![wireframe](screenshots/Wireframe_F1.png)
![wireframe](screenshots/Wireframe_F2.png)
![wireframe](screenshots/WF1.png)
![wireframe](screenshots/WF2.png)

### FrontEnd?
### BackEnd?
### Folders


## Screenshots

![screenshot](screenshots/2.png)

<img src="screenshots/1.png" alt="Home Page" width="49.5%"> <img src="screenshots/3.png" alt="Map" width="49.5%">
<img src="screenshots/4.png" alt="Results" width="49.5%"> <img src="screenshots/5.png" alt="City" width="49.5%">
<img src="screenshots/6.png" alt="Place" width="49.5%"> <img src="screenshots/7.png" alt="Profile" width="49.5%">

![screenshot](screenshots/8.png)







## Challenges / Victories


### Creating & Adding to Folders 

A feature we really wanted to include was to be able to create a folder in order to add a place to it in a single step. Rather than writing a new route in the backend we linked the two existing routes with a .then in the frontend and then re-rendered the page with the updated information which allows the new folder to be displayed as soon as it has been created.

Backend:

```
# * Create folder ------------

@router.route('/folders', methods=['POST'])
@secure_route
def create_folder():
  folder_data = request.get_json()
  user = g.current_user
  user_folder = g.current_user.folder
  folder = folder_schema.load(folder_data)
  user_folder.append(folder)
  user.save()
  folder.save()
  return folder_schema.jsonify(folder), 200
  
  
# * Add place to folder ------------

@router.route('/folders/<int:folder_id>/<int:place_id>', methods=['POST'])
def add_place_to_folder(folder_id, place_id):
  place = Place.query.get(place_id)
  folder = Folder.query.get(folder_id)
  id_list = []
  new_folder = []
  for x in folder.places:
      id_list.append(x.id)
  if place_id in id_list:
    print('already in folder')
    new_folder = folder.places
  else:
    print('not in folder')
    new_folder = folder.places + [place]

  folder.places = new_folder  
  folder.save()
  
  return populate_place.jsonify(place)
```

Frontend:

```
  function createAndAddToFolder(name) {
    openCreateAndAddModal()
    updateAddRemoveName(name)
    axios.post('/api/folders', { 'name': name, 'public': toggle }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        axios.post(`/api/folders/${resp.data.id}/${singlePlace.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(resp => {
            updateSinglePlace(resp.data)
            updateCurrentFolders(resp.data.folder.map(folder => {
              return folder
            }))
          })
      })
  }
```

### Password Confirmation

This is something that we would have liked to have spent more time on as it is by no means perfect code for what we wanted to achieve. In order to get the confirmation to work, we had to save the 'passwordConfirmation' in the DB...not something that should really be in there, so we ended up hashing the confirmation as well as the password so as not to leave it visible - but this is now redundant as it is only used when registering so there is no need to save it anyway. As I say, it would have been nice to spend more time on this and clean it up, despite it currently working.

```
class User(db.Model, BaseModel):

  __tablename__ = 'users'

  username = db.Column(db.String(15), nullable=False, unique=True)
  email = db.Column(db.String(128), nullable=False, unique=True)
  password_hash = db.Column(db.String(128), nullable=False)
  passwordConfirmation_hash = db.Column(db.String(128), nullable=False)
  folder = db.relationship('Folder', secondary=users_folder_join, backref='users')


  @hybrid_property
  def password(self):
    pass


  @password.setter
  def password(self, password_plaintext):
    self.password_hash = bcrypt.generate_password_hash(password_plaintext).decode('utf-8')

  def validate_password(self, password_plaintext):
    return bcrypt.check_password_hash(self.password_hash, password_plaintext)


  def generate_token(self):
    payload = {
      'exp': datetime.utcnow() + timedelta(days=1),
      'iat': datetime.utcnow(),
      'sub': self.id
    }

    token = jwt.encode(
      payload,
      secret,
      'HS256'
    ).decode('utf-8')

    return token

  @hybrid_property
  def passwordConfirmation(self):
    pass

  @passwordConfirmation.setter
  def passwordConfirmation(self, passwordConfirmation_plaintext):
    self.passwordConfirmation_hash = bcrypt.generate_password_hash(passwordConfirmation_plaintext).decode('utf-8')

  def validate_passwordConfirmation(self, passwordConfirmation_plaintext):
    return bcrypt.check_passwordConfirmation_hash(self.passwordConfirmation_hash, passwordConfirmation_plaintext)
```

<img src="screenshots/9.png" alt="Password Confirmation" width="25%"> 

## Known bugs

* ***Trip Planner Colours*** - This is an issue we encountered with deployment. Locally the inputs look as we want them to look - however once deployed, they have changed colour.

![screenshot](screenshots/Trip_Planner_Bug.png)

## Potential future features

## Images

* Background image by [Rana Sawalha on Unsplash] (https://unsplash.com/@ranasawalha)

* Background image by [Dariusz Sankowski
on Unsplash] (https://unsplash.com/@dariuszsankowski)

* Background image by [Kira auf der Heide on Unsplash] (https://unsplash.com/@kadh)

* Background image by [L B on Unsplash] (https://unsplash.com/@iliketobike)

* Background image by [Cynthia del Río
on Unsplash] (https://unsplash.com/@luthiabags)


