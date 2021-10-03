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
        <div className="order-detail">
            <h1 className="order-no">Order: #<span>{order_id}</span></h1>
            <h1>Date: <span>{date}</span></h1>
            <h1 className="status">Status: <span>{order[0].status}</span></h1>
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
                        items.map((item) => {
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
                        <td className="grand-total">${items.reduce(((prev, curr) => prev + (curr.quantity*curr.price)),0)}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;