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

const useMoneda = (label, stateInicial, opciones) => {
  // State del custom hook
  const [state, actualizarState] = useState(stateInicial);

  const Seleccionar = () => {
    return (
      <>
        <Label>{label}</Label>
        <Select
          onChange={(e) => {
            actualizarState(e.target.value);
          }}
          value={state}
        >
          <option value=""> - Select -</option>
          {opciones.map((opcion) => (
            <option key={opcion.codigo} value={opcion.codigo}>
              {opcion.nombre}
            </option>
          ))}
        </Select>
      </>
    );
  };

  return [state, Seleccionar, actualizarState];
};

export default useMoneda;
