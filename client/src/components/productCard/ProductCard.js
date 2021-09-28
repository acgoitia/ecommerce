import React, { useState } from "react";
import './productCard.css';
import Button from '../button/Button';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductCard (props) {
    const product = props.products;
    
    // *** src attribute has path relative to react app "public" folder by default ****
    const src_path = product.image_url;
    const {isLoggedIn} = useSelector((state) => state.login); //need to create loginReducer
    // add local state to redirect
    const [redirect, setRedirect] = useState(!isLoggedIn);

    // Handle Click Function
    const handleAddToCart = async(e) => {
        
        // if not logged in, redirect to login page
        // if(!isLoggedIn) {
        //    return (<Redirect to="/login" />);
        // }
    
        // otherwise call API
        const response = await fetch("http://localhost:4001/api/users/myprofile/cart", {
            method: 'POST',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({product_id: 1, quantity: 1}) // add body to the request:  product_id & quantity
        });
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }

    return (
        <div className="product-card" id={product.id}>
            <img src={src_path} alt="product-image" /> 
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-description">{product.description}</h2>
            <h2 className="product-price">${product.price}</h2>
            <button onClick={handleAddToCart}>Add to Cart</button>
            <h2 className="product-inventory">In Stock: {product.inventory}</h2>
        </div>
    );
}

export default ProductCard;

//<Button action="Add to Cart" functionHandler={addToCart}/>