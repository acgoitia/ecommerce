import React from "react";
import './productCard.css';

function ProductCard (props) {
    const product = props.products;
    const isLoading = props.isLoading;

    return (
        <div className="product-card">
            <img src="" alt="product-image" />
            <h1>{product[0].name}</h1>
            {isLoading ? <h1>Loading...</h1> : <h1>False</h1>}
        </div>
    );
}

export default ProductCard;