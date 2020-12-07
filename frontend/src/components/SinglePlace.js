import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import ReactStars from 'react-rating-stars-component'


const singlePlace = (props) => {

  const [singlePlace, updateSinglePlace] = useState([])
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(0)
  const id = props.match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/places/${id}`)
      .then(resp => {
        console.log(resp.data)
        updateSinglePlace(resp.data)
      })
  }, [])

  // ! -------------
  function handleComment() {
    console.log(content)
    console.log(rating)
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

  // ! -------------  

  if (singlePlace.name === undefined) {
    return <>

    </>
  }


  return <>
    <div className="single-page">
      <div className="single-page-left">
        <h1 className="name">{singlePlace.name}</h1>
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
    </div>
  </>
}

export default singlePlace