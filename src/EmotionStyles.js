import styled from '@emotion/styled';

export const Button = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: #acacac;
  font-size: 16px;
  border-radius: 4px;
  border: 0px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

export const Label = styled.label`
  color: deeppink;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 10px;
  font-size: 18px;
`;

export const Input = styled.input`
  border: 1px solid transparent;
  background-color: #f1f1f1;
  padding: 10px;
  font-size: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 500px;
`;

export const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Dropdown = styled.ul`
  margin: 0;
  padding: 0;
  border: 5px;
  text-align: left;
  background-color: white;
`;

export const DropdownOption = styled.button`
  margin: 4px;
  padding: 5px;
  font-size: 12px;
  border: 0px;
  color: black;
  background-color: white;
  &:hover {
    color: deeppink;
  }
`;

export const DropdownList = styled.li`
  margin: 0;
  padding: 0;
  background-color: none;
  list-style: none;
  display: flex;
  align-items: font-stretch;
  a &:hover {
    background-color: #f1f1f1;
  }
`;

export const ImageWrapper = styled.div`
  height: 500px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  max-width: 500px;
  max-height: 500px;
`;
