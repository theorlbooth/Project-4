from app import app, db
from models.user import User
from models.place import Place
from models.comment import Comment
from models.country import Country

import requests
from models.folder import Folder

with app.app_context():
  db.drop_all()
  db.create_all()

  # resp = requests.get('https://restcountries.eu/rest/v2/all')
  # country_list = resp.json()
  # for country in country_list:
  #   latlong = country['latlng']
    
  
  #   country['name'] = Country(
  #     name=country['name']
  #     lat=latlong[0],
  #     long=latlong[1],
  #     region=country['region'],
  #     subregion=country['subregion'],
  #     alpha2code=country['alpha2Code']
  #   )
  #   country['name'].save()
# !each country is not declared as variable/item...
  amsterdam = Folder(name='Amsterdam')
  amsterdam.save()

  paris = Folder(name='Paris')
  paris.save()

  sean = User(
    username="sean",
    email="sean@sean.com",
    password="sean",
    folder=[paris]
  )
  sean.save()

  theo = User(
    username="theo",
    email="theo@theo.com",
    password="theo",
    folder=[amsterdam]
  )
  theo.save()

  print('Users created')

  oxford_street = Place(
    name='Oxford Street',
    description='Oxford Street is a major road in the City of Westminster in the West End of London, running from Tottenham Court Road to Marble Arch via Oxford Circus. It is Europe\'s busiest shopping street, with around half a million daily visitors, and as of 2012 had approximately 300 shops. It is designated as part of the A40, a major road between London and Fishguard, though it is not signed as such, and traffic is regularly restricted to buses and taxis.\nThe road was originally part of the Via Trinobantina, a Roman road between Essex and Hampshire via London. It was known as Tyburn Road through the Middle Ages when it was notorious for public hangings of prisoners at Tyburn Gallows. It became known as Oxford Road and then Oxford Street in the 18th century, and began to change from residential to commercial and retail use by the late 19th century, attracting street traders, confidence tricksters and prostitution. The first department stores in the UK opened in the early 20th century, including Selfridges, John Lewis & Partners and HMV. Unlike nearby shopping streets such as Bond Street, it has retained an element of downmarket trading alongside more prestigious retail stores. The street suffered heavy bombing during World War II, and several longstanding stores including John Lewis were completely destroyed and rebuilt from scratch.\nDespite competition from other shopping centres such as Westfield Stratford City and the Brent Cross Shopping Centre, Oxford Street remains in high demand as a retail location, with several chains having their flagship stores on the street, and has a number of listed buildings. The annual switching on of Christmas lights by a celebrity has been a popular event since 1959. As a popular retail area and main thoroughfare for London buses and taxis, Oxford Street has suffered from traffic congestion, pedestrian congestion, a poor safety record and pollution. Various traffic management schemes have been implemented by Transport for London (TfL), including a ban on private vehicles during daytime hours on weekdays and Saturdays, and improved pedestrian crossings.',
    lat=51.515312,
    long=-0.142025,
    picture='https://upload.wikimedia.org/wikipedia/en/a/a6/Oxford_Street_1882.jpg',
    place_id='Oxford_Street',
    score=9.98052217263237, 
    user_id=1,
    folder=[amsterdam]
  )
  oxford_street.save()

  rules = Place(
    name='Rules',
    description='Rules is a gay restaurant in London, frequented by great foodies for its amazing wines, excellent cocktails and perfect whiskey sour. Pretty big portions and very friendly service. An extensive wine list and great acoustics and excellent atmosphere. Good value for money.',
    lat=51.51082267500512,
    long=-0.12319120453024995,
    picture='https://upload.wikimedia.org/wikipedia/commons/e/ee/Rules%2C_London%27s_oldest_restaurant._-_geograph.org.uk_-_510375.jpg',
    place_id='N__1598420155',
    score=6.05745148329591, 
    user_id=1,
    folder=[amsterdam]
  )
  rules.save()

  blackbushe_airport = Place(
    name='Blackbushe_Aiport',
    description='Blackbushe Airport is an operational general aviation airport in the civil parish of Yateley in the north-east corner of the English county of Hampshire. Built during the Second World War, Blackbushe is north of the A30 road between Camberley and Hook. It for a time straddled this road with traffic having to wait whilst airliners were towed across. The southside was used for aircraft maintenance, utilising wartime-built hangars. Today, only the part of the airfield section that lay north of the A30 remains in active use. The traditional name for the flat piece of land on which it is sited is Hartford Bridge Flats. The nearest towns are Yateley and Fleet. Blackbushe Aerodrome has a CAA Ordinary Licence (Number P693) that allows flights for the public transport of passengers or for flying instruction as authorised by the licensee (Blackbushe Airport Limited). The aerodrome is licensed for night use. It is one of several airfields eclipsed since 1958 by the growth of London Heathrow Airport and London Gatwick Airport. Blackbush was once a significant airport for passenger and cargo charter flights for the London area. Currently based aircraft include several corporate jets, two flying schools, a helicopter training facility, as well as Aerobility, a flying charity. The airport is open to the general public and is also popular for walks around its perimeter and to see the wildlife in Yateley Common and Castle Bottom National Nature reserve.',
    lat=51.323888888888895, 
    long=-0.8475,
    picture='https://upload.wikimedia.org/wikipedia/commons/9/95/Airwork_Hermes_IVA_at_Blackbushe.jpg',
    place_id='Blackbushe_Airport',
    score=0.500000000000001, 
    user_id=2,
    folder=[paris]
  )
  blackbushe_airport.save()

  british_museum = Place(
    name='British Museum',
    description='The British Museum, in the Bloomsbury area of London, United Kingdom, is a public institution dedicated to human history, art and culture. Its permanent collection of some eight million works is among the largest and most comprehensive in existence, having been widely sourced during the era of the British Empire. It documents the story of human culture from its beginnings to the present. It was the first public national museum in the world. The British Museum was established in 1753, largely based on the collections of the Irish physician and scientist Sir Hans Sloane. It first opened to the public in 1759, in Montagu House, on the site of the current building. Its expansion over the following 250 years was largely a result of expanding British colonisation and has resulted in the creation of several branch institutions, the first being the Natural History Museum in 1881. In 1973, the British Library Act 1972 detached the library department from the British Museum, but it continued to host the now separated British Library in the same Reading Room and building as the museum until 1997. The museum is a non-departmental public body sponsored by the Department for Digital, Culture, Media and Sport, and as with all national museums in the UK it charges no admission fee, except for loan exhibitions. Its ownership of some of its most famous objects originating in other countries is disputed and remains the subject of international controversy, most notably in the case of the Elgin Marbles of Greece and the Rosetta Stone of Egypt.',
    lat=51.5191205,
    long=-0.1246918,
    picture='https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg',
    place_id='W__40405915',
    score=9.96045453652326, 
    user_id=2,
    folder=[paris]
  )
  british_museum.save()

  print('Places created')

  comment_1 = Comment(
    content='This is a great museum',
    place=british_museum,
    rating=9.8784,
    user_id=1
  )
  comment_1.save()

  comment_2 = Comment(
    content='This is an overpriced cafe',
    place=rules,
    rating=5.556,
    user_id=2
  )
  comment_2.save()
  
  print('Comments created')

  print('Completed!')