import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const City = (props) => {

  const [city, updateCity] = useState({})

  useEffect(() => {
    axios.get(`/api/cities/${props.match.params.countrycode}`)
      .then(resp => {
        updateCountry(resp.data)
        console.log(resp.data)
      })
  }, [])
 
  return <div>
    <h1>
      Name: {country.name}
    </h1>
    <p>Description: {country.snippet}</p>
    {/* <img src={country.images[0].sizes.medium.url} alt="hmm" /> */}
  </div> 
}

export default Country