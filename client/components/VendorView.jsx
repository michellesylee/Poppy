import React from 'react';
import AddReview from './AddReview.jsx'
import ViewReviews from './ViewReviews.jsx'
import {Routes, Route, useNavigate, withRouter} from 'react-router-dom';



// function VendorView = () 


const VendorCard = ({
  info
}) => {
  const {
    name, foodcategory, address, dates, time, menu, vendorid
  } = info;

  const navigate = useNavigate();

  const leaveReview = (vendorid) => {
    navigate('/addrating');
  
  <Routes>
  <Route path="/addrating" element={ <AddReview/> } />
  </Routes>
  }
  
  const navToReviews = (vendorid) => {
    navigate('/viewratings');
    // ViewReviews();

  <Routes>
  <Route path="/viewratings" element={ <ViewReviews/> } />
  </Routes>
  }

return (
    <article className="vendorCard">
        <h3 className="vendorName">{name}</h3>
        <ul className="vendorDetailList">
            <li className="vendorDetail"> Food Category: {foodcategory}</li>
            <li className="vendorDetail"> Address: {address}</li>
            <li className="vendorDetail"> Dates: {dates}</li>
            <li className="vendorDetail"> Time: {time}</li>
            <li className="vendorDetail"> Menu: <img src={menu} className="menuphoto" alt="menu picture" /></li>
            <br></br>
            <li className="vendorDetail"> Average Rating: </li>
            <br></br>
            <button className='navButtons' props={info} onClick={leaveReview}>Add Rating</button>
            <button className='navButtons' props={info} onClick={navToReviews}>View Reviews</button> 
            {/* <li className="vendorDetail"> Add Review: <AddReview /></li> */}
        </ul>
    </article>
)
}

export default VendorCard;