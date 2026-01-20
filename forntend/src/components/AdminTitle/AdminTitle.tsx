import styled, { keyframes } from "styled-components";

// אנימציה קלה של fade-in + slide
const fadeSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AdminTitle = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 1px;

  /* Gradient לטקסט */
  background: linear-gradient(90deg, #000000ff, #50e3c2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  animation: ${fadeSlide} 1s ease-out forwards;

  /* קו תחתון מודרני */
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px; /* מרחק מהטקסט */
    width: 100%;
    height: 4px; /* עובי הקו */
    border-radius: 2px;
    background: linear-gradient(90deg, #4a90e2, #50e3c2); /* אותו גרדיאנט כמו הטקסט */
  }
`;



export const AdminTitles = ({ title, size }: { title: string, size?: string }) => <AdminTitle style={{ fontSize: size }}>{title}</AdminTitle>;

