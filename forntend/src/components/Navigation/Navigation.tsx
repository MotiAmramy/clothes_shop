import { styled } from "styled-components";
import Button from "../ui/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { useAuthStore } from "../../store/logginStore";
import useCartStore from "../../store/cartStore";

export const StyledNav = styled.nav`
  box-shadow: 0px 2px 3px #dedede;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  justify-content: space-between;
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

  const navigateHome = () => {
    navigate("/");
  };

  const navigateCheckout = () => {
    navigate("/checkout");
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
    <StyledNav>
      <NavGroup>
        <Logo onClick={navigateHome}>Moda</Logo>
        <Button onClick={navigateHome}>Home</Button>
      </NavGroup>
      {isLoggedIn && (
        <>
          <Button onClick={navigateCheckout}>
            <FaCartShopping />
          </Button>
          <Button onClick={() => navigate('/orders')}>My Orders</Button>
          {user?.role === 'admin' && (
            <Button onClick={() => navigate('/admin')}>Admin</Button>
          )}
          <Button onClick={() => navigate('/profile')}>
            <FaUser />
          </Button>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      )}
      {location.pathname !== '/login' && !isLoggedIn && (
        <Button onClick={navigateLogin}>Login</Button>
      )}
    </StyledNav>
  );
};

export default Navigation;
