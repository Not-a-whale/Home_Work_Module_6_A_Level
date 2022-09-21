import React, {useEffect, useState} from 'react';
import './App.css';
import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Route, Routes,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Announcement from "./components/Announcement";
import {reactLocalStorage} from "reactjs-localstorage";
import {LocalStorageKeysEnum} from "./assets/constants/localStorageKeys.enum";
import {DataManagementService} from "./services/DataManagementService";

const App = () => {

    const [productsInCart, setProducts] = useState(0);

    useEffect(() => {
        const getCart = () => {
            let count = 0;
            DataManagementService.cart.forEach(elem => {
                count += elem.quantity;
            })
            setProducts(count);
        }
        getCart();
    });
    return (
        <Router>
            <Announcement />
            <Navbar numberOfItems={productsInCart}/>
            <Routes>
                <Route path="/" element={<Home />}>
                </Route>
                <Route path="/products" element={<ProductList />}>
                </Route>
                <Route path="/products/:category" element={<ProductList />}>
                </Route>
                <Route path="/product/:id" element={<Product />}>
                </Route>
                <Route path="/cart" element={<Cart />}>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;
