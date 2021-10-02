import React, {useState, useEffect} from 'react';
import './itemDetail.css';
import {getCount, fetchCart, increment, decrease, renderItem} from '../../utils';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ItemDetail (props) {

    const product_id = props.match.params.id;
    const [item, setItem] = useState({
        id: null,
        name: null,
        price: null,
        inventory: null,
        categoryid: null,
        image_url: null,
        description: null
    });

    const getItem = async () => {
        const response = await fetch(`http://localhost:4001/api/products/${product_id}`);
        const jsonData = await response.json();
        setItem(jsonData);
    }

    useEffect(() => {
        getItem()
    }, [])
    
    const history = useHistory();
    const {isLoggedIn} = useSelector((state) => state.login);
    const [cartCount, setCartCount] = useState(null);
    
    // only update state when logged in
    useEffect(() => {
        if(isLoggedIn){
            setCartCount(getCount(item));
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
            fetchCart(item)
            setCartCount(getCount(item));
        }
    }

    // update cart +
    const handleIncrement = async(e) => {
        increment(cartCount, item)
        setCartCount(getCount(item));
    }

    // update cart -
    const handleDecrease = async(e) => {
        decrease(cartCount, item)
        if(cartCount <= 1){
            setCartCount(null)
        } else {
            setCartCount(getCount(item))
        }
    }

    return (
        <div>
            <div className="item-detail">
                <div className="left">
                    <h1 className="product-title">{item.name}</h1>
                    <img src={item.image_url} alt="product" /> 
                </div>
                <div className="right">
                    <h2 className="product-description">{item.description}</h2>
                    <h2 className="product-price">${item.price}</h2>
                    <h3 className="product-inventory">In Stock: {item.inventory}</h3>
                </div>
            </div>
            <div className="bottom">
                {
                    cartCount ?
                    <div>
                        <button onClick={handleDecrease}>-</button>
                        <h2 className="product-inventory">In Cart: {cartCount}</h2>
                        <button onClick={handleIncrement}>+</button>
                    </div> :
                    <button onClick={handleAddToCart}>Add to Cart</button>
                }
            </div>
        </div>
    );
}

export default ItemDetail;

/*
<img src={item.image_url} alt="product"/> 
<h1 className="product-title">{item.name}</h1>
<h2 className="product-description">{item.description}</h2>
<h2 className="product-price">${item.price}</h2>
<h2 className="product-inventory">In Stock: {item.inventory}</h2>
*/