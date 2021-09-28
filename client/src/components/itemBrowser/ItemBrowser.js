import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, loadItems, resetState } from './itemBrowserSlice';
import './itemBrowser.css';
import ProductCard from '../productCard/ProductCard';

function ItemBrowser (props) {
    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector((state) => state.itemBrowser);
    
    // Load product items
    useEffect(() => {
        dispatch(resetState());
        dispatch(loadItems());
    },[dispatch]);

    const products = useSelector(selectItems);

    if (isLoading){
        return (
            <div className="Product-list">
                <h1 className="loading">Loading...</h1>
            </div>
        );
    }

    if (hasError){
        return (
            <div className="Product-list">
                <h1 className="error">Ooops!  Something went wrong and we couldn't fetch data from server.  Reload and try again.</h1>
            </div>
        );
    }

    return (
        <div>
            {
                products.map(item => {
                    return (<ProductCard products={item} key={item.id}/>)
                })
            }
        </div>
    );
}

export default ItemBrowser;
