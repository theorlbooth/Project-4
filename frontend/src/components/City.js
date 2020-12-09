import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MapGL, { Marker } from 'react-map-gl'

const City = (props) => {

  const [city, updateCity] = useState({})
  const [eat, updateEat] = useState([])
  const [drink, updateDrink] = useState([])
  const [see, updateSee] = useState([])
  const [cityDesc, updateCityDesc] = useState('')
  const [cleanCityDescription, updateCleanCityDescription] = useState('')
  const [showEat, updateShowEat] = useState(false)
  const [showDrink, updateShowDrink] = useState(false)
  const [showSee, updateShowSee] = useState(false)


  const [viewPort, setViewPort] = useState({
    height: '30vh',
    width: '100vw', 
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551
  })

  useEffect(() => {
    axios.get(`/api/cities/${props.match.params.city_id}`)
      .then(resp => {
        updateCity(resp.data.city_info)
        updateCityDesc(resp.data.city_info.content.sections[0].body)
        updateEat(resp.data.eat)
        updateDrink(resp.data.drink)
        updateSee(resp.data.see)
        
        // Removing HTML tags from description
        const cleanDesc = resp.data.city_info.content.sections[0].body.replace(/<[^>]+>/g, '')
        updateCleanCityDescription(cleanDesc)
        
        // set viewport
        const latitude = resp.data.city_info.coordinates.latitude
        const longitude = resp.data.city_info.coordinates.longitude
        
        setViewPort({
          height: '30vh',
          width: '90vw', 
          zoom: 12,
          latitude: latitude,
          longitude: longitude
        })

      })
  }, [])

  console.log('re-render')

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
            <p>{cleanCityDescription}</p>
          </div>
        </div>
      </section>
    </section>
    
    <section className="section map">
      <div className="contain">
        <MapGL
        
          mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
          { ...viewPort }
          onViewportChange={(viewPort) => setViewPort(viewPort)}
        >
          {/* {countries.map((country, index) => {
            return <Link to={`country/${country.alpha2code}`} key={index}>
              <Marker 
                latitude={country.lat}
                longitude={country.long}
              >
                <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
              </Marker>
            </Link> */}
          {/* })} */}
          
        </MapGL>
      </div>
    </section>

    {/* <section className="section">
      <div className="columns">
        <div className="column">
          <div className="card">
            EAT
          </div>
        </div>
        <div className="column">
          <div className="card">
            DRINK
          </div>
        </div>
        <div className="column">
          <div className="card">
            SEE
          </div>
        </div>
      </div>
    </section>
     */}

    {/* <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          WHERE TO EAT
        </div>
      </div>
      <div className="eat columns is-multiline" >
        {eat.map((place, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/places/${place.id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <h4 className="title is-4">{place.name}</h4>
                    <p className="subtitle is-4">{place.intro}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
            
            
        })} 
      </div>
    </section> */}
    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          WHERE TO EAT
        </div>
      </div>
      <div className="eat" >
        {eat.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                  
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{place.intro}</p>
                </div>
              </div>
            </div>
          </Link>
        })} 
      </div>
    </section>

    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          WHERE TO DRINK
        </div>
      </div>

      <div className="drink" >
        {drink.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                  
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{place.intro}</p>
                </div>
              </div>
            </div>
          </Link>
        })} 
      </div>
    </section>

    <section className="section">
      <div className="container is-fluid">
        <div className="notification is-primary">
          WHAT TO SEE
        </div>
      </div>
      <div className="see" >
        {see.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                  
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{place.intro}</p>
                </div>
              </div>
            </div>
          </Link>
        })} 
      </div>
    </section>
  </div>
  
}

export default City