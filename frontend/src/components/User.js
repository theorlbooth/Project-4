import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'


const user = (props) => {

  const [user, updateUser] = useState([])
  const id = props.match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])


  if (user.username === undefined) {
    return <>

    </>
  }

  return <>
    <div className="user-page">
      <div className="top-half">
        <h1 className="user-name">{user.username}</h1>
        <p className="user-time">{`Joined: ${moment(user.created_at).fromNow()}`}</p>
      </div>
      <div className="bottom-half">
        <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          {user.folder.map((folder, index) => {
            return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
              <Link to={`/folders/${folder.id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="media-content">
                      <h2 className="title is-5" style={{ textAlign: 'center' }}>{folder.name}</h2>
                      <p className="subtitle is-6" style={{ textAlign: 'center' }}>{`${folder.places.length} places saved`}</p>
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