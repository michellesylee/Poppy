
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
// import { Container, Radio, Rating } from "./RatingStyles";
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';



const Container = styled.div`
    // display: flex;
//     flex-direction: row;
//    max-height: 10vh;
   min-width: 10vh;

   border: 1px solid black;
   height: 500px;
   margin-top: 80px;
   padding-top: 50px;
   padding-left: 30px;
   width: 400px;
   float: left;
   background-color: #7b68ee;
   margin-left: 32px;
   border-radius: 10px;
//    align-items: center;
//    justify-content: center;
`
 const Radio = styled.input`
   display: none;
`
 const Rating = styled.div`
   cursor: pointer;
`

const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    }
    return [value, onChange]
}
  
// const queryString = 'UPDATE RATINGS SET date = $2, reviewtext = $3, rating = $4 WHERE reviewername = $1'
// const values = [req.body.reviewerName, req.body.date, req.body.reviewtext, req.body.givenRating];

const EditRating = ({props}) => {
    const [reviewerName, reviewerNameOnChange] = useInput('');
    const [date, dateOnChange] = useInput('')
    const [reviewtext, reviewOnChange] = useInput('')  
    const [vendorid, vendoridOnChange] = useInput('')  
    let givenRating;
    // const [email, emailOnChange] = useInput('')  
    const navigate = useNavigate();

    const [rate, setRate] = useState(0);



    const SaveRating = () => {
        const body = {
            vendorid,
            reviewerName,
            date,
            reviewtext,
            givenRating,
          };
          // fetch('http://localhost:3000/api/addvendor', {
            
        fetch('/api/editrating', {
          method: 'PUT',
          headers: {
              'Content-Type': 'Application/JSON'
          },
          body: JSON.stringify(body)
        })
          .then(res => res.json())
          .then((data) => {
          console.log(data)
          // navigate('/')
        })
        .catch(err => console.log('edit rating'))
      };

    return (
      <Container>
   {/* <label htmlFor="vendorid">Vendor ID: </label>
        <br/>
        <input name="reviewername" value={vendorid} onChange={vendoridOnChange}></input> */}
        <br/>
      <label htmlFor="reviewername">Your Name: </label>
        <br/>
        <input name="reviewername" value={reviewerName} onChange={reviewerNameOnChange}></input>
        <br/>
        <label htmlFor="Date">Date: </label>
        <br/>
        <input name="date" value={date} onChange={dateOnChange}></input>
        <br/>
        <label htmlFor="Review">Review: </label>
        <br/>
        <input name="date" value={reviewtext} onChange={reviewOnChange}></input>
        <br/>
        {/* <div>{vendorid}</div> */}
        <br/>
        <div>{props}</div>
        <div>Rating: </div>
        {[...Array(5)].map((item, index) => {
        givenRating = index + 1;
          return (
            <label>
              <Radio
                type="radio"
                className="radio"
                value={givenRating}
                onClick={() => {
                  setRate(givenRating);
                  alert(`Are you sure you want to give ${givenRating} stars ?`);
                //   {SaveRating(givenRating)}
                }}
              />
              <Rating>
                <FaStar
                  color={
                    givenRating < rate || givenRating === rate
                      ? "000"
                      : "rgb(192,192,192)"
                  }
                />
              </Rating>
            </label>
          );
          
        })}
        <br></br>
        <br></br>
        <button type="button" className="navButtons" onClick={SaveRating}>Save</button>
      </Container>
    );
}

export default EditRating;
