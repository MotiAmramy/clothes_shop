import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import { StyledNav } from "./Navigation";
import { Category, fetchCategories } from "../../api/categoryApi";

const CategoryNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories().then(setCategories).catch(console.error);
    }, []);

    if (location.pathname !== '/' && !location.pathname.startsWith('/category/')) {
        return null;
    }

    const handleCategoryClick = (category: string) => {
        navigate(`/category/${category}`);
    };

    return (
        <StyledNav color="#fbc0bbff">
            <Button onClick={() => navigate("/")}>All</Button>
            {categories.map((cat) => (
                <Button key={cat._id} onClick={() => handleCategoryClick(cat.name)}>
                    {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </Button>
            ))}
        </StyledNav>
    );
};

export default CategoryNavbar;
