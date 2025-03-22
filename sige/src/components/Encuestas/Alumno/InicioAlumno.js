import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioAlumno.css'; // Importa el archivo de estilo

const InicioAlumno = () => {
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    // Aquí iría la lógica para obtener las encuestas disponibles (simulado con datos estáticos)
    const encuestasData = [
      { id: 1, titulo: 'Encuesta 1' },
      { id: 2, titulo: 'Encuesta 2' },
    ];
    setEncuestas(encuestasData);
  }, []);

  return (
    <div className="inicio-alumno">
      <h1>Encuestas Disponibles</h1>
      <ul>
        {encuestas.map((encuesta) => (
          <li key={encuesta.id} className="encuesta-item">
            <Link to={`/alumno/encuesta/${encuesta.id}`} className="encuesta-link">{encuesta.titulo}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InicioAlumno;
