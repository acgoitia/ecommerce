import React from "react";
import { useHistory } from "react-router-dom";
import './orderConfirmation.css';

function OrderConfirmation (props) {
    
    const history = useHistory();
    const handleClick = (e) => {
        history.push('/');
    }
    
    return (
        <div className="order-confirmation">
            <p>Your order has been successfully placed!</p>
            <p className="order-no">Order # {props.match.params.id}</p>
            <button onClick={handleClick}>Continue Shopping</button>
        </div>
    );
}

export default OrderConfirmation;