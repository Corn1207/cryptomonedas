import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import image from "./assets/cryptomonedas.png";
import imageMobile from "./assets/cryptomonedasMobile.png";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spinner from "./components/Spinner/Spinner";
/* import { Scroll } from "react-scroll"; */

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const DivImage = styled.div`
  width: 100%;
  max-width: 100%;
  height: 120px;
  background-image: url(${imageMobile});
  background-repeat: no-repeat;
  background-size: cover;
  @media (min-width: 992px) {
    background-image: url(${image});
    width: 100%;
    max-width: 100%;
    height: 80%;
    margin-top: 5rem;
    display: inline-block;
  }
`;

/* const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
  display: none;
  background-image: url(./assets/cryptomonedas.png);
  @media (min-width: 992px) {
    display: inline-block;
  }
`; */

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 45px;
  margin-bottom: 50px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }

  @media (min-width: 992px) {
    margin-top: 80px;
  }
`;

function App() {
  const [moneda, guardarMoneda] = useState("");
  const [criptomoneda, guardarCriptomoneda] = useState("");
  const [resultado, guardarResultado] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [cargando, guardarCargando] = useState(false);

  const handleResults = () => {
    setShowResults(!showResults);
  };

  useEffect(() => {
    // evitamos la ejecución la primera vez
    if (moneda === "") return;
    //if (resultado === "" & !showResults) return;

    const consultarAPI = async () => {
      // mostrar Spinner
      guardarCargando(true);
      // Consultar la api para obtener la cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      setTimeout(() => {
        guardarCargando(false);
        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        setShowResults(true);
      }, 2500);
    };

    consultarAPI();
  }, [moneda, criptomoneda]);

  return (
    <Contenedor>
      <DivImage>{/* <Image src={image} alt="Cryptomonedas" /> */}</DivImage>
      <div>
        <Heading>Quote cryptocurrencies instantly</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          resultado={resultado}
          handleResults={handleResults}
        />
        {cargando ? <Spinner /> : null}
        {showResults & !cargando ? (
          <Cotizacion
            resultado={resultado}
            guardarResultado={guardarResultado}
            handleResults={handleResults}
          />
        ) : null}
      </div>
    </Contenedor>
  );
}

export default App;
