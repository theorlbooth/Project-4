import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Country = (props) => {

  const [country, updateCountry] = useState({})
  const [cities, updateCities] = useState([])

  useEffect(() => {
    const locationId = props.match.params.location_id
    console.log(locationId)
    
    if (locationId.length > 2) {
      axios.get(`/api/countries_by_location/${locationId}`)
        .then(resp => {
          updateCountry(resp.data.country_info)
          updateCities(resp.data.top_cities)
        })
    } else {
      axios.get(`/api/countries/${locationId}`)
        .then(resp => {
          updateCountry(resp.data.country_info)
          updateCities(resp.data.top_cities)
        })
    }
  }, [])
 
 
  //   axios.get(`/api/countries_by_location/${locationId}`)
  //     .then(resp => {
  //       updateCountry(resp.data.country_info)
  //       updateCities(resp.data.top_cities)
  //     })
  // }, [])
//  ! FOR SOME REASON THE COUNTRY.COUNTRY_INFO DOES NOT WORK

  console.log(country)
  console.log(cities)
  const sections = []

  if (country.content) {
    const content = country.content
    const sections = content.sections
    console.log(sections[0].body)
    return sections
  }
  
  console.log(sections)

  return <div className="container">
    <div className="country_info">
      <h1>
        Hello {country.name}
      </h1>
      <p>Description: {country.intro}</p>

      {/* <p>  
        {country.content ? {country.content.sections[0].body} : 'Loading' } 
      </p> */}
      {/* <img src={country.images[0].sizes.medium.url} alt="hmm" /> */}
    </div> 
   
    {/* <div className="top-cities">
      <h1>TOP CITIES:</h1>
      {cities.map((city, index) => {
        
        return <div key={index}>
          <h1>Name: {city.name}</h1>
          <p>Info: {city.snippet}</p>
        </div>
      })}
    </div> */}

  </div>
}

export default Country