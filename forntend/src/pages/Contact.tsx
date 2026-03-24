import styled from "styled-components";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #6C5B7B;
  font-family: 'Playfair Display', serif;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  font-family: 'Open Sans', sans-serif;
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
`;

const ContactButton = styled.a<{ $bgColor: string; $hoverColor: string }>`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.$bgColor};
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s;
  width: 250px;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.$hoverColor};
  }
`;

const Contact = () => {
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || "972527123912";
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "hello@moda-clothing.com";

  return (
    <Container>
      <Title>Contact Us</Title>
      <Description>
        נשמח לעמוד לשירותכם! יש לכם שאלות, הצעות או סתם רוצים להגיד שלום?<br />
        אתם מוזמנים ליצור איתנו קשר באחת מהדרכים הבאות:
      </Description>
      <ContactLinks>
        <ContactButton
          href={`https://wa.me/${contactPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          $bgColor="#25D366"
          $hoverColor="#128C7E"
        >
          <FaWhatsapp size={24} />
          WhatsApp
        </ContactButton>

        <ContactButton
          href={`mailto:${contactEmail}`}
          $bgColor="#6C5B7B"
          $hoverColor="#4a3e54"
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(contactEmail);
            toast.success("האימייל הועתק בהצלחה!");
            window.location.href = `mailto:${contactEmail}`;
          }}
        >
          <FaEnvelope size={24} />
          Email Us
        </ContactButton>
      </ContactLinks>
    </Container>
  );
};

export default Contact;
