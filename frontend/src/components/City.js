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
  const [name, updateName] = useState('')


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
        updateName(resp.data.city_info.content.title)
        
        // Removing HTML tags from description
        const cleanDesc = resp.data.city_info.content.sections[0].body.replace(/<[^>]+>/g, '')
        updateCleanCityDescription(cleanDesc)
        
        // set viewport
        const latitude = resp.data.city_info.coordinates.latitude
        const longitude = resp.data.city_info.coordinates.longitude
        
        setViewPort({
          height: '50vh',
          width: '100vw', 
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
              {name}
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
        </MapGL>
      </div>
    </section>

 
    <section className="section">
      <section className="hero is-light is-small has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
            EAT
            </h1>
            <p>Find the best places to eat...</p>
          </div>
        </div>
      </section>
      <div className="eat" >
        {eat.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card" style={{ margin: '10px' }}>
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                <p className="media-right">{place.score.toString()[0]}/10</p>
                  
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
      <section className="hero is-light is-small has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
            DRINK
            </h1>
            <p>Find the best places to drink...</p>
          </div>
        </div>
      </section>
      <div className="drink" >
        {drink.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                <p className="media-right">{place.score.toString()[0]}/10</p>
                  
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
      <section className="hero is-light is-small has-text-centered">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
            SEE
            </h1>
            <p>Find the sights...</p>
          </div>
        </div>
      </section>
      <div className="see" >
        {see.map((place, index) => {
          return <Link to={`/places/${place.id}`} key={index}>
            <div key={index} className="card">
              <header className="card-header">
                <p className="card-header-title">{place.name}</p>
                <p className="media-right">{place.score.toString()[0]}/10</p>
                  
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