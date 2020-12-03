from app import app, db
from models.user import User

with app.app_context():
  db.drop_all()
  db.create_all()

  sean = User(
    username="sean",
    email="sean@sean.com",
    password="sean"
  )

  sean.save()

  theo = User(
    username="theo",
    email="theo@theo.com",
    password="theo"
  )

  theo.save()

  oxford_street = Place(
    name='Oxford Street',
    description='Oxford Street is a major road in the City of Westminster in the West End of London, running from Tottenham Court Road to Marble Arch via Oxford Circus. It is Europe\'s busiest shopping street, with around half a million daily visitors, and as of 2012 had approximately 300 shops. It is designated as part of the A40, a major road between London and Fishguard, though it is not signed as such, and traffic is regularly restricted to buses and taxis.\nThe road was originally part of the Via Trinobantina, a Roman road between Essex and Hampshire via London. It was known as Tyburn Road through the Middle Ages when it was notorious for public hangings of prisoners at Tyburn Gallows. It became known as Oxford Road and then Oxford Street in the 18th century, and began to change from residential to commercial and retail use by the late 19th century, attracting street traders, confidence tricksters and prostitution. The first department stores in the UK opened in the early 20th century, including Selfridges, John Lewis & Partners and HMV. Unlike nearby shopping streets such as Bond Street, it has retained an element of downmarket trading alongside more prestigious retail stores. The street suffered heavy bombing during World War II, and several longstanding stores including John Lewis were completely destroyed and rebuilt from scratch.\nDespite competition from other shopping centres such as Westfield Stratford City and the Brent Cross Shopping Centre, Oxford Street remains in high demand as a retail location, with several chains having their flagship stores on the street, and has a number of listed buildings. The annual switching on of Christmas lights by a celebrity has been a popular event since 1959. As a popular retail area and main thoroughfare for London buses and taxis, Oxford Street has suffered from traffic congestion, pedestrian congestion, a poor safety record and pollution. Various traffic management schemes have been implemented by Transport for London (TfL), including a ban on private vehicles during daytime hours on weekdays and Saturdays, and improved pedestrian crossings.',
    location=[51.515312, -0.142025],
    pictures=['https://upload.wikimedia.org/wikipedia/en/a/a6/Oxford_Street_1882.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Oxford_Street_%28geograph_4949395%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Bond_Street_Station_entrance_on_Oxford_Street_-_geograph.org.uk_-_1849747.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/48/Stanley_Green_by_Sean_Hickin%2C_Oxford_Street%2C_London%2C_1974_%282%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/c/ca/London_Oxford_Street_Selfridges_shop_in_1987.jpg', 'https://upload.wikimedia.org/wikipedia/commons/2/23/HMV_%287599445440%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/5/50/100-club-oxford-st-london.jpg', 'https://upload.wikimedia.org/wikipedia/commons/4/49/Oxford_Street_December_2006.jpeg', 'https://upload.wikimedia.org/wikipedia/commons/9/9f/London_Christmas_2016_%2832909695696%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/d/d6/147_Oxford_Street_%288291038587%29.jpg'],
    place_id='Oxford_Street',
    score=9.98052217263237
  )

  rules = Place(
    name='Rules',
    description='Rules is a gay restaurant in London, frequented by great foodies for its amazing wines, excellent cocktails and perfect whiskey sour. Pretty big portions and very friendly service. An extensive wine list and great acoustics and excellent atmosphere. Good value for money.',
    location=[51.51082267500512, -0.12319120453024995],
    pictures=['https://upload.wikimedia.org/wikipedia/commons/e/ee/Rules%2C_London%27s_oldest_restaurant._-_geograph.org.uk_-_510375.jpg'],
    place_id='N__1598420155',
    score=6.05745148329591
  )
 
  blackbushe_airport = Place(
    name='Blackbushe_Aiport',
    description='Blackbushe Airport is an operational general aviation airport in the civil parish of Yateley in the north-east corner of the English county of Hampshire. Built during the Second World War, Blackbushe is north of the A30 road between Camberley and Hook. It for a time straddled this road with traffic having to wait whilst airliners were towed across. The southside was used for aircraft maintenance, utilising wartime-built hangars. Today, only the part of the airfield section that lay north of the A30 remains in active use. The traditional name for the flat piece of land on which it is sited is Hartford Bridge Flats. The nearest towns are Yateley and Fleet. Blackbushe Aerodrome has a CAA Ordinary Licence (Number P693) that allows flights for the public transport of passengers or for flying instruction as authorised by the licensee (Blackbushe Airport Limited). The aerodrome is licensed for night use. It is one of several airfields eclipsed since 1958 by the growth of London Heathrow Airport and London Gatwick Airport. Blackbush was once a significant airport for passenger and cargo charter flights for the London area. Currently based aircraft include several corporate jets, two flying schools, a helicopter training facility, as well as Aerobility, a flying charity. The airport is open to the general public and is also popular for walks around its perimeter and to see the wildlife in Yateley Common and Castle Bottom National Nature reserve.',
    location=[51.323888888888895, -0.8475],
    pictures=['https://upload.wikimedia.org/wikipedia/commons/9/95/Airwork_Hermes_IVA_at_Blackbushe.jpg', 'https://upload.wikimedia.org/wikipedia/en/6/61/Blackbushe_Airport_Logo.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/ae/US_Navy_P2V-5_Neptune_at_Blackbushe.jpg', 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Blackbushe_Airport_Vision_Apron_04.jpg', 'https://upload.wikimedia.org/wikipedia/commons/0/06/BlackBushe-21O13-wyrdlight.jpg', 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Blackbushe_Airport.jpg'],
    place_id='Blackbushe_Airport',
    score=0.500000000000001
  )

  british_museum = Place(
    name='British Museum',
    description='The British Museum, in the Bloomsbury area of London, United Kingdom, is a public institution dedicated to human history, art and culture. Its permanent collection of some eight million works is among the largest and most comprehensive in existence, having been widely sourced during the era of the British Empire. It documents the story of human culture from its beginnings to the present. It was the first public national museum in the world. The British Museum was established in 1753, largely based on the collections of the Irish physician and scientist Sir Hans Sloane. It first opened to the public in 1759, in Montagu House, on the site of the current building. Its expansion over the following 250 years was largely a result of expanding British colonisation and has resulted in the creation of several branch institutions, the first being the Natural History Museum in 1881. In 1973, the British Library Act 1972 detached the library department from the British Museum, but it continued to host the now separated British Library in the same Reading Room and building as the museum until 1997. The museum is a non-departmental public body sponsored by the Department for Digital, Culture, Media and Sport, and as with all national museums in the UK it charges no admission fee, except for loan exhibitions. Its ownership of some of its most famous objects originating in other countries is disputed and remains the subject of international controversy, most notably in the case of the Elgin Marbles of Greece and the Rosetta Stone of Egypt.',
    location=[51.5191205, -0.1246918],
    pictures=['https://upload.wikimedia.org/wikipedia/commons/8/86/British_Museum_%28aerial%29.jpg', 'https://upload.wikimedia.org/wikipedia/commons/5/5a/British_Museum_Great_Court%2C_London%2C_UK_-_Diliff.jpg', 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Entrance_ticket_to_the_British_Museum%2C_London_March_3%2C_1790.jpg', 'https://upload.wikimedia.org/wikipedia/commons/9/92/P8282318.1.JPG', 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Mauso03.JPG'],
    place_id='W__40405915',
    score=9.96045453652326
  )
  
  print('Users created')

  print('Completed!')