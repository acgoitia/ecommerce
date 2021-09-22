import React from "react";
import './productCard.css';

function ProductCard (props) {
    const product = props.products;
    
    // *** src attribute has path relative to react app "public" folder by default ****
    const src_path = product.image_url;

    return (
        <div className="product-card" id={product.id}>
            <img src={src_path} alt="product-image" /> 
            <h1>{product.name}</h1>
            <h2>{product.description}</h2>
            <h2>Price: {product.price} USD</h2>
            <h2>In Stock: {product.inventory}</h2>
        </div>
    );
}

export default ProductCard;

//NEED TO ADD "ADD TO CART" BUTTON