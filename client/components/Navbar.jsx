import React, {useContext} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AddVendor from './AddVendor.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';
import Auth from './Auth.jsx';
import AddReview from './AddReview.jsx';
import ViewReviews from './ViewReviews.jsx';
import LogOut from './Logout.jsx';
import Button from '@mui/material/Button';
import PoppyContext from '../store/context.js';


import image from '../assets/poppy3.png';

function NavBar() {
  const navigate = useNavigate();
  const poppyContext = useContext(PoppyContext);

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

  const navtoReview = () => {
    navigate('/addrating');
  };

  const ViewRatings = () => {
    navigate('/viewratings');
  };

  const navigateLogOut = () => {
    navigate('/logout');
  };

  // const LogOut = () => {
  //   fetch('/api/logout', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'Application/JSON',
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .then(navigate('/'))
  //     .catch((err) => console.log('did not log out user'));
  // };

  <Routes>
    <Route path='/addvendor' element={<AddVendor />} />
    <Route path='/' element={<Home />} />
    <Route path='/' element={<SignIn />} />
    <Route path='/' element={<SignUp />} />
    <Route path='/auth/google/' element={<Auth />} />
    <Route path='/addrating' element={<AddReview />} />
    <Route path='/viewratings' element={<ViewReviews />} />
    <Route path='/logout' element={<LogOut />} />
  </Routes>;

  return (
    <div className='navBar'>
      <img className='poppy' src={image} />
      <div className='buttons'>
        {!poppyContext.isAuth ? 
        <div>
        <button className='navButtons' onClick={navigateHome}>
          Home
        </button>
        <button className='navButtons' onClick={navigateToVendor}>
          Add Vendor
        </button>
        <button className='navButtons' onClick={navToSignin}>
          Sign In
        </button>
        <button className='navButtons' onClick={navToSignUp}>
          Sign Up
        </button>
        </div>
        :
        <div>
        <button className='navButtons' onClick={navigateHome}>
          Home
        </button>
        <button className='navButtons' onClick={navigateToVendor}>
          Add Vendor
        </button>
        <button className='navButtons' onClick={navigateLogOut}>
          Log Out
        </button>
        </div>
        }
      </div>
    </div>
  );
}

export default NavBar;
{
  /* <Button variant="contained" onClick={() => deleteReview(reviewername)}>Delete Review</Button>  */
}
