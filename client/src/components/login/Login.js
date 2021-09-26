import React, { useEffect } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import {resetState, login} from './loginSlice';


function Login(props) {
    const dispatch = useDispatch();
    const {isLoggedIn, isAuthenticating, hasError} = useSelector((state) => state.login)
    
    // var payload = {
    //     username: 'Andres.Correa11@test.com',
    //     password: '123456789'
    // };
    // Load product items
    // useEffect(() => {
    //     dispatch(login(payload));
    // },[]);

    // event handler for login form
    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;   // "Andres.Correa11@test.com" 
        const password =  e.target.password.value;  // "123456789"
        var payload = {
            username: username,
            password: password
        };
        dispatch(login(payload));
    };

    return (
        <div>
            <h1>Login Form Here</h1>
            <form onSubmit={handleLogin} action="/">
                <label for="username">email</label>
                <input type="text" id="username" name="username"/><br/>
                <label for="password">password</label>
                <input type="password" id="password" name="password"/><br/>
                <input type="submit" value="Login"/>
            </form>
            <p>Login State: {`${isLoggedIn}`}</p>
            <p>Authenticating State: {`${isAuthenticating}`}</p>
            <p>Error?: {`${hasError}`}</p>
        </div>
    );
}

export default Login;