import { styled } from "styled-components";
import Button from "../../ui/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { useAuthStore } from "../../../store/logginStore";
import { useUiStore } from "../../../store/uiStore";
import { Welcome } from "../../home/Welcome/welcome";

export const StyledNav = styled.nav`
  box-shadow: 0px 2px 3px #dedede;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  justify-content: space-between;
  background-color: ${(props) => props.color || "#6C5B7B"};
  color: white;
`;


const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.h1`
  margin: 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #333;
  cursor: pointer;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #5c5c5c;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;


/**
 * Navigation Component
 * 
 * Main application header.
 * Handles navigation to different pages (Home, Login, Orders, Admin, Profile)
 * and actions like Logout, opening the Cart, and opening the Sidebar.
 */
const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate();

  const { isLoggedIn, user } = useAuthStore()
  const { openCart, openSidebar } = useUiStore();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateCheckout = () => {
    openCart();
  };

  const navigateLogin = () => {
    navigate("/login");
  };


  return (
    <StyledNav color="#d9c0c0ff">
      <NavGroup>
        <MenuButton onClick={openSidebar} aria-label="Open menu">
          <FaBars />
        </MenuButton>
        <Logo onClick={navigateHome}>Moda</Logo>
      </NavGroup>
      {isLoggedIn && (
        <>
          <Button onClick={navigateCheckout}>
            <FaCartShopping />
          </Button>
          {user?.role === 'admin' && (
            <Button onClick={() => navigate('/admin')}>Admin</Button>
          )}
          <Welcome name={user!.name} />
        </>
      )}
      {location.pathname !== '/login' && !isLoggedIn && (
        <Button onClick={navigateLogin}>Login</Button>
      )}
    </StyledNav>
  );
};

export default Navigation;

