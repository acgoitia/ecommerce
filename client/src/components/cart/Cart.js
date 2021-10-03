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
        const response = await fetch("/api/users/myprofile/cart", {
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
        const response = await fetch("/api/users/myprofile/cart/checkout", {
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
                <div className="cart">
                    <div className="table-container">
                        <table>
                            <tr>
                                <th className="qty">Quantity</th>
                                <th className="name">Item</th>
                                <th className="description">Description</th>
                                <th className="price">Price</th>
                                <th className="total">Total</th>
                            </tr>
                            {
                                cart.map((item) => {
                                    return (<tr>
                                        <td className="qty">{item.quantity}</td>
                                        <td className="name">{item.name}</td>
                                        <td className="description">{item.description}</td>
                                        <td className="price">${item.price}</td>
                                        <td className="total">${item.quantity*item.price}</td>
                                    </tr>)
                                })
                            }
                            <tr id="total">
                                <td className="grand-total">TOTAL</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className="grand-total">${cart.reduce(((prev, curr) => prev + (curr.quantity*curr.price)),0)}</td>
                            </tr>
                        </table>
                    </div>
                    <button onClick={handleCheckout}>Checkout</button>
                </div> : 
                <Redirect to="/" />
            }           
        </div>
    );
}

export default Cart;

// will need to redirect users to login page if not signed in