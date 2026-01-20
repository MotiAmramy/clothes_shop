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
  justify-content: center;
  margin: 24px 0;
`;

const WelcomeCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  padding: 18px 32px;
  background: linear-gradient(135deg, #f0f4ff, #d9e6ff);
  border-radius: 50px;

  font-size: 1rem;
  color: #333;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
`;

const Emoji = styled.span`
  font-size: 2.5rem;
  animation: ${wave} 2s infinite;
  display: inline-block;
`;

const WelcomeLine = styled.div`
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: #2a2a2a;
  }

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: #a0c4ff;
    margin: 12px auto 0;
    border-radius: 2px;
  }
`;

export const Welcome = ({ name }: { name: string }) => (
    <WelcomeWrapper>
        <WelcomeCard>
            <WelcomeLine>
                <h3>
                    <strong>Hello {name}!</strong>
                </h3>
            </WelcomeLine>
            <Emoji>👋</Emoji>
        </WelcomeCard>
    </WelcomeWrapper>
);