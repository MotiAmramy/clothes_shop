import { styled } from "styled-components";

const StyledButton = styled.button`
    border: none;
    color: #5c5c5c;
    text-shadow: 0 1px 1px darkgrey;
    letter-spacing: 2px;
    font-family: "Open Sans", serif;
    border-radius: 5px;
    background-color: transparent;
    padding: 0.5rem 1rem;
    transition: all 250ms ease-out;

    &:hover {
        cursor: pointer;
        color: black;
        background-color: #d3d3d3;
    }

    &:focus {
        outline: none;
    }    
`

type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({ children, ...rest }: ButtonProps)  => (
    <StyledButton {...rest} >{children}</StyledButton>
)

export default Button

