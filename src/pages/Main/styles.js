import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #63afa2;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 3px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #63afa2;
      text-decoration: none;
    }
  }
`;

export const Input = styled.input.attrs(props => ({
  error: props.error,
}))`
  flex: 1;
  border: 1px solid #eee;
  padding: 10px 15px;
  border-radius: 4px;
  font-size: 16px;
  ${props =>
    props.error &&
    css`
      border-color: #ff0000;
    `};
`;

export const Empty = styled.div`
  margin-top: 20px;
  padding: 20px;
  p {
    color: #666;
    text-align: justify;
    opacity: 0.7;
  }
`;
