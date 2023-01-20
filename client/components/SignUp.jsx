import React, { useState, useEffect } from 'react';
import image from '../assets/slogan.png';
import {Routes, Route, useNavigate} from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    }
    return [value, onChange]
}
  

const SignUp = () => {
    const [username, usernameOnChange] = useInput('')
    const [password, passwordOnChange] = useInput('')  
    const [email, emailOnChange] = useInput('')  
    const navigate = useNavigate();


    
    const saveUser = () => {
      if (username === '') {
        console.log('enter a valid username')
      } else {
        const body = {
          username,
          password,
          email
      }; 
        fetch('/api/adduser', {
         method: 'PUT',
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
      .catch(err => console.log('create user'))
      }
    }

    return (
      <div className='loginContainer' >
        <div className ='signInContainer'>
          <h2>Create Username and Password</h2>
            <label htmlFor="username">Username: </label>
            <input name="username" value={username} onChange={usernameOnChange}></input>
              <label htmlFor="Password">Password: </label>
              <input name="password" type="password" value={password} onChange={passwordOnChange}></input>
             <label htmlFor="Password">Email: </label>
              <input name="password" value={email} onChange={emailOnChange}></input>
            <br/>
            <button type="button" className="button" onClick={saveUser}>Save</button> 
            <br/>
            {/* <a href="auth/google" referrerpolicy="no-referrer-when-downgrade" className="btn btn-danger"><span class="fa fa-google"></span> Sign Up with Google</a>
            <br/>
            <a href="auth/google" referrerpolicy="no-referrer-when-downgrade" className="btn btn-danger"><span class="fa fa-google"></span> Sign Up with LinkedIn </a> */}
            <Button href="api/auth/google" referrerpolicy="no-referrer-when-downgrade" variant="contained"  >Sign Up with &nbsp; <GoogleIcon/></Button>
            <br/>
            <Button href="api/auth/google" variant="contained"  referrerpolicy="no-referrer-when-downgrade"  >Sign Up with &nbsp; <LinkedInIcon/></Button>
            {/* <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> */}
        </div>
        <div className='sloganContainer'>
            <img className='slogan' src={image} />
        </div>
        </div>
  )
}

export default SignUp;
