import React from "react";
import { useHistory } from "react-router-dom";
import './orderConfirmation.css';

function OrderConfirmation (props) {
    
    const history = useHistory();
    const handleClick = (e) => {
        history.push('/');
    }
    
    return (
        <div>
            <p>Your order has been successfully placed!</p>
            <p>Order # {props.match.params.id}</p>
            <button onClick={handleClick}>Continue Shopping</button>
        </div>
    );
}

export default OrderConfirmation;