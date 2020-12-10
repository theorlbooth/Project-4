import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import Loader from './Loader'

const publicFolders = (props) => {

  const [folders, updateFolders] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/folders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateFolders(resp.data.filter(folder => folder.public === true))
        console.log((resp.data.filter(folder => folder.public === true)))
      })
  }, [])




  if (folders.length === 0) {
    return <>
      <div className="folders-page">
        <div className="top-half">
          <h1>Public Folders</h1>
          <p>{folders.length} folders to explore!</p>
        </div>
        <div className="flex-loader" style={{ height: '70vh' }}>
          <Loader />
        </div>
      </div>
    </>
  }

  return <>
    <div className="folders-page">

      <div className="top-half">
        <h1 style={{ color: 'white', fontSize: '50px', marginTop: '30px' }}>Public Folders</h1>
        <p style={{ color: 'white', fontSize: '30px' }}>{folders.length} folders to explore!</p>
      </div>
      <div className="bottom-half">
        <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          {folders.map((folder, index) => {
            return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
              <Link to={`/folders/${folder.id}`}>
                <div className="card">
                  <div className="card-content">
                    <div className="media-content">
                      <h2 className="title is-5" style={{ textAlign: 'center' }}>{folder.name}</h2>
                      <p className="subtitle is-6" style={{ textAlign: 'center' }}>{`${folder.places.length} places saved`}</p>
                      <p className="subtitle is-6" style={{ textAlign: 'center' }}>{`Created by: ${folder.users[0].username}`}</p>
                      
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


export default publicFolders