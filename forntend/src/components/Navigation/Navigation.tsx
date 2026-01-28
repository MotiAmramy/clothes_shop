import { styled } from "styled-components";
import Button from "../ui/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { useAuthStore } from "../../store/logginStore";
import useCartStore from "../../store/cartStore";
import { useUiStore } from "../../store/uiStore";

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

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate();

  const { isLoggedIn, logout, user } = useAuthStore()
  const { clearCart } = useCartStore()
  const { openCart } = useUiStore();

  const navigateHome = () => {
    navigate("/");
  };

  const navigateCheckout = () => {
    openCart();
  };

  const navigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    clearCart();
    navigate("/");
  };




  return (
    <StyledNav color="#d9c0c0ff">
      <NavGroup>
        <Logo onClick={navigateHome}>Moda</Logo>
      </NavGroup>
      {isLoggedIn && (
        <>
          <Button onClick={handleLogout}>Logout</Button>
          <Button onClick={navigateCheckout}>
            <FaCartShopping />
          </Button>
          <Button onClick={() => navigate('/orders')}>My Orders</Button>
          {user?.role === 'admin' && (
            <Button onClick={() => navigate('/admin')}>Admin</Button>
          )}
          <Button onClick={navigateHome}>Home</Button>
          <Button onClick={() => navigate('/profile')}>
            <FaUser />
          </Button>
        </>
      )}
      {location.pathname !== '/login' && !isLoggedIn && (
        <Button onClick={navigateLogin}>Login</Button>
      )}
    </StyledNav>
  );
};

export default Navigation;
