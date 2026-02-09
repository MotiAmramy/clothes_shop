import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../ui/Button/Button";
import { StyledNav } from "../Navigation/Navigation";
import { Category, fetchCategories } from "../../../api/categoryApi";


/**
 * CategoryNavbar Component
 * 
 * Displays a secondary navigation bar with product categories.
 * Only visible on the Home page or Category pages.
 */
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

    /**
     * Navigates to the selected category page.
     */
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
