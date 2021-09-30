import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { updateUser } from '../login/loginSlice';
import './userInfo.css';

function UserInfo (props) {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const {isLoggedIn} = useSelector((state) => state.login);
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const handleChange = ({target}) => {
        user[target.id] = target.value;
        setUser({...user});
    }

    const handleClick = () => {
        history.push('/myprofile')
    }

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        const payload = user;
        const emptyUser = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        };

        if (JSON.stringify(payload) === JSON.stringify(emptyUser) ) {
            history.push('/myprofile');
        } else {
            await fetch("http://localhost:4001/api/users/myprofile", {
                method: 'PUT',
                credentials: 'include', // need to include in order for fetch method to send the cookie
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            dispatch(updateUser());
            history.push('/myprofile');
        }
    };

    return (
        <div>
            {  isLoggedIn ? 
                <div>
                    <form onSubmit={handleUserUpdate}>
                        <label for="first_name">First Name: </label><br/>
                        <input type="text" id="first_name" name="first_name" value={user.first} onChange={handleChange}/><br/>
                        <label for="last_name">Last Name: </label><br/>
                        <input type="text" id="last_name" name="last_name" value={user.last} onChange={handleChange}/><br/>
                        <label for="email">Email: </label><br/>
                        <input type="text" id="email" name="email" value={user.email} onChange={handleChange}/><br/>
                        <label for="password">Password: </label><br/>
                        <input type="password" id="password" name="password" value={user.password} onChange={handleChange}/><br/>
                        <input type="submit" value="Save"/>
                    </form>
                    <button onClick={handleClick}>Cancel</button>
                </div> :
                <Redirect to="/" ></Redirect>
            }
        </div>
    );
}

export default UserInfo;