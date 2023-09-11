import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FoBars } from "react-icons/fa";

export const Button = styled.button`
  background-color: rgb(99, 195, 160);
  color: white;
  padding: 5px 15px;
  border: 1px solid rgb(81, 176, 141);
  border-radius: 5px;
  outline: 0;
  text-transformation: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: rgb(81, 176, 141);
  }
`;

export const Button1 = styled.button`
  background-color: rgb(99, 195, 160);
  font-size: 16px;
  font-weight: 800;
  margin-top: 20px;
  color: white;
  padding: 10px 25px;
  border: 1px solid rgb(81, 176, 141);
  border-radius: 20px;
  outline: 0;
  text-transformation: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: rgb(81, 176, 141);
  }
`;

export const PayButton = styled.button`
  background-color: rgb(99, 195, 160);
  font-size: 16px;
  font-weight: 800;
  margin-top: 20px;
  color: white;
  width: 140px;
  padding: 10px 25px;
  border: 1px solid rgb(81, 176, 141);
  border-radius: 20px;
  outline: 0;
  text-transformation: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;
  &:hover {
    background-color: rgb(81, 176, 141);
  }
`;
