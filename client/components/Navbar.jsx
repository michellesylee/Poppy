import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-dom';
import {Routes, Route, useNavigate} from 'react-router-dom'
import AddVendor from './AddVendor.jsx';
import SignIn from './SignIn.jsx'
import SignUp from './SignUp.jsx'
import Home from './Home.jsx';
import Auth from './Auth.jsx';
import AddReview from './AddReview.jsx';
import ViewReviews from './ViewReviews.jsx';
import Button from '@mui/material/Button';

import image from '../assets/poppy3.png';


function NavBar() {

    const navigate = useNavigate();
    
    const navigateHome = () => {
      navigate('/');
    };
    
    const navigateToVendor = () => {
      navigate('/addvendor');
    };

    const navToSignin = () => {
      navigate('/signin');
    };

    const navToSignUp = () => {
      navigate('/signup');
    };


    const navToAuth = () => {
      navigate('/auth/google/secrets');
    };

    const navtoReview = () => {
      navigate('/addrating');
    };

    const ViewRatings = () => {
      navigate('/viewratings');
    };


    const LogOut = () => {
      fetch('/api/logout', {
        method: 'GET',
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
     .catch(err => console.log('did not log out user'))
     }
   
    

    <Routes>
    <Route path="/addvendor" element={ <AddVendor/> } />
    <Route path="/" element={ <Home/> } />
    <Route path="/" element={ <SignIn/> } />
    <Route path="/" element={ <SignUp/> } />
    <Route path="/auth/google/" element={ <Auth/> } />
    <Route path="/addrating" element={ <AddReview/> } />
    <Route path="/viewratings" element={ <ViewReviews/> } />

    </Routes> 

    return (
      <div className="navBar">
        <img className='poppy' src={image} />
        <div className="buttons"> 
            <button className='navButtons' onClick={navigateHome}>Home</button>
            <button className='navButtons' onClick={navigateToVendor}>Add Vendor</button> 
            <button className='navButtons' onClick={navToSignin}>Sign In</button> 
            <button className='navButtons' onClick={navToSignUp}>Sign Up</button> 
            <Button variant="outlined" onClick={LogOut}>Log Out</Button> 
            {/* // <Button  onClick={deleteReview}>Delete Review</Button>  */}

        </div> 
    </div>
    );
}

export default NavBar;
