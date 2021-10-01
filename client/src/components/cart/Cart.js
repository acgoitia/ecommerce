import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './cart.css';


function Cart (props) {

    const history = useHistory();
    const {isLoggedIn} = useSelector((state) => state.login);
    const [cart, setCart] = useState([{
        product_id: null,
        price: null,
        quantity: null
    }]);

    const getCart = async () => {
        const response = await fetch("http://localhost:4001/api/users/myprofile/cart", {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        setCart(jsonData);
    };

    useEffect(() => {
        getCart()
    }, [])

    const handleCheckout = async (e) => {
        // generae order
        const response = await fetch("http://localhost:4001/api/users/myprofile/cart/checkout", {
                method: 'POST',
                credentials: 'include', // need to include in order for fetch method to send the cookie
                mode: 'cors'
            });
        
        const jsonData = await response.json();
        const order_id = jsonData[0].id;

        // redirect to confirmation page
        history.push(`/checkout/${order_id}`)
    }

    return(
        <div>
            {isLoggedIn ? 
                <div>
                    <table>
                        <tr>
                            <th>Quantity</th>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        {
                            cart.map((item) => {
                                return (<tr>
                                    <td>{item.quantity}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                    <td>${item.quantity*item.price}</td>
                                </tr>)
                            })
                        }
                        <tr id="total">
                            <td>TOTAL</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>${cart.reduce(((prev, curr) => prev + (curr.quantity*curr.price)),0)}</td>
                        </tr>
                    </table>
                    <button onClick={handleCheckout}>Checkout</button>
                </div> : 
                <Redirect to="/" />
            }           
        </div>
    );
}

export default Cart;

// will need to redirect users to login page if not signed in