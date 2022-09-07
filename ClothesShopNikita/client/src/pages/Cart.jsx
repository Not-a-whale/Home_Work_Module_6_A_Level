import React, {useEffect, useState} from 'react'
import styled from 'styled-components';
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {Add, Remove} from "@material-ui/icons";
import {mobile} from "../assets/js/responsive";
import CartProduct from "../components/CartProduct";
import {DataManagementService} from "../services/DataManagementService";
import {reactLocalStorage} from "reactjs-localstorage";
import {LocalStorageKeysEnum} from "../assets/constants/localStorageKeys.enum";

const Container = styled.div`
  font-size: 1.2rem;
  ${mobile({ padding: "10px" })}
`;

const Wrapper = styled.div`
  padding: 20px; 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props=>props.type === 'filled' && 'none'}
  background-color: ${props=>props.type === 'filled' ? 'black' : 'transparent'}
  color: ${props=>props.type === 'filled' && 'white'}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

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

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === "total" && "500"};
  font-size: ${props=>props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 700;
`;

const Cart = () => {
    const [cartItems, setCart] = useState([]);
    const [productsInCart, setProductsInCart] = useState([]);
    const [sum, setSum] = useState(0);

    function calculateSum(cartProducts) {
        let sum = 0;
        cartProducts.forEach(item => {
            sum += (item.inOrder * item.price);
        });
        return sum;
    }

    async function checkout() {
        await DataManagementService.buy(cartItems);
    }

    useEffect((data) => {
        const cart = DataManagementService.cart;
        setCart(cart);

        const products = (DataManagementService.products)
            .filter(product => {
                return cart.some(item => {
                    return item.id === product.id
                })
            })
            .map(product => {
                const quantityInOrder = cart.find(item => item.id === product.id)?.quantity;
                return {
                    ...product,
                    inOrder: quantityInOrder
                }
            });
        setProductsInCart(products);
        setSum(calculateSum(products));
    }, []);

    return (
        <Container>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <TopButton type="filled">CONTINUE SHOPPING</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag (2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton >CONTINUE SHOPPING</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {
                            productsInCart.map((product, index) => (<Hr key={index}/>))
                        }
                        {
                            productsInCart.map((product, index) => (<CartProduct item={product} key={index}/>))
                        }
                    </Info>
                    <Summary>
                        <SummaryTitle>
                            ORDER SUMMARY
                        </SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>
                                Subtotal
                            </SummaryItemText>
                            <SummaryItemPrice>
                                $ {sum}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Estimated Shipping
                            </SummaryItemText>
                            <SummaryItemPrice>
                                $ 5.90
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>
                                Shipping Discount
                            </SummaryItemText>
                            <SummaryItemPrice>
                                $ -5.90
                            </SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText type="total">
                                Total
                            </SummaryItemText>
                            <SummaryItemPrice>
                                $ {sum}
                            </SummaryItemPrice>
                        </SummaryItem>
                        <Button onClick={checkout}>CHECKOUT NOW</Button>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    )
};

export default Cart;
