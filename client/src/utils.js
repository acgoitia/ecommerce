// add wrapper here
// getCount, fetchCart, increment, decrease, renderItem

//Get cart count for loggedin user
export const getCount = async (product) => {
    const response = await fetch("/api/users/myprofile/cart", {
        method: 'GET',
        credentials: 'include', // need to include in order for fetch method to send the cookie
        mode: 'cors'
    });
    const jsonData = await response.json();
    if (jsonData[0]){
        const cartItem = jsonData.filter(item => item.product_id === product.id);
        if (cartItem[0]){
            return(cartItem[0].quantity);  // return into setCartCount
        }
    }
}

// support function for "handleAddToCart" 
export const fetchCart = async (product) => {
    const payload = {
        product_id: product.id,
        quantity: 1
    }
    
    await fetch("/api/users/myprofile/cart", {
        method: 'POST',
        credentials: 'include', // need to include in order for fetch method to send the cookie
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

// support function for handleIncrement
export const increment = async (cartCount, product) => {
    const quant = cartCount + 1;
    const payload = {
        quantity: quant
    }
    
    await fetch(`/api/users/myprofile/cart/${product.id}`, {
        method: 'PUT',
        credentials: 'include', // need to include in order for fetch method to send the cookie
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
}

// Support function for handleDecrease
export const decrease = async (cartCount, product) => {
    if (cartCount <= 1){
        await fetch(`/api/users/myprofile/cart/${product.id}`, {
        method: 'DELETE',
        credentials: 'include', // need to include in order for fetch method to send the cookie
        mode: 'cors'
        });
        return(null);  // if it returns, add to setCartCount
    } else {
        const quant = cartCount - 1;
        const payload = {
            quantity: quant
        }
        
        await fetch(`/api/users/myprofile/cart/${product.id}`, {
            method: 'PUT',
            credentials: 'include', // need to include in order for fetch method to send the cookie
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }); 
    }
}



export const renderItem = (product, handleClick, cartCount, handleDecrease, handleIncrement, handleAddToCart) => {
    
    return (<div className="product-card" id={product.id}>
        <img src={product.image_url} alt="product" onClick={handleClick} /> 
        <h1 className="product-title">{product.name}</h1>
        <h2 className="product-description">{product.description}</h2>
        <h2 className="product-price">${product.price}</h2>
        {
            cartCount ?
            <div>
                <button onClick={handleDecrease}>-</button>
                <h2 className="product-inventory">In Cart: {cartCount}</h2>
                <button onClick={handleIncrement}>+</button>
            </div> :
            <button onClick={handleAddToCart}>Add to Cart</button>
        }
        <h2 className="product-inventory">In Stock: {product.inventory}</h2>
    </div>)
}
