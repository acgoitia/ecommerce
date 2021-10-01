import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import './profileHomepage.css';

function ProfileHomepage (props) {
    
    const history = useHistory();
    const {isLoggedIn, profile} = useSelector((state) => state.login);
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const response = await fetch("http://localhost:4001/api/users/myprofile/orders", {
            method: 'GET',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors'
        });
        const jsonData = await response.json();
        console.log(jsonData)
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
                        <h3>First Name: {profile.first}</h3>
                        <h3>Last Name: {profile.last}</h3>
                        <h3>Email: {profile.email}</h3>
                        <button onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="order-history">
                        <h2>Order History</h2>
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Order #</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                            {
                                orders.map((order) => {
                                    const t = order.created.split(/[- : T]/);
                                    const d = new Date(Date.UTC(t[0], t[1]-1, parseInt(t[2])+1));
                                    
                                    return (<div>
                                        <tr>
                                            <th>{d.toDateString()}</th>
                                            <th>#{order.id}</th>
                                            <th>{order.status}</th>
                                            <th>${order.total}</th>
                                            <th><button onClick={handleView} value={order.id}>View</button></th>
                                        </tr>       
                                    </div>);
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

