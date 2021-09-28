import React, { useState } from "react";
import './productCard.css';
//import Button from '../button/Button';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// logic for  + / - button to add, remove from cart

function ProductCard (props) {
    const product = props.products;
    const history = useHistory();
    // *** src attribute has path relative to react app "public" folder by default ****
    const src_path = product.image_url;
    const {isLoggedIn} = useSelector((state) => state.login); //need to create loginReducer
    const [cartCount, setCartCount] = useState(null);

    //Get cart count for loggedin user
    const getCount = async () => {
        const response = await fetch("http://localhost:4001/api/users/myprofile/cart", {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        if (jsonData[0]){
            const cartItem = jsonData.filter(item => item.product_id === product.id);
            if (cartItem[0]){
                setCartCount(cartItem[0].quantity)
            }
        }
    }
    
    // only update state when logged in
    if(isLoggedIn){
        getCount();
    }
    
    // Handle Click Function to add to cart
    const handleAddToCart = async(e) => {
    
        if (!isLoggedIn){
            history.push('/login');  // redirects if user not logged in
        }

        const payload = {
            product_id: product.id,
            quantity: 1
        }
        
        await fetch("http://localhost:4001/api/users/myprofile/cart", {
            method: 'POST',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        getCount();
    }

    return (
        <div className="product-card" id={product.id}>
            <img src={src_path} alt="product-image" /> 
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-description">{product.description}</h2>
            <h2 className="product-price">${product.price}</h2>
            {
                cartCount ?
                <h2 className="product-inventory">In Cart: {cartCount}</h2> :
                <button onClick={handleAddToCart}>Add to Cart</button>
            }
            <h2 className="product-inventory">In Stock: {product.inventory}</h2>
        </div>
    );
}

export default ProductCard;