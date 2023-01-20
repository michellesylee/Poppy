import React, { useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import image from '../assets/slogan.png';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';


const useInput = init => {
    const [value, setValue] = useState(init);
    const onChange = e => {
      setValue(e.target.value);
    }
    return [value, onChange]
}

const SignIn = () => {
    const [username, usernameOnChange] = useInput('')
    const [password, passwordOnChange] = useInput('')  
    const navigate = useNavigate();

    const verifyUser = () => {
      if (username === '') {
        console.log('enter a valid username')
      } else {
        const body = {
          username,
          password,
      }; 
        fetch('/api/verifyuser', {
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
      .catch(err => console.log('did not verify user'))
      }
    }

    return (
    <div className='loginContainer' >
        <div className ='signUpContainer'>
        <h2>Sign In</h2>
            <label htmlFor="username">Username: </label>
            <input name="username" value={username} onChange={usernameOnChange}></input>
            <br/>
              <label htmlFor="Password">Password: </label>
              <input name="password" type="password" value={password} onChange={passwordOnChange}></input>
            <br/>
            <button type="button" className="button" onClick={verifyUser}>Sign In</button> 
            <br/>
            <Button href="api/auth/google" referrerpolicy="no-referrer-when-downgrade"  variant="contained"  > Sign In with &nbsp; <GoogleIcon/></Button>
            <br/>
            <Button href="api/auth/google" variant="contained"  referrerpolicy="no-referrer-when-downgrade"  >Sign In with &nbsp; <LinkedInIcon/></Button>
            {/* <a href="api/auth/google" referrerpolicy="no-referrer-when-downgrade" className="btn btn-danger"><span class="fa fa-google"></span> Sign In with Google</a> */}
        </div>
        <div className='sloganContainer'>
        <img className='slogan' src={image} />
        </div>
    </div>
    )
}

export default SignIn;


// import React, { useState, useEffect } from 'react';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import { gapi } from 'gapi-script';

// function Auth() {
//     const [ profile, setProfile ] = useState([]);
//     const clientId = '1002091958769-s96diuq2khj97un1lf2iau0bmutcd240.apps.googleusercontent.com';
//     useEffect(() => {
//         const initClient = () => {
//             gapi.client.init({
//                 clientId: clientId,
//                 scope: ''
//             });
//         };
//         gapi.load('client:auth2', initClient);
//     });

//     const onSuccess = (res) => {
//         setProfile(res.profileObj);
//     };

//     const onFailure = (err) => {
//         console.log('failed', err);
//     };

//     const logOut = () => {
//         setProfile(null);
//     };

//     return (
//         <div className='vendorCard'>
//             <h2>Google Login</h2>
//             <br />
//             <br />
//             {
//             profile ? (
//                 <div>
//                     {/* {setProfile(res.profileObj)}; */}
//                     <img src={profile.imageUrl} alt="user image" />
//                     <h3>  Welcome {profile.name}! </h3>
//                     <p>Email Address: {profile.email}</p>
//                     <br />
//                     <br />
//                     <GoogleLogout className='button' clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
//                 </div>
//             ) : (
//                 <GoogleLogin
//                     clientId={clientId}
//                     buttonText="Sign in with Google"
//                     onSuccess={onSuccess}
//                     onFailure={onFailure}
//                     cookiePolicy={'single_host_origin'}
//                     isSignedIn={true}
//                 />
//             )
//             }
//         </div>
//     );
// }
// export default Auth;