import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './profileHomepage.css';

function ProfileHomepage (props) {
    
    const history = useHistory();
    const {isLoggedIn, profile} = useSelector((state) => state.login);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await fetch("/api/users/myprofile/orders", {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        setOrders(jsonData);
    }

    useEffect(() => {
        getOrders();
    }, [])

    const handleEdit = (e) => {
        history.push('/myprofile/userinfo')
    };

    const handleView = ({target}) => {
        history.push(`/myprofile/order/${target.value}`)
    }

    return (
        <div>
            {  isLoggedIn ? 
                <div>
                    <div className="user-info">
                        <h2>User Information</h2>
                        <h3>First Name: <span>{profile.first}</span></h3>
                        <h3>Last Name: <span>{profile.last}</span></h3>
                        <h3>Email: <span>{profile.email}</span></h3>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="order-history">
                        <h2>Order History</h2>
                        <table>
                            <tr>
                                <th className="view-order"></th>
                                <th className="date">Date</th>
                                <th className="order-no">Order #</th>
                                <th className="status">Status</th>
                                <th className="total">Total</th>
                            </tr>
                            {
                                orders.map((order) => {
                                    const t = order.created.split(/[- : T]/);
                                    const d = new Date(Date.UTC(t[0], t[1]-1, parseInt(t[2])+1));
                                    
                                    return (
                                        <tr>
                                            <td className="view-order"><button onClick={handleView} value={order.id}>View</button></td>
                                            <td className="date">{d.toDateString()}</td>
                                            <td className="order-no">#{order.id}</td>
                                            <td className="status">{order.status}</td>
                                            <td className="total">${order.total}</td>
                                        </tr>       
                                    );
                                })
                            }
                        </table>
                    </div>
                </div> :
                <Redirect to="/" ></Redirect>
            }
        </div>
    );
}

export default ProfileHomepage;

