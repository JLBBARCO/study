import { useState } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import brasCubasIMG from "./assets/bras_cubas.jpeg";
import Capa from "./Capa";
import SeletorCapitulos from "./SeletorCapitulos";
import BotoesControle from "./BotoesControle";

function App() {
  // let taTocando = false;
  const [taTocando, definirTaTocando] = useState(false);
  const infoLivro = {
    nome: "Memórias Póstumas de Brás Cubas",
    autor: "Machado de Assis",
    totalCap: 2,
    capa: brasCubasIMG,
    textoAlternativo: "Capa do livro Memórias Póstumas de Brás Cubas",
  };

  return (
    <>
      <Capa
        imagemCapa={infoLivro.capa}
        textoAlternativo={infoLivro.textoAlternativo}
      />
      <SeletorCapitulos CapituloAtual={1} />
      <BotoesControle
        taTocando={taTocando}
        definirTaTocando={definirTaTocando}
      />
    </>
  );
}

export default App;
