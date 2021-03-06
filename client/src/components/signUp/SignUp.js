import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './signUp.css';

function SignUp (props) {

    // use to skip signup route if user is already logged in
    const {isLoggedIn} = useSelector((state) => state.login)
    
    // Local State for form inputs
    const [firstNameState, setFirstName] = useState('');
    const [lastNameState, setLastName] = useState('');
    const [emailState, setEmail] = useState('');
    const [passwordState, setPassword] = useState('');
    // Local State for response status and message
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseOK, setResponseOK] = useState(false);

    // event handler for login form
    const handleSignUp = async (e) => {
        e.preventDefault();
        var payload = {
            first_name: firstNameState,
            last_name: lastNameState,
            email: emailState,
            password: passwordState
        };
        // add message returned from API call to state to display in output
        const regRsponse = await register(payload);
        if (regRsponse[0].status === 200){
            setResponseOK(true);
        }
        setMessage(regRsponse[1]);
        setIsSubmitted(true);
        
        // clear fields when submitting form
        setFirstName('');
        setLastName('');
        setEmail('');      
        setPassword('');   
    };

    // Api call to register user in database
    const register = async (payload) => {
        try {
            const response = await fetch("/api/register", {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload) // add body to the request:  product_id & quantity
            });
            const textData = await response.text();
            console.log(response.status)
            console.log(textData);
            return [response, textData];
        } catch (error) {
            console.log(error);
            return('error')
        }
    }


    // Ensure input field displays text
    const handleFirstChange = ({target}) => {
        setFirstName(target.value)
    };
    const handleLastChange = ({target}) => {
        setLastName(target.value)
    };
    const handleEmailChange = ({target}) => {
        setEmail(target.value)
    };
    const handlePasswordChange = ({target}) => {
        setPassword(target.value)
    };

    // handlers for re-starting
    const handleTryAgain = ({target}) => {
        setIsSubmitted(false)
    };

    return (
        <div>
            {isLoggedIn && <Redirect to="/"/> }
            {isSubmitted ? 
                <div>
                    {
                        responseOK ?
                            <div>
                                <p>{message}</p><br/>
                                <p><Link to="/login">Login</Link></p>
                            </div> : 
                            <div>
                                {message} <br/>
                                <button onClick={handleTryAgain}>Try Again</button>
                            </div>
                    }
                </div> :
                <div className="sign-up">
                    <div className="form-container">
                        <form onSubmit={handleSignUp} >
                            <div className="form-row">
                                <div className="form-col-25">
                                    <label for="firstName">First Name</label><br/>
                                </div>
                                <div className="form-col-75">
                                    <input type="text" id="firstName" name="firstName" placeholder="First" required value={firstNameState} onChange={handleFirstChange}/><br/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col-25">
                                    <label for="lastName">Last Name</label><br/>
                                </div>
                                <div className="form-col-75">
                                    <input type="text" id="lastName" name="lastName" placeholder="Last" required value={lastNameState} onChange={handleLastChange}/><br/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col-25">
                                    <label for="email">Email</label><br/>
                                </div>
                                <div className="form-col-75">
                                    <input type="text" id="email" name="email" placeholder="email" required value={emailState} onChange={handleEmailChange}/><br/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col-25">
                                    <label for="password">Password</label><br/>
                                </div>
                                <div className="form-col-75">
                                    <input type="password" id="password" name="password" placeholder="password" required value={passwordState} onChange={handlePasswordChange}/><br/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-col-25"></div>
                                <div className="form-col-75">
                                    <input type="submit" value="Sign Up"/>
                                </div>
                            </div>
                        </form> 
                    </div>
                    <p>Already a member? <Link to="login">Login</Link></p>
                </div>
            }
        </div>
    );
}


export default SignUp;