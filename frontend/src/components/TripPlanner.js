import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import DateTimePicker from 'react-datetime-picker'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'


const tripPlanner = () => {

  const [formData, updateFormData] = useState({
    location: '',
    start_date: '',
    arr_time: '',
    end_date: '',
    dep_time: ''
  })

  const [startDate, setStartDate] = useState()
  const [arrTime, setArrTime] = useState()
  const [endDate, setEndDate] = useState()
  const [depTime, setDepTime] = useState()
  const [page, updatePage] = useState(false)

  const [planData, udpatePlanData] = useState([])

  function handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    updateFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()


    async function getPlan() {

      const data = {
        ...formData,
        start_date: moment(startDate).format('yyyy-MM-DD'),
        arr_time: arrTime,
        end_date: moment(endDate).format('yyyy-MM-DD'),
        dep_time: depTime
      }

      updateFormData(data)

      const { data: cityData } = await axios.get(`/api/city_search/${data.location}`)
      console.log(cityData)

      const { data: planData } = await axios.get(`/api/day_plan/${cityData.results[0].id}/${data.start_date}/${data.arr_time}/${data.end_date}/${data.dep_time}`)
      console.log(planData.results[0].days)
      udpatePlanData(planData.results[0].days)
    }

    getPlan()
    updatePage(true)

  }


  function upperCase(str) {
    const splitStr = str.toLowerCase().split(' ')
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr.join(' ')
  }


  // console.log(planData.length)

  if (page === false) {
    return <>
      <div className="plan-trip">
        <div className="plan-top">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">City:</label>
              <div className="control">
                <input className="input" type="text" placeholder="City:" onChange={handleChange} value={formData.location} name="location" />
              </div>
            </div>
            <div className="day-time">
              <div className="arrival-info">
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Arrival Date:</label>
                  <div className="control">
                    <DatePicker onChange={setStartDate} value={startDate} name="start_date" format="dd-MM-y" />
                  </div>
                </div>
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Arrival Time:</label>
                  <div className="control">
                    <TimePicker onChange={setArrTime} value={arrTime} name="arr_time" />
                  </div>
                </div>
              </div>
              <br />
              <div className="departure-info">
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Departure Date:</label>
                  <div className="control">
                    <DatePicker onChange={setEndDate} value={endDate} name="end_date" format="dd-MM-y" />
                  </div>
                </div>
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Departure Time:</label>
                  <div className="control">
                    <TimePicker onChange={setDepTime} value={depTime} name="dep_time" />
                  </div>
                </div>
              </div>
            </div>
            <div className="login-buttons">
              <div className="control buttonflex">
                <button style={{ border: 'solid 3px #F4ECD8' }} className="button is-black">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  } else {


    return <>
      <div className="plan-trip">
        <div className="plan-top">
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">City:</label>
              <div className="control">
                <input className="input" type="text" placeholder="City:" onChange={handleChange} value={formData.location} name="location" />
              </div>
            </div>
            <div className="day-time">
              <div className="arrival-info">
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Arrival Date:</label>
                  <div className="control">
                    <DatePicker onChange={setStartDate} value={startDate} name="start_date" format="dd-MM-y" />
                  </div>
                </div>
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Arrival Time:</label>
                  <div className="control">
                    <TimePicker onChange={setArrTime} value={arrTime} name="arr_time" />
                  </div>
                </div>
              </div>
              <br />
              <div className="departure-info">
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Departure Date:</label>
                  <div className="control">
                    <DatePicker onChange={setEndDate} value={endDate} name="end_date" format="dd-MM-y" />
                  </div>
                </div>
                <div className="field" style={{ margin: '5px' }}>
                  <label className="label">Departure Time:</label>
                  <div className="control">
                    <TimePicker onChange={setDepTime} value={depTime} name="dep_time" />
                  </div>
                </div>
              </div>
            </div>
            <div className="login-buttons">
              <div className="control buttonflex">
                <button className="button is-ghost">Submit</button>
              </div>
            </div>
          </form>
        </div>

        <div className="plan-bottom">
          <div className="columns is-multiline is-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            {planData.map((day, index) => {
              return <div className="column is-2-desktop is-6-tablet is-12-mobile" key={index}>
                <div className="card" style={{ backgroundColor: '#5AAC84', textAlign: 'center' }}>
                  <div className="card-content">
                    <div className="media-content">
                      <h1 className="title is-4">{moment(day.date).format('DD-MMM')}</h1>
                    </div>
                  </div>
                </div>
                {day.itinerary_items.map((item, index) => {
                  return <div key={index} className="card" style={{ margin: '5px 0px', backgroundColor: '#F4ECD8' }}>
                    <Link to={`/places/${item.poi.id}`}>
                      <div className="card-content">
                        <div className="media-content">
                          <h3 className="title is-5" style={{ color: '#5AAC84', textDecoration: 'underline' }}>{upperCase((item.title === '' ? 'Next' : item.title))}</h3>
                          <h2 className="title is-4">{item.poi.name}</h2>
                          <div className="card-image">
                            <figure className="image is-square">
                              <img src={(item.poi.images.length !== 0 ? item.poi.images[0].source_url : 'https://www.dia.org/sites/default/files/No_Img_Avail.jpg')} alt={item.poi.name} />
                            </figure>
                          </div>
                          <p className="subtitle is-6" style={{ textAlign: 'center', margin: '10px 0px' }}>{item.description}</p>
                          <ReactStars value={(item.poi.score) / 2} count={5} size={15} activeColor="#ffd700" edit={false} isHalf={true} style={{ alignSelf: 'center' }} />
                        </div>
                      </div>
                    </Link>
                  </div>
                })}
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  }
}
export default tripPlanner

