import { useState, useEffect } from 'react';
import './listaDeMusica.css';
import musicasData from '../../utils/musicas.json';
import VerMinhasListas from '../VerMinhasListas/VerMinhasListas';

function ListaDeMusica({ onProjetar }) {
  const [musicas, setMusicas] = useState([]);
  const [musicasSelecionadas, setMusicasSelecionadas] = useState([]);
  const [listas, setListas] = useState({});
  const [mostrarListas, setMostrarListas] = useState(false);

  useEffect(() => {
    setMusicas(musicasData);
  }, []);

  const toggleSelecionada = (id) => {
    if (musicasSelecionadas.includes(id)) {
      setMusicasSelecionadas(musicasSelecionadas.filter((m) => m !== id));
    } else {
      setMusicasSelecionadas([...musicasSelecionadas, id]);
    }
  };

  const adicionarNaLista = () => {
    const nomeLista = 'Nova Lista Do Domingo ';
    const listaAtual = listas[nomeLista] || [];
    const novasMusicas = [...new Set([...listaAtual, ...musicasSelecionadas])];
    setListas({ ...listas, [nomeLista]: novasMusicas });
    setMusicasSelecionadas([]);
    alert(`Músicas adicionadas à lista "${nomeLista}"`);
  };

  const removerDaLista = (nomeLista, idMusica) => {
    const novaLista = listas[nomeLista].filter((id) => id !== idMusica);
    setListas({ ...listas, [nomeLista]: novaLista });
  };

  const toggleMostrarListas = () => {
    setMostrarListas(!mostrarListas);
  };

  return (
    <div className="lista-container">
      <h2>Lista de Músicas</h2>

      <ul className="lista-musicas">
        {musicas.map((musica) => (
          <li key={musica.id} className="musica-item">
            <div className="musica-titulo">
              <strong>{musica.titulo}</strong> - {musica.cantor}
            </div>
            <label>
              <input
                type="checkbox"
                checked={musicasSelecionadas.includes(musica.id)}
                onChange={() => toggleSelecionada(musica.id)}
              />
              Selecionar
            </label>
            <button onClick={() => onProjetar(musica)}>Projetar</button>
          </li>
        ))}
      </ul>

      <button className="btn" onClick={adicionarNaLista}>
        Adicionar à Lista "1dejunho"
      </button>

      <button className="btn" onClick={toggleMostrarListas}>
        {mostrarListas ? 'Ocultar Minhas Listas' : 'Ver Minhas Listas'}
      </button>

      {mostrarListas && (
        <VerMinhasListas
          listas={listas}
          musicas={musicas}
          onProjetar={onProjetar}
          onRemoverDaLista={removerDaLista}
        />
      )}
    </div>
  );
}

export default ListaDeMusica;
