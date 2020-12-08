import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const City = (props) => {

  const [city, updateCity] = useState({})
  const [eat, updateEat] = useState([])
  const [drink, updateDrink] = useState([])
  const [see, updateSee] = useState([])
  

  useEffect(() => {
    axios.get(`/api/cities/${props.match.params.city_id}`)
      .then(resp => {
        updateCity(resp.data.city_info)
        updateEat(resp.data.eat)
        updateDrink(resp.data.drink)
        updateSee(resp.data.see)
        console.log(resp.data.city_info)
        console.log(resp.data.eat)
        console.log(resp.data.drink)
        console.log(resp.data.see)
      })
  }, [])
  console.log(city)
  const content = city.content
  console.log(typeof(eat))
  console.log(content)

  const array = [1, 2, 3]
  console.log(typeof(array))

  return <div className="body">

    <section className="Section">
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              {city.id}
            </h1>
            <h2 className="subtitle">
              {city.country_id}
            </h2>
          </div>
        </div>
      </section>
    </section>

    
    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          BEST PLACES TO EAT
        </div>
      </div>
      <div className="eat columns is-multiline">
        {eat.map((place, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/places/${place.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <h4 className="title is-4">{place.name}</h4>
                    {/* <p className="subtitle is-4">{place.score}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
            
            
        })} 
      </div>
  </section>

    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          BEST PLACES TO DRINK
        </div>
      </div>
      <div className="drink columns is-multiline">
        <h1>DRINK</h1>
        {drink.map((place, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/places/${place.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <h4 className="title is-4">{place.name}</h4>
                    {/* <p className="subtitle is-4">{place.score}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })} 
      </div>
    </section>

    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          BEST PLACES TO SEE
        </div>
      </div>
      <div className="see columns is-multiline">
        {see.map((place, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/places/${place.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <h4 className="title is-4">{place.name}</h4>
                    {/* <p className="subtitle is-4">{place.score}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        })} 
      </div>
    </section>
  </div>
  
}

export default City