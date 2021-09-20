import React from "react";
import './productCard.css';

function ProductCard (props) {
    const product = props.products[0];

    return (
        <div className="product-card">
            <img src="" alt="product-image" />
            <h1>{product.name}</h1>
        </div>
    );
}

export default ProductCard;