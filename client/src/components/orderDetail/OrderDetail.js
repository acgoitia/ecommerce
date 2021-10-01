import React, {useState, useEffect} from "react";
import './orderDetail.css';

function OrderDetail (props) {
    
    const order_id = props.match.params.id;
    const [order, setOrder] = useState(
        [{
            id: order_id,
            created: "",
            status: ""
        }]
    );
    const [items, setItems] = useState([{
        price: null,
        quantity: null,
        description: null,
        name: null
    }]);
    
    const getOrder = async () => {
        const response = await fetch("http://localhost:4001/api/users/myprofile/orders", {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        const orderData = jsonData.filter(el => parseInt(el.id) === parseInt(order_id));
        setOrder(orderData);
    }
    
    const getItems = async() => {
        const response = await fetch(`http://localhost:4001/api/users/myprofile/orders/${order_id}`, {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        setItems(jsonData);
    }
    
    useEffect(() => {
        getOrder();
        getItems();
    }, [])

    // date formatting
    const t = order[0].created.split(/[- : T]/);
    const d = new Date(Date.UTC(t[0], t[1]-1, parseInt(t[2])+1));
    const date = d.toDateString();
    console.log(items);

    return (
        <div>
            <h1>Order #: {order_id}</h1>
            <h1>Date: {date}</h1>
            <h1>Status: {order[0].status}</h1>
            <table>
                <tr>
                    <th>Quantity</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
                {
                    items.map((item) => {
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
                    <td>${items.reduce(((prev, curr) => prev + (curr.quantity*curr.price)),0)}</td>
                </tr>
            </table>
        </div>
    );
}

export default OrderDetail;