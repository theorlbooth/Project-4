import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'


const user = (props) => {

  const [folder, updateFolder] = useState([])
  const id = props.match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/folders/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateFolder(resp.data)
      })
  }, [])


  if (folder.name === undefined) {
    return <>

    </>
  }

  return <>
    <div className="user-page">
      <div className="top-half">
        <h1 className="user-name">{folder.users[0].username}</h1>
        <p className="user-time">{`Created: ${moment(folder.created_at).fromNow()}`}</p>
      </div>
      <div className="bottom-half">
        <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          {folder.places.map((place, index) => {
            return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
              <Link to={`/places/${place.id}`}>
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-square">
                      <img src={place.picture} alt={place.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media-content">
                      <h2 className="title is-5">{place.name}</h2>
                      <ReactStars value={(place.score) / 2} count={5} size={15} activeColor="#ffd700" edit={false} isHalf={true} style={{ alignSelf: 'center' }}/>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          })}
        </div>
      </div>
    </div>
  </>
}




export default user