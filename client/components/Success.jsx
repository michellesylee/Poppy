import { SettingsBackupRestoreSharp } from '@mui/icons-material';
import { getListSubheaderUtilityClass } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import PoppyContext from '../store/context.js';


function Success() {
  const [users, setUsers] = useState([]);
  const poppyContext = useContext(PoppyContext);
  const updateIsAuth = poppyContext.updateIsAuth;
  const isAuth = poppyContext.isAuth;

  useEffect(() => {
    const getUser = async () => {
      await fetch('/api/auth/google/render', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((resObject) => {
          console.log(resObject);
          setUsers(resObject.user);
          updateIsAuth(true);
          console.log(isAuth)
        })
        .catch((err) => console.log(`Error: ${err}`));
    };
    getUser();
    console.log(users);
  }, []);

  return (
    <div className='vendorCard'>
      <h2>Google Login</h2>
      <span>Welcome, {users.firstname}!</span>
      <br />
      <span> Email: {users.email} </span>
      { console.log(isAuth)}
    </div>
  );
}

export default Success;
