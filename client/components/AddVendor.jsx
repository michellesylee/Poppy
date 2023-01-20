import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { Link, MemoryRouter } from 'react-router-dom';
import DatePicker from 'react-date-picker'

const useInput = init => {
  const [value, setValue] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  }
  return [value, onChange]
}


const addVendor = (props) => {
  const [name, nameOnChange] = useInput('')
  const [foodCategory, foodCategoryOnChange] = useInput('')
  const [address, addressOnChange] = useInput('')
  const [dates, datesOnChange] = useInput('')
  const [time, timeOnChange] = useInput('')
  const [menu, menuOnChange] = useInput('')

  // const [date, setDate] = useState(new Date());

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
 

  const navigate = useNavigate();


  const saveVendor = () => {
    if (name === '') {
      console.log('enter a valid name')
    } else {
      const body = {
        name,
        foodCategory,
        address,
        dates,
        time,
        menu
      };
      // fetch('http://localhost:3000/api/addvendor', {
        
    fetch('/api/addvendor', {
      method: 'POST',
      headers: {
          'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then((data) => {
      console.log(data)
    })
    .then(navigate('/'))
    .catch(err => console.log('create vendor'))
    }
  };

  return (
    <section className="createVendor">
      <h2>Enter Pop-up Details</h2>
      <label htmlFor="name">Name: </label>
      <br/>
      <input name="name" placeholder="Name" value={name} onChange={nameOnChange} />
      <br/>
      <label htmlFor="Food Category">Category: </label>
      <br/>
      <input name="foodCategory" placeholder="Korean" value={foodCategory} onChange={foodCategoryOnChange} />
      <br/>
      <label htmlFor="Address">Address: </label>
      <br/>
      <input name="address" placeholder="124 Soto St. Glendale" value={address} onChange={addressOnChange} />
      <br/>
      <label htmlFor="Start Date">Start Date: </label>
      <br/>
      <input name="dates" placeholder="2/2/23 - 3/3/23" value={dates} onChange={datesOnChange} />

      {/* <DatePicker
           placeholderText="Start Date"
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
     />
    <br/>
    <label htmlFor="End Date">End Date: </label>
      <br/>
     <DatePicker
      placeholderText="End Date"
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={date => setEndDate(date)}
     /> */}

      <br/>
      <label htmlFor="Time">Time: </label>
      <br/>
      <input name="time" placeholder="5pm - 10 pm" value={time} onChange={timeOnChange} />
      <br/>    
      <label htmlFor="Menu">Menu: </label>
      <br/>
      <input name="menu" placeholder="img url" value={menu} onChange={menuOnChange} />
      <br/>
      <br/>
      <button type="button" className="button" onClick={saveVendor}>Save</button> 
    </section>
  )
}

export default addVendor;
