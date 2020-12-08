import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'
import { elastic as Menu } from 'react-burger-menu'
import { getUserId } from '../lib/auth'
import uuid from 'react-uuid'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'
import Loader from './Loader'


const singlePlace = (props) => {

  const [singlePlace, updateSinglePlace] = useState({})
  const [currentFolders, updateCurrentFolders] = useState([])
  const [futureFolders, updateFutureFolders] = useState([])
  const [locationInfo, updateLocationInfo] = useState({})
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const [userInfo, updateUserInfo] = useState({})
  const [newFolderName, updateNewFolderName] = useState('')

  const id = props.match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/api/places/${id}`)
      updateSinglePlace(data)
      updateCurrentFolders(data.folder.map(folder => {
        return folder
      }))
      console.log(data)

      const { data: geoData } = await axios.get(`/api/place/place_info/${data.lat}/${data.long}`)
      updateLocationInfo(geoData)
      console.log(geoData)

      const { data: user } = await axios.get(`/api/users/${getUserId()}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateUserInfo(user)
      updateFutureFolders(user.folder.map(folder => {
        return folder
      }))
      console.log(user)
    }

    fetchData()
  }, [])




  function handleComment() {
    if (content === '' && rating === 0) {
      return
    } else {
      axios.post(`/api/places/${id}/comments`, { content, rating }, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {
          console.log(resp.data)
          setContent('')
          setRating(0)
          updateSinglePlace(resp.data)
        })
    }
  }

  function handleCommentDelete(commentId) {
    axios.delete(`/api/places/${id}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateSinglePlace(resp.data)
        console.log(resp.data)
      })
  }


  function findDiff(arr1, arr2) {
    const difference = arr1.filter(({ id: id1 }) => !arr2.some(({ id: id2 }) => id2 === id1))
    return difference
  }


  function addToFolder(folderId, placeId) {
    axios.post(`/api/folders/${folderId}/${placeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp)
        props.history.push(`/folders/${folderId}`)
      })
  }

  function removeFromFolder(folderId, placeId) {
    axios.delete(`/api/folders/${folderId}/${placeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log('deleted')
        window.location.reload()
      })
  }

  function createAndAddToFolder(name) {
    axios.post('/api/folders', { 'name': name }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp)
        axios.post(`/api/folders/${resp.data.id}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(resp => {
            props.history.push(`/folders/${resp.data.id}`)
          })
      })
  }

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









  if (currentFolders.length === 0 || locationInfo.results === undefined) {
    return <>
      <div className="flex-loader">
        <Loader />
      </div>
    </>
  }

  return <>
    <div className="single-page">




      <Menu right >
        <p style={{ textAlign: 'center' }}>--- CREATE FOLDER ---</p>
        <br />
        <a className="menu-item" style={{ textAlign: 'center' }} onClick={openNewModal}>New</a>
        <br />
        <br />
        <p style={{ textAlign: 'center' }}>--- ADD TO FOLDER ---</p>
        <br />
        {findDiff(futureFolders, currentFolders).map(folder => {
          return <a key={uuid()} className="menu-item" onClick={() => addToFolder(folder.id, singlePlace.id)} style={{ textAlign: 'center' }}>{folder.name}<br /><br /></a>
        })}
        <br />
        <p style={{ textAlign: 'center' }}>--- REMOVE FROM FOLDER ---</p>
        <br />
        {currentFolders.map(folder => {
          return <a key={uuid()} className="menu-item" onClick={() => removeFromFolder(folder.id, singlePlace.id)} style={{ textAlign: 'center' }}>{folder.name}<br /><br /></a>
        })}
        <br />
      </Menu>

      <Modal isOpen={newModalIsOpen} onRequestClose={closeNewModal} style={customStyle} contentLabel="New Modal">
        <p>Name:</p>
        <input type="text" onChange={event => updateNewFolderName(event.target.value)} value={newFolderName} />
        <div className="modal-buttons">
          <button className="button is-black" style={{ border: '3px solid white', margin: '20px' }} onClick={() => createAndAddToFolder(newFolderName)}>confirm</button>
          <button className="button is-black" style={{ border: '3px solid white', margin: '20px' }} onClick={closeNewModal}>cancel</button>
        </div>
      </Modal>



      <div className="single-page-left">
        <h1 className="name">{singlePlace.name}</h1>
        <div className="address">
          <div className="information">{locationInfo.results[0].components.information}</div>
          <div className="road">{locationInfo.results[0].components.road}</div>
          <div className="city">{locationInfo.results[0].components.city}</div>
          <div className="postcode">{locationInfo.results[0].components.postcode}</div>
        </div>
        <div className="country-info">
          <div className="flag">
            <div className="flag">{locationInfo.results[0].annotations.flag}</div>
          </div>
          <div className="other-info">
            <div className="timezone">{`Timezone: ${locationInfo.results[0].annotations.timezone.short_name}`}</div>
            <div className="calling-code">{`Country Code: +${locationInfo.results[0].annotations.callingcode}`}</div>
            <div className="currency">{`Currency: ${locationInfo.results[0].annotations.currency.iso_code} / ${locationInfo.results[0].annotations.currency.symbol}`}</div>
          </div>
        </div>
        <p className="blurb">{singlePlace.description}</p>
        <div className="folders"></div>
      </div>


      <div className="single-page-right">
        <img src={singlePlace.picture} alt={singlePlace.name} />
        <div className="comments-section" style={{ border: '3px solid black' }}>
          <article className="media">
            {(!token && singlePlace.comments.length === 0) && <div style={{ margin: 'auto' }} className="no-comments">No Comments</div>}
            {token && <div className="media-content">

              <div className="field">
                <ReactStars count={5} size={24} activeColor="#ffd700" isHalf={true} onChange={event => setRating((event) * 2)} value={rating} />
                <p className="control">
                  <textarea className="textarea" placeholder="Post a comment..." onChange={event => setContent(event.target.value)} value={content}>{content}</textarea>
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <button className="button is-black" style={{ border: '3px solid black' }} onClick={handleComment}>Post</button>
                </p>
              </div>
            </div>}
          </article>
          {singlePlace.comments && singlePlace.comments.map(comment => {
            return <article key={comment.id} className="media">
              <div className="media-content">
                <div className="content">
                  <div className="user-time" style={{ display: 'flex' }}>
                    <p className="username">
                      {!comment.user.username ? 'unknown' : comment.user.username}
                    </p>
                    <p style={{ fontWeight: 'normal', paddingLeft: '70%' }}>
                      ({moment(comment.created_at).fromNow()})
                    </p>
                  </div>
                  {comment.rating !== 0 && <ReactStars value={(comment.rating) / 2} count={5} size={24} activeColor="#ffd700" edit={false} isHalf={true} />}
                  <p>{comment.content}</p>
                </div>
              </div>
              <div className="media-right">
                <button className="delete" onClick={() => handleCommentDelete(comment.id)}>
                </button>
              </div>
            </article>
          })}
        </div>
      </div>
    </div >
  </>
}

export default singlePlace