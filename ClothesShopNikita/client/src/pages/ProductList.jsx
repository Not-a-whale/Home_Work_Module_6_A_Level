import styled from "styled-components"
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import {useState} from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.div`
  margin: 20px;
  font-size: 2rem;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Filter = styled.h1`
  margin: 20px;
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 20px;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const ProductList = () => {
    const location = useLocation();
    const category = location.pathname.split("/")[2];
    const [filter, setFilters] = useState({});
    const [sort, setSorts] = useState({});

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters(
            {
                ...filter,
                [e.target.name]: value
            }
        )
    }
    return (
        <Container>
            <Title>{category ? category.toUpperCase() : 'Products'}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products: </FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option selected disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                </Filter>
                <Filter>
                    <Select name="size" onChange={handleFilters}>
                        <Option selected disabled>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products: </FilterText>
                    <Select onChange={e=>setSorts(e.target.value)}>
                        <Option value="newest">
                            Newest
                        </Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={category} filters={filter} sort={sort}/>
            <Newsletter />
            <Footer />
        </Container>
    )
}

export default ProductList;
