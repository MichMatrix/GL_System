import React from 'react';
import '../listaDeMusica/listaDeMusica.css';

function VerMinhasListas({ listas, musicas, onProjetar, onRemoverDaLista }) {
  return (
    <div className="minhas-listas">
      <h3>Minhas Listas</h3>
      {Object.keys(listas).length === 0 ? (
        <p>Nenhuma lista criada ainda.</p>
      ) : (
        Object.entries(listas).map(([nome, ids]) => (
          <div key={nome} className="lista-grupo">
            <h4>{nome}</h4>
            <ul>
              {ids.map((id) => {
                const musica = musicas.find((m) => m.id === id);
                return (
                  <li key={id} className="musica-item">
                    <span>
                      {musica ? `${musica.titulo} - ${musica.cantor}` : `Música ID: ${id}`}
                    </span>
                    {musica && (
                      <>
                        <button onClick={() => onProjetar(musica)}>Projetar</button>
                        <button onClick={() => onRemoverDaLista(nome, id)} className="btn-remover">
                          Remover
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default VerMinhasListas;
