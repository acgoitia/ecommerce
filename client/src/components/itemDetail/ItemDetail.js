import React from 'react';
import './itemDetail.css';

function ItemDetail (props) {

    return (
        <div>
            <p>Item Detail: Item # {props.match.params.id}</p>
        </div>
    );
}

export default ItemDetail;
