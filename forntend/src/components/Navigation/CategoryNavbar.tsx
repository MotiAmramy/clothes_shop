import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import { StyledNav } from "./Navigation";



const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
];

const CategoryNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation()


    if (location.pathname !== '/') {
        return null;
    }

    const handleCategoryClick = (category: string) => {
        navigate(`/category/${category}`);
    };

    return (
        <StyledNav>
            <Button onClick={() => navigate("/")}>All</Button>
            {categories.map((cat) => (
                <Button key={cat} onClick={() => handleCategoryClick(cat)}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
            ))}
        </StyledNav>
    );
};

export default CategoryNavbar;
