import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './itemDetail.css';

function ItemDetail (props) {

    return (
        <div>
            <p>Item Detail: Item # {props.match.params.id}</p>
        </div>
    );
}

export default ItemDetail;
