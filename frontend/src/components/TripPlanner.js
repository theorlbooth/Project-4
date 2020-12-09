import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import DatePicker from 'react-date-picker'
import TimePicker from 'react-time-picker'
import DateTimePicker from 'react-datetime-picker'


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

    const data = {
      ...formData,
      start_date: moment(startDate).format('yyyy-MM-DD'),
      arr_time: arrTime,
      end_date: moment(endDate).format('yyyy-MM-DD'),
      dep_time: depTime
    }
    console.log(data)
    updateFormData(data)
    console.log(formData)

    axios.get(``)
      .then(resp => {

        
        axios.get(`/api/day_plan/${data.location}/${data.start_date}/${data.arr_time}/${data.end_date}/${data.dep_time}`)
          .then(resp => {
            console.log(resp.data)
          })
      })



  }

  return <>
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">City:</label>
        <div className="control">
          <input className="input" type="text" placeholder="City:" onChange={handleChange} value={formData.location} name="location" />
        </div>
      </div>
      <div className="arrival-info">
        <div className="field">
          <label className="label">Arrival Date:</label>
          <div className="control">
            <DatePicker onChange={setStartDate} value={startDate} name="start_date" format="dd-MM-y" />
          </div>
        </div>
        <div className="field">
          <label className="label">Arrival Time:</label>
          <div className="control">
            <TimePicker onChange={setArrTime} value={arrTime} name="arr_time" />
          </div>
        </div>
      </div>
      <div className="departure-info">
        <div className="field">
          <label className="label">Departure Date:</label>
          <div className="control">
            <DatePicker onChange={setEndDate} value={endDate} name="end_date" format="dd-MM-y" />
          </div>
        </div>
        <div className="field">
          <label className="label">Departure Time:</label>
          <div className="control">
            <TimePicker onChange={setDepTime} value={depTime} name="dep_time" />
          </div>
        </div>
      </div>
      <div className="login-buttons">
        <div className="control buttonflex">
          <button className="button is-black">Submit</button>
        </div>
      </div>
    </form>
  </>

}

export default tripPlanner

