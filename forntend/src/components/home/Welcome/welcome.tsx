import styled, { keyframes } from "styled-components";

// אנימציה קטנה ל-emoji
const wave = keyframes`
  0% { transform: rotate(0deg); }
  15% { transform: rotate(14deg); }
  30% { transform: rotate(-8deg); }
  45% { transform: rotate(14deg); }
  60% { transform: rotate(-4deg); }
  75% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`;

const WelcomeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px;
`;

const WelcomeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 8px 16px;
  background: linear-gradient(135deg, #ffeaea, #d9c0c0);
  border-radius: 25px;

  font-size: 0.85rem;
  color: #333;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-left: 3px solid #ffffffff;
`;

const Emoji = styled.span`
  font-size: 1.2rem;
  animation: ${wave} 2s infinite;
  display: inline-block;
`;

const WelcomeLine = styled.div`
  text-align: center;

  h3 {
    margin: 0;
    font-size: 0.9rem;
    color: #333;
    font-family: "Open Sans", serif;
  }
`;

export const Welcome = ({ name }: { name: string }) => (
  <WelcomeWrapper>
    <WelcomeCard>
      <Emoji>👋</Emoji>
      <WelcomeLine>
        <h3>Hello, <strong>{name}</strong></h3>
      </WelcomeLine>
    </WelcomeCard>
  </WelcomeWrapper>
);