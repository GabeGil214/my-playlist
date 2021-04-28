import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Heading, Box, Button } from 'grommet';
import { AuthContext } from '../reducers/authReducer';
import { SleekInput, FormButton, ErrorText, InputLabel, FooterLink } from './styled';
import RegisterLogo from '../assets/img/simply-paired-temp.png';
import useStyles from '../assets/styles.js';


function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState('');
  const [authState, authDispatch] = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState('');
  const classes = useStyles();

  async function userLogin(){
    setErrorMessage('');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);


    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type':'multipart/form-data',
      }
    }

    await axios.post(process.env.REACT_APP_API_URL + '/api/dj-rest-auth/login/', formData, options, {withCredentials: true})
            .then(response => {
              sessionStorage.setItem('userKey', response.data.key);
              sessionStorage.setItem('username', username);
              const options = {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                  'Authorization': `Token ${response.data.key}`
                }
              }
              return axios.get(process.env.REACT_APP_API_URL + `/api/dj-rest-auth/user/`, options)
            })
            .then(response => {
              console.log(response)
              setRedirect(true);
              sessionStorage.setItem('userid', response.data.pk);
              authDispatch({
                type: 'LOGIN',
                payload: {
                  username,
                  id: response.data.pk,
                  key: sessionStorage.getItem('userKey')
                }});
            })
            .catch(error => {
              if(!error.response){
                setErrorMessage('Something went wrong. Please try again.')
              } else if(error.response.status >= 400 && error.response.status < 500){
                setErrorMessage('Username and Password are incorrect')
              } else if (error.response.status >= 500){
                setErrorMessage('Could not communicate with server. Please try again.')
              }
            })
        }


  if (redirect === true) {
    return <Redirect to='/' />
  } else {
    return (
      <Box
        pad="medium"
        round="xsmall"
        width="medium"
        className={classes.login}
        >
        <div className={classes.overlay}></div>
        <div className={classes.formContent}>
            <div className={classes.loginHeader}>
              <img src={RegisterLogo} className="logo-img" alt="Simply Paired Logo" />
              <Heading className={classes.formHeader} level="3" alignSelf="center">Welcome to Simply Paired!</Heading>
            </div>
            {errorMessage && (
              <ErrorText>{errorMessage}</ErrorText>
            )}
            <h2 className="sr-only">Login Form</h2>
            <div className="form-inputs">
              <div className={classes.formGroup}><InputLabel>Username</InputLabel><SleekInput type="text" name="username" onChange={event => setUsername(event.target.value)}/></div>
              <div className={classes.formGroup}><InputLabel>Password</InputLabel><SleekInput type="password" name="password" onChange={event => setPassword(event.target.value)}/></div>
              <div className={classes.formGroup}><Button className={classes.submitButton} color="#ff6a00" label="Log In" type="submit" size="large"  onClick={userLogin}/></div><FooterLink to="/password-reset">Forgot your email or password?</FooterLink>
            </div>
          </div>
      </Box>
    )
  }
}



export default Login;
