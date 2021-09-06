import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #ffffff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({ guardarMoneda, guardarCriptomoneda, handleResults, resultado, guardarCargando }) => {
  // State del listado de criptomonedas
  const [listacripto, guardarListacripto] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "PEN", nombre: "Peruvian Sol" },
    { codigo: "USD", nombre: "American dollar" },
    { codigo: "MXN", nombre: "Mexican Peso" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Pound sterling" },
  ];
  // Utilizar useMoneda
  const [moneda, SelectMoneda] = useMoneda("Choose your currency", "", MONEDAS);

  // Utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Choose your cryptocurrency",
    "",
    listacripto
  );

  // Ejecutar llamado a API llamando a criptomonedas
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      guardarListacripto(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  // OnSubmit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    // Validar si ambos campos estan seleccionados
    if (moneda === "" || criptomoneda === "") {
      guardarError(true);
      return;
    }

    // Pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda);

    if(resultado !== "") {
      handleResults()
    }
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="All fields are required" /> : null}
      <SelectMoneda />
      <SelectCripto />
      <Boton type="submit" value="Calculate" />
    </form>
  );
};

export default Formulario;
