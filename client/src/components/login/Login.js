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
        <div className="login">
            <div className="form-container">
                {isLoggedIn && <Redirect to="/"/> }
                {incorrectCreds && <p>Incorrect Username or Password</p> }
                <form onSubmit={handleLogin} >
                    <div className="form-row">
                        <div className="form-col-25">
                            <label for="username">email</label>
                        </div>
                        <div className="form-col-75">
                            <input type="text" id="username" name="username"  value={userNameState} onChange={handleUserChange}/><br/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-col-25">
                            <label for="password">password</label>
                        </div>
                        <div className="form-col-75">
                            <input type="password" id="password" name="password"  value={passwordState} onChange={handlePasswordChange}/><br/>
                        </div>
                    </div>
                    <div className="form-row" >
                        <div className="form-col-25">
                            
                        </div>
                        <div className="form-col-75">
                            <input type="submit" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
            <p>Not a member? <Link to="sign-up">Sign up</Link></p>
        </div>
    );
}

export default Login;