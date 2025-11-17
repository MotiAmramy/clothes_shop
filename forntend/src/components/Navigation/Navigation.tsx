import { styled } from "styled-components";
import Button from "../ui/Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useAuthStore } from "../../store/logginStore";

const StyledNav = styled.nav`
  box-shadow: 0px 2px 3px #dedede;
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  justify-content: space-between;
`;

const Navigation = () => {
  const location = useLocation()
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore()

  const navigateHome = () => {
    navigate("/");
  };

  const navigateCheckout = () => {
    navigate("/checkout");
  };

 const navigateLogin = () => {
    navigate("/login");
  };




 return (
    <StyledNav color="blue">
      <Button onClick={navigateHome}>Home</Button>
      {isLoggedIn && (
        <Button onClick={navigateCheckout}>
          <FaCartShopping />
        </Button>
      )}
      {location.pathname !== '/login' &&!isLoggedIn && (
        <Button onClick={navigateLogin}>Login</Button>
    )}
    </StyledNav>
  );
};

export default Navigation;
