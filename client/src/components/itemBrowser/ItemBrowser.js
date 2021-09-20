import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems } from './itemBrowserSlice';
//import { Link } from 'react-router-dom';
import './itemBrowser.css';
import ProductCard from '../productCard/ProductCard';

function ItemBrowser (props) {
    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector((state) => state.itemBrowser);
    
    // Load product items
    useEffect(() => {
        dispatch(selectItems());
    },[dispatch]);
    const products = useSelector(selectItems);
    
    if (isLoading){
        return (
           <div className="items-browser">
               <h1 className="loading">Loading...</h1>
           </div>
        );
    }
    
    if (hasError){
        return (
           <div className="items-browser">
               <h1 className="error">Ooops!  Something went wrong.  Reload and try again.</h1>
           </div>
        );
    }
    
    return (
        <div>
            <ProductCard products={products}/>
        </div>
    );
}

export default ItemBrowser;


// I should get the list of products from state.  Define that through the itemBrowserSlice which will have the reducer to call the DB