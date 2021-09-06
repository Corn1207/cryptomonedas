import React from "react";
import styled from "@emotion/styled";
import { BiExit } from "react-icons/bi";

const ResultadoDiv = styled.div`
  color: #fff;
  font-family: "Bebas Neue", cursive;
  width: 80%;
  border: 1px solid gray;
  padding: 0 10px;
  background-color: gray;
  border-radius: 10px;
  @media (min-width: 992px) {
    width: 40%;
  }
`;

const Parrafo = styled.p`
  font-size: 20px;
  padding-left: 20px;
  span {
    font-weight: bold;
    padding-left: 10px;
  }
`;

const Precio = styled.p`
  font-size: 30px;
  padding-left: 20px;
  span {
    font-weight: bold;
    padding-left: 10px;
  }
`;

const Close = styled.span`
  cursor: pointer;
  height: 48px;
  width: 48px;
  font-size: 24px;
  font-weight: bold;
  position: relative;
  top: 10px;
  right: -25px;
  float: right;

  &:hover {
    color: red;
  }
`;

const Background = styled.div`
  background: rgba(32, 35, 41, 0.8);
  position: fixed;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Cotizacion = ({
  resultado,
  handleResults,
  showResults,
  setShowResults,
}) => {
  if (Object.keys(resultado).length === 0 && showResults === false) return null;

  const close = () => {
    handleResults();
  };

  return (
    <Background>
      <ResultadoDiv>
        <Close onClick={close}>
          <BiExit />
        </Close>
        <Precio>
          Price: <span>{resultado.PRICE}</span>
        </Precio>
        <Parrafo>
          Highest price: <span>{resultado.HIGHDAY}</span>
        </Parrafo>
        <Parrafo>
          Lowest price: <span>{resultado.LOWDAY}</span>
        </Parrafo>
        <Parrafo>
          variant last 24 hours: <span>{resultado.CHANGEPCT24HOUR}</span>
        </Parrafo>
        <Parrafo>
          Last update: <span>{resultado.LASTUPDATE}</span>
        </Parrafo>
      </ResultadoDiv>
    </Background>
  );
};

export default Cotizacion;
