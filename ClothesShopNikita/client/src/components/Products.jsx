import React, {useEffect, useState} from 'react';
import Product from "./Product";
import axios from "axios";
import {LocalStorageKeysEnum} from "../assets/constants/localStorageKeys.enum";
import {IProduct} from "../assets/interfaces/IProduct";
import styled from "styled-components";
import {reactLocalStorage} from "reactjs-localstorage";
import {DataManagementService} from "../services/DataManagementService";

const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(${props=> props.width > 1440 ? 4 : props.width > 768 ? 3 : props.width > 480 ? 2 : 1}, 1fr);
  gap: 10px;
`;

const Products = ({cat, filters, sort}) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                await DataManagementService.getAllProducts(cat);
                setProducts((await axios.get(cat ? `http://localhost:8080/api/Shop=${cat}` : "http://localhost:8080/api/Shop")).data);
            } catch (err) {

            }
        }
        getProducts();
    }, [cat]);

    useEffect(() => {
        const allProducts = reactLocalStorage.getObject(LocalStorageKeysEnum.allProducts);
        cat && setFilteredProducts(!filters ? allProducts : allProducts.filter(item => Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value)
        })));
    }, [cat, filters]);

    useEffect(() => {
        if((sort="newest")) {
            setFilteredProducts(prev => {
                return [...prev].sort((a, b) => a.createdAt - b.createdAt)
            });
        } else if((sort === "asc")) {
            setFilteredProducts(prev => {
                return [...prev].sort((a, b) => a.price - b.price)
            })
        } else {
            setFilteredProducts(prev => {
                return [...prev].sort((a, b) => b.price - a.price)
            })
        }
    },[sort])

    const width = window.innerWidth;
    return (
        <Container width={width}>
            { cat ? filteredProducts.map((item, index) => (
                <Product item={item} key={index}/>
            )) : products.map((item) => <Product item={item} key={item.id} />)}
        </Container>
    );
}

export default Products;
