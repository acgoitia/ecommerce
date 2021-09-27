import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './signUp.css';

function SignUp (props) {

    const {isLoggedIn} = useSelector((state) => state.login)
    
    // Local State for form inputs
    const [firstNameState, setFirstName] = useState('');
    const [lastNameState, setLastName] = useState('');
    const [emailState, setEmail] = useState('');
    const [passwordState, setPassword] = useState('');
    // Local State for error message
    const [regState, setRegState] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        const resStatus = await register(payload);
        setRegState(resStatus);
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
            const response = await fetch("http://localhost:4001/api/register", {
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
            return textData;
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

    return (
        <div>
            <h1>Sign Up Form Here</h1>
            {isLoggedIn && <Redirect to="/"/> }
            {isSubmitted ? <p>{regState}</p> : 
            <form onSubmit={handleSignUp} >
                <label for="firstName">First Name</label><br/>
                <input type="text" id="firstName" name="firstName" placeholder="First" value={firstNameState} onChange={handleFirstChange}/><br/>
                <label for="lastName">Last Name</label><br/>
                <input type="text" id="lastName" name="lastName" placeholder="Last" value={lastNameState} onChange={handleLastChange}/><br/>
                <label for="email">email</label><br/>
                <input type="text" id="email" name="email" placeholder="email" value={emailState} onChange={handleEmailChange}/><br/>
                <label for="password">Password</label><br/>
                <input type="password" id="password" name="password" placeholder="password" value={passwordState} onChange={handlePasswordChange}/><br/>
                <input type="submit" value="Sign Up"/>
            </form> }
            <p>Already a member? <Link to="login">Login</Link></p>
        </div>
    );
}


export default SignUp;