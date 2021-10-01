import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './cart.css';


function Cart (props) {

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

    console.log(cart);

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
                    </table>
                </div> : 
                <Redirect to="/" />
            }           
        </div>
    );
}

export default Cart;

// will need to redirect users to login page if not signed in