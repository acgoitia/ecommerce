import React from "react";
import './cart.css';


function Cart (props) {
    return(
        <div>
            <p>Display Cart only for loged-in users</p>
        </div>
    );
}

export default Cart;

// will need to redirect users to login page if not signed in