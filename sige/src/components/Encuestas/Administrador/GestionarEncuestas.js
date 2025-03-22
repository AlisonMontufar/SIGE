import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para navegar a la página de edición
import './GestionarEncuestas.css'; // Importa el archivo de estilo

const GestionarEncuestas = () => {
  const navigate = useNavigate();

  const [encuestas, setEncuestas] = useState([
    { id: 1, titulo: 'Encuesta sobre React', preguntas: ['¿Te gusta React?', '¿Usas React en tus proyectos?'] },
    { id: 2, titulo: 'Encuesta sobre JavaScript', preguntas: ['¿Conoces JavaScript?', '¿Te gusta JavaScript?'] }
  ]);

  const eliminarEncuesta = (id) => {
    const encuestasActualizadas = encuestas.filter(encuesta => encuesta.id !== id);
    setEncuestas(encuestasActualizadas);
  };

  const editarEncuesta = (id) => {
    navigate(`/admin/editar-encuesta/${id}`); // Navega a la página de edición de encuesta
  };

  return (
    <div className="gestionar-encuestas">
      <h1>Gestionar Encuestas</h1>
      <ul>
        {encuestas.map((encuesta) => (
          <li key={encuesta.id} className="encuesta-item">
            <h2>{encuesta.titulo}</h2>
            <p>Preguntas: {encuesta.preguntas.length}</p>
            <button className="btn-editar" onClick={() => editarEncuesta(encuesta.id)}>Editar</button>
            <button className="btn-eliminar" onClick={() => eliminarEncuesta(encuesta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionarEncuestas;
