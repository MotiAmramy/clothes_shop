import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const CategoryButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e2e6ea;
  }
`;

const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

const CategoryNavbar = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category: string) => {
        navigate(`/category/${category}`);
    };

    return (
        <NavbarContainer>
            <CategoryButton onClick={() => navigate("/")}>All</CategoryButton>
            {categories.map((cat) => (
                <CategoryButton key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </CategoryButton>
            ))}
        </NavbarContainer>
    );
};

export default CategoryNavbar;
