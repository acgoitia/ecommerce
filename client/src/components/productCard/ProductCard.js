import React from "react";
import './productCard.css';

function ProductCard (props) {
    const product = props.products;
    const isLoading = props.isLoading;
    
    // *** src attribute has path relative to react app "public" folder by default ****
    const src_path = product[0].image_url;

    return (
        <div className="product-card">
            <img src={src_path} alt="product-image" /> 
            <h1>{product[0].name}</h1>
            {isLoading ? <h1>Loading...</h1> : <h1>False</h1>}
        </div>
    );
}

export default ProductCard;

//{product[0].image_url}
//"../../images/6_Pollo.jpg"