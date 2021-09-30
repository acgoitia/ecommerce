import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './profileHomepage.css';

function ProfileHomepage (props) {
    
    const history = useHistory();
    const {isLoggedIn, profile} = useSelector((state) => state.login);
    
    const handleEdit = (e) => {
        history.push('/myprofile/userinfo')
    };

    return (
        <div>
            {  isLoggedIn ? 
                <div>
                    <div className="user-info">
                        <h2>User Information</h2>
                        <h3>First Name: {profile.first}</h3>
                        <h3>Last Name: {profile.last}</h3>
                        <h3>Email: {profile.email}</h3>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="order-history">
                        <h2>Order History</h2>
                        <p>TBD add all order rows</p>
                    </div>
                </div> :
                <Redirect to="/" ></Redirect>
            }
        </div>
    );
}

export default ProfileHomepage;

// Will redirect to login route if not logged in