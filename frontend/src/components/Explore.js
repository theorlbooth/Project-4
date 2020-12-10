import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'

import { Link } from 'react-router-dom'



const Explore = () => {

  const [countries, updateCountries] = useState([])
  const [search, updateSearch] = useState('')
  const [searchType, updateSearchType] = useState('')
  const [searchID, updateSearchID] = useState('')
  const [marker, setMarker] = useState('')
  
  const [viewPort, setViewPort] = useState({
    height: '70vh',
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
    if (searchType === 'country') {
      axios.get(`/api/country_search/${search}`)
        .then(resp => {
          updateSearchID(resp.data.results[0].id)
          console.log(resp.data.results[0].id)
        })
      // const id = await searchID
      // console.log(id)
    } else {
      axios.get(`/api/city_search/${search}`)
        .then(resp => {
          updateSearchID(resp.data.results[0].id)
          console.log(resp.data.results[0].id)
        })
    }
  }
  useEffect(() => {
    if (viewPort.zoom > 3) {
      setMarker("https://img.icons8.com/material/24/000000/marker--v1.png")
    } else if (viewPort.zoom <= 3) {
      setMarker('')
    }
    
  })

  
  // useEffect((props) => {
  //   console.log(searchID)
  //   if (searchType === 'type_country' && searchID !== '') {
  //     props.history.push(`/country/${searchID}`)
  //   } else if (searchType === 'type_city' && searchID !== '') {
  //     console.log('city')
  //   } else return
  // }, [searchID])


  return <div>

    <section className="hero is-light is-small">
      <div className="hero-body">
        <div className="container">
          <div className="field">
            <div className="control">
              <input 
                className="input" 
                type="text" 
                placeholder="Find a place.." 
                onChange={(event) => updateSearch(event.target.value)}
                value={search}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              SEARCH BY:   
              <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('country')}/>
                  COUNTRY
              </label>
              <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('city')}/>
                CITY
              </label>
              {/* <label className="radio">
                <input type="radio" name="question" onClick={() => updateSearchType('type_place')}/>
                PLACE
              </label> */}
            </div>
          </div>
          <div>
            { searchID ? <p>Suggested: {searchID}</p> : ''}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-dark is-link" onClick={() => handleSubmit(search)}>Check</button>
            </div>
            <div className="control">
              <Link to={`${searchType}/${searchID}`}>
                <button className="button is-dark is-link">Search</button>
              </Link>
              {/* <button className="button is-dark is-link" onClick={() => handleGo()}>Go</button> */}
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
                <img className="marker" src={marker} />
              </Marker>
            </Link>
          })}
          
        </MapGL>
      </div>
    </section>

  </div >

}

export default Explore