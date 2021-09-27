import React, { useState } from 'react';
import './login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './loginSlice';
import { Redirect, Link } from 'react-router-dom';

// need ensure state is maintained on page refresh

function Login(props) {
    const dispatch = useDispatch();
    const {isLoggedIn, incorrectCreds} = useSelector((state) => state.login)
    
    const [userNameState, setUserName] = useState('');
    const [passwordState, setPassword] = useState('');

    // event handler for login form
    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;    
        const password =  e.target.password.value;  
        var payload = {
            username: username,
            password: password
        };
        dispatch(login(payload));
        setUserName('');      // clear fields when submitting form
        setPassword('');    // clear fields when submitting form
    };

    // Ensure input field displays text
    const handleUserChange = ({target}) => {
        setUserName(target.value)
    };

    const handlePasswordChange = ({target}) => {
        setPassword(target.value)
    };


    return (
        <div>
            {isLoggedIn && <Redirect to="/"/> }
            {incorrectCreds && <p>Incorrect Username or Password</p> }
            <h1>Login Form Here</h1>
            <form onSubmit={handleLogin} >
                <label for="username">email</label><br/>
                <input type="text" id="username" name="username" placeholder="email" value={userNameState} onChange={handleUserChange}/><br/>
                <label for="password">password</label><br/>
                <input type="password" id="password" name="password" placeholder="password" value={passwordState} onChange={handlePasswordChange}/><br/>
                <input type="submit" value="Login"/>
            </form>
            <p>Not a member? <Link to="sign-up">Sign up</Link></p>
        </div>
    );
}

export default Login;