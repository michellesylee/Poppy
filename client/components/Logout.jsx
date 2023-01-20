import React, { Component, useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import VendorView from './VendorView.jsx';
import SignIn from './SignIn.jsx';
import BottomNav from './BottomNav.jsx';
import PoppyContext from '../store/context.js';
import { Routes, Route, useNavigate } from 'react-router-dom';


function LogOut() {
  const [users, setUsers] = useState([]);
  const poppyContext = useContext(PoppyContext);
  const updateIsAuth = poppyContext.updateIsAuth;
  const isAuth = poppyContext.isAuth;
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   const getUser = async () => {
  //     await fetch('/api/auth/google/render', {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Credentials': true,
  //       },
  //     })
  //       .then((response) => {
  //         return response.json();
  //       })
  //       .then((resObject) => {
  //         console.log(resObject);
  //         setUsers(resObject.user);
  //         updateIsAuth(true);
  //         console.log(isAuth)
  //       })
  //       .catch((err) => console.log(`Error: ${err}`));
  //   };
  //   getUser();
  //   console.log(users);
  // }, []);

  useEffect(() => {
    const logout = async () => {
     await fetch('/api/logout')
       .then((res) => {
         updateIsAuth(false)
         console.log(res)
         navigate('/')
       })
       .catch(err => console.log('useEffect: logout: ERROR: ', err))

     //this is correct-ish
  // useEffect(() => {
  //   const logout = async () => {
  //   await fetch('/api/logout', {
  //     method: 'POST',
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'Application/JSON',
  //       'Access-Control-Allow-Credentials': true,
  //     },
  //   })
  //     .then((res) =>  {
  //       updateIsAuth(false);
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log('did not log out user'));


      // await fetch('/api/logout', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Credentials': true,
      //   },
      // })
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((resObject) => {
      //     console.log(resObject);
      //     updateIsAuth(false);
      //     console.log(isAuth)
      //   })
      //   .catch((err) => console.log(`Error: ${err}`));

    };
    logout();
  }, []);

    return (
      <div className="viewbody">
    Logged Out!
      </div>
    );
  };
  

  export default LogOut;