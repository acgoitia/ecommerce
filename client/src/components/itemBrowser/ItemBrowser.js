import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, loadItems, resetState, selectCategories, loadCategories } from './itemBrowserSlice';
import './itemBrowser.css';
import ProductCard from '../productCard/ProductCard';

function ItemBrowser (props) {
    const dispatch = useDispatch();
    
    // Extract global state with all products and categories included in database
    const { isLoading, hasError } = useSelector((state) => state.itemBrowser);
    const products = useSelector(selectItems);
    const categories = useSelector(selectCategories);
    
    // Local State used to filterproducts
    const [isChecked, setIsChecked] = useState([]); // need to turn it into array for each category
    const [filteredProducts, setFilteredProducts] = useState(products); // local state for product array with filtered list

    // Load product items
    useEffect(() => {
        dispatch(resetState());
        dispatch(loadItems());
        dispatch(loadCategories());
    },[dispatch]);
    
    // since loadItems is async, need to update filteredProducts once it is resolved
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    useEffect(() => {
        setIsChecked(categories.map((el) => true));
    }, [categories]);

    const handleFilter = (e) => {
        const index = e.target.id;
        // only toggle the value of relevant index
        const tmp = isChecked.map((el, i) => {
            if( i === parseInt(index)){
                return !el
            } else {
                return el
            }
        });
        setIsChecked(tmp); // state will be updated at end of render, but after calling next functions
        
        // filter array of categories
        const tmp2 = categories.filter((cat, i) => tmp[i]); // need to use tmp variables since state isn't updated until end of lifecycle
        const categoryIds = tmp2.map(cat => cat.id); 
        setFilteredProducts(products.filter(prod => categoryIds.includes(prod.categoryid)));
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


    // search functionality to be completed - needs additional API endpoint
    return (
        <div>
            <div className="search-bar">
                <input placeholder="search"></input>
            </div>
            <div className="main-body">
                <div className="sidebar">
                    <h1>Select Categories</h1>
                    {
                        categories.map((cat, i) => {
                            return (
                                <div key={i}>
                                    <label for={cat.category}>{cat.category}</label>
                                    <input type="checkbox" id={i} name={cat.category} checked={isChecked[i]} onChange={handleFilter} value={cat.id} />
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
