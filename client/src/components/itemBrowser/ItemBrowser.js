import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, loadItems, resetState, selectCategories, loadCategories } from './itemBrowserSlice';
import './itemBrowser.css';
import ProductCard from '../productCard/ProductCard';

function ItemBrowser (props) {
    const dispatch = useDispatch();
    const { isLoading, hasError } = useSelector((state) => state.itemBrowser);
    const [isCheked, setIsChecked] = useState(true)
    
    // Load product items
    useEffect(() => {
        dispatch(resetState());
        dispatch(loadItems());
        dispatch(loadCategories());
    },[dispatch]);

    const products = useSelector(selectItems);
    const categories = useSelector(selectCategories);
    
    // Variables to handle filtering feature
    var categoryIds = categories.map(cat => cat.id); 
    var filteredProducts = products;
    // CONTINUE HERE TO FILTER BASED ON CHECKBOXES
    const handleFilter = (e) => {
        setIsChecked(!isCheked);
        const selectedCategory = e.target.value;
        console.log(filteredProducts);
        filteredProducts = products.filter(prod => categoryIds.includes(prod.categoryid));
        console.log(filteredProducts);
    }

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
            <div className="search-bar">
                <input placeholder="search"></input>
            </div>
            <div className="main-body">
                <div className="sidebar">
                    <h1>Select Categories</h1>
                    {
                        categories.map(cat => {
                            return (
                                <div key={cat.id}>
                                    <label for={cat.category}>{cat.category}</label>
                                    <input type="checkbox" id={cat.id} name={cat.category} checked={isCheked} onChange={handleFilter} value={cat.id} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Product-list">
                    {
                        filteredProducts.map(item => {
                            return (<ProductCard products={item} key={item.id}/>)
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ItemBrowser;
