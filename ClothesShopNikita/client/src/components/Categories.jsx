import React from 'react';
import styled from 'styled-components';
import { categories } from "../assets/js/data";
import CategoryItem from './CategoryItem';
import {mobile} from "../assets/js/responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = (props) => {
    return (
        <Container>
            {categories.map(item => (
                <CategoryItem item={item} key={item.id} />
            ))}
        </Container>
    )
}

export default Categories;
