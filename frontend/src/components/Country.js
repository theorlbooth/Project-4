import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Country = (props) => {

  const [country, updateCountry] = useState({})
  const [cities, updateCities] = useState([])
  const [description, updateDescription] = useState('')
  const [image, updateImage] = useState('')

  useEffect(() => {
    const locationId = props.match.params.location_id
    console.log(locationId)
    
    if (locationId.length > 2) {
      axios.get(`/api/countries_by_location/${locationId}`)
        .then(resp => {
          updateCountry(resp.data.country_info)
          updateCities(resp.data.top_cities)
          updateImage(resp.data.country_info.images[0].sizes.thumbnail.url)

          const cleanDescription = resp.data.country_info.content.sections[0].body.replace(/<[^>]+>/g, '')
          updateDescription(cleanDescription)
        })
    } else {
      axios.get(`/api/countries/${locationId}`)
        .then(resp => {
          updateCountry(resp.data.country_info)
          updateCities(resp.data.top_cities)
          updateImage(resp.data.country_info.images[0].sizes.thumbnail.url)

          const cleanDescription = resp.data.country_info.content.sections[0].body.replace(/<[^>]+>/g, '')
          updateDescription(cleanDescription)
          console.log(cleanDescription)
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
  // const sections = []

  // if (country.content) {
  //   const content = country.content
  //   const sections = content.sections
  //   console.log(sections[0].body)
  //   return sections
  // }
  
  // console.log(sections)

  return <div className="container">

    <section className="Section">
      <section className="hero is-dark">
        <div className="hero-body">
          <div className="container" style={{ color: '#F4ECD8' }}>
            <h1 className="title" style={{ color: '#F4ECD8' }}>
              {country.name}
            </h1>
            {/* <h2 className="subtitle">
              {city.country_id}
            </h2> */}
            <p style={{ color: '#F4ECD8' }}>{country.intro}</p>
          </div>
        </div>
      </section>
    </section>

    <section className="section country_info">
      <div className="container">
        <article className="media">
          <figure className="media-left is-small">
            <img src={image} />
          </figure>
          <div className="media-content">
            <p style={{ color: '#F4ECD8' }}>{description}</p>
          </div>
        </article>
      </div>
    </section> 
   
    <section className="Section">
      <section className="hero is-light is-small has-text-centered"  style={{ backgroundColor: '#F4ECD8' }}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
             TOP CITIES
            </h1>
            {/* <h2 className="subtitle">
              {city.country_id}
            </h2> */}
            <p>Find the best places to go..</p>
          </div>
        </div>
      </section>
    </section>
   
      
    <section className="top-cities">
      {cities.map((city, index) => {
        
        return <div key={index} style={{ margin: 20 }, { padding: 10 }}>
          <Link to={`/city/${city.id}`}>
            <div className="card" style={{ margin: 20 }, { padding: 10 }}>
              <h1 className="title is-4">{city.name}</h1>
              <p className="subtitle is-6">{city.snippet}</p>
            </div>
          </Link>
        </div>
      })}
    </section>

  </div>
}

export default Country