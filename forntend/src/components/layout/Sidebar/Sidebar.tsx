import styled, { keyframes } from "styled-components";
import { FaTimes, FaUser, FaBoxOpen, FaSignOutAlt, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import { useUiStore } from "../../../store/uiStore";
import { useAuthStore } from "../../../store/logginStore";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../../store/cartStore";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const SidebarPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  max-width: 85vw;
  height: 100%;
  background-color: #fff;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  animation: ${slideIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #d9c0c0ff;
  border-bottom: 1px solid #ccc;

  h2 {
    margin: 0;
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #333;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const MenuSection = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h3`
  margin: 0 1.5rem 0.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #999;
  font-family: "Open Sans", serif;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  font-family: "Open Sans", serif;
  font-size: 1rem;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #f5e6e6;
    color: #6C5B7B;
  }

  svg {
    font-size: 1.2rem;
    color: #6C5B7B;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding: 1.5rem;
  text-align: center;
  color: #999;
  font-size: 0.8rem;
  border-top: 1px solid #eee;
`;


/**
 * Sidebar Component
 * 
 * A slide-in sidebar menu that provides navigation to About Us, Contact Us,
 * and user settings (Profile, Orders, Logout) for logged-in users.
 */
const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useUiStore();
  const { isLoggedIn, logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = () => {
    logout();
    clearCart();
    closeSidebar();
    navigate("/");
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      <Overlay onClick={closeSidebar} />
      <SidebarPanel>
        <Header>
          <h2>Menu</h2>
          <CloseButton onClick={closeSidebar}>
            <FaTimes />
          </CloseButton>
        </Header>

        <MenuSection>
          <SectionTitle>Information</SectionTitle>
          <MenuItem onClick={() => handleNavigate("/about")}>
            <FaInfoCircle />
            About Us
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/contact")}>
            <FaEnvelope />
            Contact Us
          </MenuItem>
        </MenuSection>

        {isLoggedIn && (
          <MenuSection>
            <SectionTitle>Account</SectionTitle>
            <MenuItem onClick={() => handleNavigate("/profile")}>
              <FaUser />
              My Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigate("/orders")}>
              <FaBoxOpen />
              My Orders
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </MenuItem>
          </MenuSection>
        )}

        <Footer>
          <p>© 2026 Moda. All rights reserved.</p>
        </Footer>
      </SidebarPanel>
    </>
  );
};

export default Sidebar;
