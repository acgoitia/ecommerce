// button should handle click differently depending on prop passed in
// button click has to: 
//  1) make API call  
//      - Save item in cart
//      - Login
//      - Sign up
//      - Checkout
//      - Update user info
//  2) change state
//      - tbd

import React from "react";
import './button.css';

function Button (props) {
    
    const {action, functionHandler} = props.action;

    return (
        <div className="button">
            <button onClick={functionHandler}>
                {action}
            </button>
        </div>
    );
}

export default Button;

