import React from 'react';
import {Routes, Route, useNavigate, withRouter} from 'react-router-dom';
import Button from '@mui/material/Button';
import EditRating from './EditRating'
import axios from "axios";


// function VendorView = () 


const Review = ({
  info
}) => {
  const {
 vendor_id, rating, reviewername, date, reviewtext
  } = info;

const navigate = useNavigate();

const deleteReview = async (reviewername) => {
  alert(`Are you sure you want to delete this rating?`);
  axios
  .delete(`/api/viewratings/${reviewername}`) // <-- remove ;
  .then(
    // Issue GET request after item deleted to get updated list
    // that excludes note of id
    // this.getAllNotes()
    navigate('/'),
    console.log(reviewername)
  )
  // .then(res => {
  //   const allNotes = res.data;
  //   // this.setState({ allNotes });
  // })
  .catch(err => {
    console.error(err);
  });
}; 

const editReview = (reviewername) => {
    navigate('/editrating');
  
  <Routes>
  <Route path="/editrating" element={ <EditRating/> } />
  </Routes>
  }; 


return (
    <article className="vendorCard">
        <h3 className="vendorName">{vendor_id}</h3>
        <ul className="vendorDetailList">
            <li className="vendorDetail"> Rating: {rating} / 5</li>
            <li className="vendorDetail"> Reviewer Name: {reviewername}</li>
            <li className="vendorDetail"> Date: {date}</li>
            <li className="vendorDetail"> Review: {reviewtext}</li>
            <br></br>
            <li className="vendorDetail"> Average Rating: </li>
            <br></br>
            <Button variant="contained" onClick={() => deleteReview(reviewername)}>Delete Review</Button> 
            <br/>
            <br/>
            <Button variant="contained" onClick={editReview}>Edit Review</Button> 
            {/* <li className="vendorDetail"> Add Review: <AddReview /></li> */}
        </ul>
    </article>
    )
}

export default Review;

{/* <button className='navButtons' props={info} onClick={navToReviews}>View Reviews</button>  */}
