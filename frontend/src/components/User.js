import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'


const user = (props) => {

  const [user, updateUser] = useState([])
  const id = props.match.params.id
  const token = localStorage.getItem('token')
  const [newFolderName, updateNewFolderName] = useState('')

  useEffect(() => {
    axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])


  // ! Modal ------------
  const customStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      fontSize: '22px'

    },
    overlay: {
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.5)'
    }
  }

  Modal.setAppElement('#root')

  const [newModalIsOpen, setNewIsOpen] = useState(false)


  function openNewModal() {
    setNewIsOpen(true)
  }

  function closeNewModal() {
    setNewIsOpen(false)
  }

  // ! ------------


  function createFolder(name) {
    axios.post('/api/folder', { 'name': name }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateUser(resp.data)
        updateNewFolderName('')
        closeNewModal()
      })
  }



  if (user.username === undefined) {
    return <>

    </>
  }

  return <>
    <div className="user-page">

      <Modal isOpen={newModalIsOpen} onRequestClose={closeNewModal} style={customStyle} contentLabel="New Modal">
        <p>Name:</p>
        <input type="text" onChange={event => updateNewFolderName(event.target.value)} value={newFolderName} />
        <div className="modal-buttons">
          <button className="button is-black" style={{ border: '3px solid white', margin: '20px' }} onClick={() => createFolder(newFolderName)}>confirm</button>
          <button className="button is-black" style={{ border: '3px solid white', margin: '20px' }} onClick={closeNewModal}>cancel</button>
        </div>
      </Modal>

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
          <div className="column is-2-desktop is-6-tablet is-12-mobile" key="new">
            <a className="new-folder" onClick={openNewModal}>
              <div className="card" style={{ backgroundColor: '#5AAC84' }} >
                <div className="card-content">
                  <div className="media-content">
                    <h2 className="title is-5" style={{ textAlign: 'center' }}>+</h2>
                    <p className="subtitle is-6" style={{ textAlign: 'center' }}>New Folder</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
}


export default user