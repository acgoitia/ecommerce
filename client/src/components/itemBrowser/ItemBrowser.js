import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, testAction, loadItems } from './itemBrowserSlice';
//import { Link } from 'react-router-dom';
import './itemBrowser.css';
import ProductCard from '../productCard/ProductCard';

function ItemBrowser (props) {
    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector((state) => state.itemBrowser);
    
    // Load product items
    useEffect(() => {
        dispatch(loadItems());
        //dispatch(testAction());
    },[]);
    const products = useSelector(selectItems);
    
    return (
        <div>
            <ProductCard products={products} isLoading={isLoading}/>
        </div>
    );
}

export default ItemBrowser;


// I should get the list of products from state.  Define that through the itemBrowserSlice which will have the reducer to call the DB