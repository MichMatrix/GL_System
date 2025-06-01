import './App.css';
import NavBar from './components/NavBar/NavBar';
import ListaDeMusica from './components/ListaDeMusica/ListaDeMusica';
import JanelaDeApresentacao from './components/JanelaDeApresentacao/JanelaDeApresentacao';
import ProjetarLogo from './components/ProjetarLogo/ProjetarLogo';
import logo from './assets/logo.png';
import logoInicial from './assets/slide_logo_church.png';
import logoMensagem from './assets/slide_mensagem.png';
import musicas from './utils/musicas.json';
import { useState, useEffect } from 'react';

function App() {
  const [musicaProjetada, setMusicaProjetada] = useState(null);
  const [imagemProjetada, setImagemProjetada] = useState(null);
  const [mostrarLogos, setMostrarLogos] = useState(false);
  const [imagemPersonalizada, setImagemPersonalizada] = useState(null);

  const logos = [
    { nome: 'Logo padrão', src: logo },
    { nome: 'Logo Inicial', src: logoInicial },
    { nome: 'Logo Mensagem', src: logoMensagem },
  ];

  // Recupera imagem personalizada do localStorage ao iniciar
  useEffect(() => {
    const storedImage = localStorage.getItem('imagemPersonalizada');
    if (storedImage) {
      setImagemPersonalizada({ nome: 'Imagem Personalizada', src: storedImage });
    }
  }, []);

  const handleImagemUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64Image = e.target.result;
        setImagemPersonalizada({ nome: 'Imagem Personalizada', src: base64Image });
        localStorage.setItem('imagemPersonalizada', base64Image);
      };
      reader.readAsDataURL(file); // lê como base64
    }
  };

  const removerImagemPersonalizada = () => {
    localStorage.removeItem('imagemPersonalizada');
    setImagemPersonalizada(null);
  };

  return (
    <main>
      <NavBar />
      <div className="main-layout">
        <img className='logo-main' src={logo} alt="logo" />

        <button onClick={() => setMostrarLogos(!mostrarLogos)}>
          Projetar Uma Imagem
        </button>
        <p className='descricao-logo'>
          Logo inicial da sua organização, imagens temáticas diferentes ou imagem de dias especiais.
        </p>

        {mostrarLogos && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagemUpload}
              style={{ marginBottom: '20px' }}
            />

            <div className="opcoes-logo">
              {[...logos, imagemPersonalizada]
                .filter(Boolean) // remove nulls
                .map((logoObj, idx) => (
                  <div
                    key={idx}
                    className="opcao-logo"
                    onClick={() => setImagemProjetada(logoObj.src)}
                  >
                    <img src={logoObj.src} alt={logoObj.nome} className="mini-logo" />
                    <p>{logoObj.nome}</p>
                  </div>
                ))}
            </div>

            {imagemPersonalizada && (
              <button
                onClick={removerImagemPersonalizada}
                className="add-image-btn"
              >
                Remover imagem personalizada adicionada
              </button>
            )}
          </div>
        )}

        <ListaDeMusica
          musicas={musicas}
          onProjetar={setMusicaProjetada}
        />

        {musicaProjetada && (
          <JanelaDeApresentacao
            musica={musicaProjetada}
            onFechar={() => setMusicaProjetada(null)}
          />
        )}

        {imagemProjetada && (
          <ProjetarLogo
            imagem={imagemProjetada}
            onFechar={() => {
              setImagemProjetada(null);
              setMostrarLogos(false);
            }}
          />
        )}
      </div>
    </main>
  );
}

export default App;
