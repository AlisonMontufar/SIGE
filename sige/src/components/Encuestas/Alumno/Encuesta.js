import React from 'react';
import './Encuesta.css';

const EncuestasDisponibles = () => {
  const encuestas = [
    { id: 1, titulo: 'Encuesta de Satisfacción', descripcion: 'Ayúdanos a mejorar nuestros servicios' },
    { id: 2, titulo: 'Encuesta de Productos', descripcion: 'Opinión sobre nuestros nuevos productos' },
    { id: 3, titulo: 'Encuesta de Experiencia', descripcion: 'Valora tu experiencia con nuestra plataforma' }
  ];

  return (
    <div className="encuestas-disponibles-container">
      <h1 className="encuestas-titulo">Encuestas Disponibles</h1>
      
      <div className="encuestas-lista">
        {encuestas.map((encuesta) => (
          <div key={encuesta.id} className="encuesta-card">
            <div className="encuesta-card-header">
              <h2>{encuesta.titulo}</h2>
              <span className="badge">Nueva</span>
            </div>
            <p>{encuesta.descripcion}</p>
            <button className="btn-comenzar">Comenzar Encuesta</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncuestasDisponibles;