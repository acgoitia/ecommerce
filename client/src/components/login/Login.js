import React, { useEffect } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import {resetState, login} from './loginSlice';


function Login(props) {
    const dispatch = useDispatch();
    const {isLoggedIn, isAuthenticating, hasError} = useSelector((state) => state.login)
    
    // Load product items
    useEffect(() => {
        dispatch(login());
    },[]);


    return (
        <div>
            <p>Login Form Here</p>
            <p>Login State: {`${isLoggedIn}`}</p>
            <p>Authenticating State: {`${isAuthenticating}`}</p>
            <p>Error?: {`${hasError}`}</p>
        </div>
    );
}

export default Login;