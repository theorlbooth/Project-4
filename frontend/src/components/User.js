import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import Loader from './Loader'


const user = (props) => {

  const [user, updateUser] = useState([])
  const id = props.match.params.id
  const token = localStorage.getItem('token')
  const [newFolderName, updateNewFolderName] = useState('')
  const [publicFolders, updatePublicFolders] = useState([])
  const [privateFolders, updatePrivateFolders] = useState([])

  useEffect(() => {
    axios.get(`/api/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
        const publicF = resp.data.folder.filter(folder => {
          return folder.public === true
        })
        console.log(resp.data.folder.filter(folder => {
          return folder.public === true
        }))
        updatePublicFolders(publicF)
        const privateF = resp.data.folder.filter(folder => {
          return folder.public === false
        })
        updatePrivateFolders(privateF)
        console.log(resp.data.folder.filter(folder => {
          return folder.public === false
        }))
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
      <div className="flex-loader">
        <Loader />
      </div>
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
        <h1 style={{ color: '#F4ECD8', fontSize: '50px', marginTop: '30px' }} className="user-name">{user.username}</h1>
        <p style={{ color: '#F4ECD8', fontSize: '30px' }} className="user-time">{`Joined: ${moment(user.created_at).fromNow()}`}</p>
      </div>

      <div className="bottom-half">
        <div className='folders-sorted'>
          <div className="create-folder">
            <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="column is-2-desktop is-6-tablet is-12-mobile" key="new">
                <a className="new-folder" onClick={openNewModal}>
                  <div className="card" style={{ backgroundColor: '#5AAC84', border: 'solid 3px #F4ECD8' }} >
                    <div className="card-content">
                      <div className="media-content">
                        <h2 className="title is-5" style={{ textAlign: 'center', color: '#F4ECD8', fontSize: '20px' }}>+</h2>
                        <p className="subtitle is-6" style={{ textAlign: 'center', color: '#F4ECD8', fontSize: '20px' }}>New Folder</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="private-folders">
          <h2 className="private" style={{ color: '#F4ECD8', fontSize: '30px', margin: '40px', textAlign: 'center', textDecoration: 'underline' }}>Private Folders:</h2>
          <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            {privateFolders.map((folder, index) => {
              return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
                <Link to={`/folders/${folder.id}`}>
                  <div className="card" style={{ backgroundColor: '#F4ECD8' }}>
                    <div className="card-content">
                      <div className="media-content">
                        <h2 className="title is-5" style={{ textAlign: 'center' }}>{folder.name}</h2>
                        <p className="subtitle is-6" style={{ textAlign: 'center' }}>{folder.places.length === 1 ? `${folder.places.length} place saved` : `${folder.places.length} places saved`}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
        <div className="public-folders">
          <h2 className="public" style={{ color: '#F4ECD8', fontSize: '30px', margin: '40px', textAlign: 'center', textDecoration: 'underline' }}>Public Folders:</h2>
          <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            {publicFolders.map((folder, index) => {
              return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
                <Link to={`/folders/${folder.id}`}>
                  <div className="card" style={{ backgroundColor: '#F4ECD8' }}>
                    <div className="card-content">
                      <div className="media-content">
                        <h2 className="title is-5" style={{ textAlign: 'center' }}>{folder.name}</h2>
                        <p className="subtitle is-6" style={{ textAlign: 'center' }}>{folder.places.length === 1 ? `${folder.places.length} place saved` : `${folder.places.length} places saved`}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  </>
}


export default user