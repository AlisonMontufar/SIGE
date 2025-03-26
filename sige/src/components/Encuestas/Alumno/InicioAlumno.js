import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioAlumno.css';

const InicioAlumno = () => {
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    const encuestasData = [
      { 
        id: 1, 
        titulo: 'Satisfacción con la plataforma', 
        descripcion: 'Cuéntanos tu experiencia usando nuestro sistema',
        preguntas: 5,
        fecha: 'Disponible hasta 15 Nov 2023',
        estado: 'Nueva'
      },
      { 
        id: 2, 
        titulo: 'Evaluación docente', 
        descripcion: 'Feedback sobre el desempeño de los profesores',
        preguntas: 8,
        fecha: 'Disponible hasta 20 Nov 2023',
        estado: 'Disponible'
      },
    ];
    setEncuestas(encuestasData);
  }, []);

  return (
    <div className="alumno-container">
      <header className="encuestas-header">
        <h1>Encuestas Disponibles</h1>
        <p>Tu opinión nos ayuda a mejorar</p>
      </header>

      <div className="encuestas-list">
        {encuestas.map((encuesta) => (
          <article key={encuesta.id} className="encuesta-card">
            <div className="card-main">
              <div className={`card-status ${encuesta.estado.toLowerCase()}`}>
                {encuesta.estado}
              </div>
              <h2>{encuesta.titulo}</h2>
              <p className="card-description">{encuesta.descripcion}</p>
              <div className="card-meta">
                <span>{encuesta.preguntas} preguntas</span>
                <span>•</span>
                <span>{encuesta.fecha}</span>
              </div>
            </div>
            <Link 
              to={`/alumno/encuesta/${encuesta.id}`} 
              className="action-button"
            >
              Comenzar
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default InicioAlumno;