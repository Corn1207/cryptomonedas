import React, { useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #ffffff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.2rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
  // State del custom hook
  const [state, actualizarState] = useState(stateInicial);

  const SelectCripto = () => {
    return (
      <>
        <Label>{label}</Label>
        <Select onChange={(e) => actualizarState(e.target.value)} value={state}>
          <option value=""> - Select -</option>
          {opciones.map((opcion) => (
            <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
              {opcion.CoinInfo.FullName}
            </option>
          ))}
        </Select>
      </>
    );
  };

  return [state, SelectCripto, actualizarState];
};

export default useCriptomoneda;
