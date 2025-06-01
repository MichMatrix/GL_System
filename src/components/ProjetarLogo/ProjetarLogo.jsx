import './projetarLogo.css';

function ProjetarLogo({ imagem, onFechar }) {
  const exibirEmTelaCheia = () => {
    const elem = document.getElementById('imagem-projetada');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <div className="projetar-logo">
      <img
        id="imagem-projetada"
        src={imagem}
        alt="Logo projetada"
        className="imagem-centralizada"
        onLoad={exibirEmTelaCheia}
      />
      <button className="botao-fechar" onClick={onFechar}>Fechar</button>
    </div>
  );
}

export default ProjetarLogo;
