import {Add, FavoriteBorderOutlined, Remove, SearchOutlined, ShoppingCartOutlined} from "@material-ui/icons";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {mobile} from "../assets/js/responsive";
import {IProduct} from "../assets/interfaces/IProduct";
import exp from "constants";
import {DataManagementService} from "../services/DataManagementService";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  margin-left: 40px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;


const CartProduct = (item: IProduct & {inOrder: number}) => {
    const cartProduct = {...(item as any).item};
    let quantity = DataManagementService.cart.find(cartItem => cartItem.id === cartProduct.id)!.quantity;
    const [count, setCount] = useState(quantity);

    function addToCartMore() {
        DataManagementService.addToCart(cartProduct.id);
        setCount(DataManagementService.cart.find(cartItem => cartItem.id === cartProduct.id)!.quantity);
    }

    function removeFromCart() {
        DataManagementService.deleteFromTheCart(cartProduct.id);
        setCount(DataManagementService.cart.find(cartItem => cartItem.id === cartProduct.id)!.quantity);
    }

    return (
        <Product>
            <ProductDetail>
                <Image src={cartProduct.img} />
                <Details>
                    <ProductName>
                        <b>Product:</b> {cartProduct.title}
                    </ProductName>
                    <ProductId>
                        <b>ID:</b> {cartProduct.id}
                    </ProductId>
                    <ProductColor color="black"/>
                    <ProductSize><b>Size:</b> {cartProduct.size}</ProductSize>
                </Details>
            </ProductDetail>
            <PriceDetail>
                <ProductAmountContainer>
                    <Add onClick={addToCartMore}/>
                    <ProductAmount>{count}</ProductAmount>
                    <Remove onClick={removeFromCart}/>
                </ProductAmountContainer>
                <ProductPrice>$ {cartProduct.price * count}</ProductPrice>
            </PriceDetail>
        </Product>
    )
}

export default CartProduct;
