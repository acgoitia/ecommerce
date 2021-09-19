import React from "react";
import './orderDetail.css';

function OrderDetail (props) {
    return (
        <div>
            <p>Details of user specific order:  order # {props.match.params.id}</p>
        </div>
    );
}

export default OrderDetail;