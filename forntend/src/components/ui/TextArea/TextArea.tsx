












import { styled } from "styled-components";

const StyledInput = styled.textarea`
  border: 1px solid #ccc;
  color: #5c5c5c;
  letter-spacing: 1px;
  font-family: "Open Sans", serif;
  border-radius: 5px;
  background-color: transparent;
  padding: 0.5rem 1rem;
  transition: all 250ms ease-out;
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #9e9e9e;
  }

  &:hover {
    background-color: #f3f3f3;
  }

  &:focus {
    outline: none;
    border-color: #5c5c5c;
    background-color: #e9e9e9;
  }
`;

type TextAreaProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
>;

const TextArea = ({ ...rest }: TextAreaProps) => <StyledInput {...rest} />;

export default TextArea;