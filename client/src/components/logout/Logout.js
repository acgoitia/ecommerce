import React from 'react';
import { Link } from 'react-router-dom';
import './logout.css';

export default function Logout(props) {
    return (
        <div>
            <p>successfully logged out</p>
            <p>Return to <Link to="/">Home</Link></p>
        </div>
    )
}