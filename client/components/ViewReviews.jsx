import React, { Component, useEffect, useState } from 'react';
// import VendorView from './VendorView.jsx';
import Review from './VV.jsx';


function ViewReviews() {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState([])
     useEffect(() => {
     const getReviews = async () => {
      setLoading(true);
      await fetch('/api/viewratings')
        .then(res => res.json())
        .then((reviews) => {
            setReviews(reviews)
        })
        .catch(err => console.log('useEffect: get reviews: ERROR: ', err))
        setLoading(false)
      }
      getReviews();
      },[])
  
     const vv = reviews.map((review, index) => <Review key={index} info={review}/>)

      return (
        <div className="viewbody">
          {loading ? <div> Loading </div> : vv}
        </div>
      );
    };
    
    export default ViewReviews;