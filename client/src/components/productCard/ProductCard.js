import React, { useEffect, useState } from "react";
import './productCard.css';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function ProductCard (props) {
    const product = props.products;
    const history = useHistory();
    const src_path = product.image_url; // *** src attribute has path relative to react app "public" folder by default ****
    const {isLoggedIn} = useSelector((state) => state.login); //need to create loginReducer
    const [cartCount, setCartCount] = useState(null);

    //Get cart count for loggedin user
    const getCount = async () => {
        const response = await fetch("/api/users/myprofile/cart", {
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
    useEffect(() => {
        if(isLoggedIn){
            getCount();
        } else {
            setCartCount(null);
        }
    }, [isLoggedIn])
    
    // Handle Click Function to add to cart
    const handleAddToCart = async(e) => {
    
        // redirects if user not logged in
        if (!isLoggedIn){
            history.push('/login');  
        } else {
            const payload = {
                product_id: product.id,
                quantity: 1
            }
            
            await fetch("/api/users/myprofile/cart", {
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
    }

    // update cart +
    const handleIncrement = async(e) => {
        const quant = cartCount + 1;
        const payload = {
            quantity: quant
        }
        
        await fetch(`/api/users/myprofile/cart/${product.id}`, {
            method: 'PUT',
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

    // update cart -
    const handleDecrease = async(e) => {
        if (cartCount <= 1){
            await fetch(`/api/users/myprofile/cart/${product.id}`, {
            method: 'DELETE',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
            });
            setCartCount(null);
        } else {
            const quant = cartCount - 1;
            const payload = {
                quantity: quant
            }
            
            await fetch(`/api/users/myprofile/cart/${product.id}`, {
                method: 'PUT',
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
    }

    const handleClick = (e) => {
        history.push(`/product/${product.id}`);
    }

    return (
        <div className="product-card" id={product.id}>
            <img src={src_path} alt="product" onClick={handleClick} /> 
            <h1 className="product-title">{product.name}</h1>
            <h2 className="product-description">{product.description}</h2>
            <h2 className="product-price">${product.price}</h2>
            {
                cartCount ?
                <div>
                    <button onClick={handleDecrease}>-</button>
                    <h2 className="product-inventory">In Cart: {cartCount}</h2>
                    <button onClick={handleIncrement}>+</button>
                </div> :
                <button onClick={handleAddToCart}>Add to Cart</button>
            }
            <h2 className="product-inventory">In Stock: {product.inventory}</h2>
        </div>
    );
}

export default ProductCard;