import { styled } from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fafafa;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;

  h2 {
    text-align: center;
    color: #333;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.9rem;
    color: #444;
    letter-spacing: 0.5px;
    margin-bottom: 0.3rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .error {
    color: #c0392b;
    font-size: 0.8rem;
    margin-top: -0.5rem;
  }
`;

// 👇 בדיוק כמו ב-Input
type FormProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

const Form = ({ children, ...rest }: FormProps) => (
  <StyledForm {...rest}>{children}</StyledForm>
);

export default Form;
