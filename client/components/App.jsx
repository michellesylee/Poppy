import React from 'react';
import './stylesheets/styles.css';
//  import 'bootstrap/dist/css/bootstrap.min.css'
//  import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap'

import AddVendor from './AddVendor.jsx';
import Home from './Home.jsx';
import AddReview from './AddReview.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './Navbar.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Auth from './Auth.jsx';
import ViewReviews from './ViewReviews.jsx';
import EditRating from './EditRating.jsx';
// import LogIn from './LogIn.jsx';
import LogOut from './Logout.jsx';
import Success from './Success.jsx';

import BottomNav from './BottomNav.jsx';
// import 'react-bootstrap/dist/react-bootstrap.min.js';

function App() {
  return (
    <div className='title'>
      <NavBar />
      {/* <button onClick={navigateHome}>Home</button>
      <hr />
      <button onClick={navigateToVendor}>Add Vendor</button> */}
      <Routes>
        <Route path='/addvendor' element={<AddVendor />} />
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/success' element={<Success />} />
        <Route path='/addrating' element={<AddReview />} />
        <Route path='/viewratings' element={<ViewReviews />} />
        <Route path='/editrating' element={<EditRating />} />
        {/* <Route path='/LogIn' element={<LogIn />} /> */}
        <Route path='/LogOut' element={<LogOut />} />
      </Routes>
    </div>
  );
}

// render(<App />, document.querySelector('#app'));

export default App;
