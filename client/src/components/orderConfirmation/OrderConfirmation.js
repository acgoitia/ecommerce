import React from "react";
import './orderConfirmation.css';

function OrderConfirmation (props) {
    return (
        <div>
            <p>Order # {props.match.params.id}</p>
        </div>
    );
}

export default OrderConfirmation;