import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { resetState } from '../login/loginSlice';
import './header.css';

// help navigate between:  home, cart, login, profile, sign out
// need to add bubble with cart items

function Header (props) {

    const dispatch = useDispatch();
    const history = useHistory();
    const {isLoggedIn} = useSelector((state) => state.login);

    const handleCart = (e) => {
        if (isLoggedIn){
            history.push('/cart');  
        } else {
            history.push('/login');
        }  
    }

    const handleUser = (e) => {
        if (isLoggedIn){
            history.push('/myprofile');  
        } else {
            history.push('/login');
        }
    }

    const handleHome = (e) => {
        history.push('/');  
    }

    const handleLogOut = async (e) =>{
        await fetch('http://localhost:4001/api/logout', {credentials: 'include'});
        // clear isLoggedIn state & Counter State
        dispatch(resetState());
        // redirect to homepage
        history.push('/logout');
    }

    return (
        <header>
            <div className="home-icon left">
                <FontAwesomeIcon icon={faHome} onClick={handleHome} />
            </div>
            <div className="right">
                <div className="user-profile-icon">
                    {
                        isLoggedIn ? <FontAwesomeIcon icon={faUser} onClick={handleUser} /> : null
                    }
                </div>
                <div className="cart-icon">
                    <FontAwesomeIcon icon={faShoppingCart} onClick={handleCart} />
                </div>
                <div className="button">
                    {
                        isLoggedIn ? <button onClick={handleLogOut}>Sign Out</button> : <button onClick={handleUser}>Login</button>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;