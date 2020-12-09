import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'

import { Link } from 'react-router-dom'


const Explore = () => {

  const [countries, updateCountries] = useState([])
  const [search, updateSearch] = useState('')
  const [searchType, updateSearchType] = useState('')
  const [searchID, updateSearchID] = useState('')
  
  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw', 
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551
  })
  
  useEffect(() => {
    axios.get('/api/countries')
      .then(resp => {
        updateCountries(resp.data)
      })
  }, [])

  function handleSubmit(search) {
    if (searchType === 'type_country') {
      axios.get(`/api/country_search/${search}`)
        .then(resp => {
          updateSearchID(resp.data.results[0].id)
        })
    } else {
      axios.get(`/api/city_search/${search}`)
        .then(resp => {
          updateSearchID(resp.data.results[0].id)
        })
    }
  }

  useEffect(() => {
    console.log(searchID)
  }, [searchID])


  return <div>

    <section className="hero is-primary is-medium">
      <div className="hero-body">
        <div className="container">
          <div className="field">
            <div className="control">
              <input 
                className="input" 
                type="text" 
                placeholder="Search" 
                onChange={(event) => updateSearch(event.target.value)}
                value={search}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              SEARCH BY:   
              <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('type_country')}/>
                  COUNTRY
              </label>
              <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('type_city')}/>
                CITY
              </label>
              {/* <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('type_place')}/>
                PLACE
              </label> */}
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={() => handleSubmit(search)}>Search</button>
            </div>
          </div>
        </div>
      </div>
      
    </section>

    <section className="section map">
      <div className="contain">
        <MapGL
        
          mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
          { ...viewPort }
          onViewportChange={(viewPort) => setViewPort(viewPort)}
        >
          {countries.map((country, index) => {
            return <Link to={`country/${country.alpha2code}`} key={index}>
              <Marker 
                latitude={country.lat}
                longitude={country.long}
              >
                <img className="marker" src="https://img.icons8.com/material/24/000000/marker--v1.png" />
              </Marker>
            </Link>
          })}
          
        </MapGL>
      </div>
    </section>

  </div >

}

export default Explore