import './janelaDeApresentacao.css';
import { useState, useEffect } from 'react';
import previous from '../../assets/apresentacao/arrow_next.png';
import next from '../../assets/apresentacao/arrow_previous.png';
import fullscreen from '../../assets/apresentacao/full-screen.png';
import close from '../../assets/apresentacao/close.svg';

function JanelaDeApresentacao({ musica, onFechar }) {
  const paragrafos = musica.letra.split('\n\n');
  const [indice, setIndice] = useState(0);

  const anterior = () => {
    if (indice > 0) setIndice(indice - 1);
  };

  const proximo = () => {
    if (indice < paragrafos.length - 1) setIndice(indice + 1);
  };

  const exibirEmTelaCheia = () => {
    const elem = document.getElementById('letra-musica');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        proximo();
      } else if (event.key === 'ArrowLeft') {
        anterior();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Remove o listener quando o componente for desmontado
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [indice, paragrafos.length]); // dependências atualizadas

  return (
    <div className="janela-apresentacao">
      <h2>{musica.titulo} - {musica.cantor}</h2>
      <div id="letra-musica" className="letra-musica">
        <p>{paragrafos[indice]}</p>
      </div>
      <div className="botoes-navegacao">
        <button onClick={anterior}> <img className='arrow' src={next} alt="arrow-right"/><p>Anterior</p> </button>
        <button onClick={proximo}><p>Próximo</p><img className='arrow' src={previous} alt="arrow-left"/></button>
        <button onClick={exibirEmTelaCheia}><img className='arrow' src={fullscreen} alt="expandir"/>Tela Cheia</button>
        <button onClick={onFechar}><img className='arrow' src={close} alt="expandir"/>Fechar</button>
      </div>
    </div>
  );
}

export default JanelaDeApresentacao;
