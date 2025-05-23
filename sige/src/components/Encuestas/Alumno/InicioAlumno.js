import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioAlumno.css';
import NavigationMenu from '../../PortalInicial/menu';  // Importa el componente NavigationMenu

const InicioAlumno = () => {
  const [encuestas, setEncuestas] = useState([]);

  useEffect(() => {
    const obtenerEncuestas = async () => {
      try {
        const response = await fetch('http://localhost:5000/encuestas'); // Ajusta el puerto si es necesario
        const data = await response.json();

        // Adaptar estructura para la vista
        const encuestasAdaptadas = data.encuestas.map((item, index) => ({
          id: index + 1, // O usa un ID real si lo tienes
          titulo: item.nombre,
          descripcion: item.descripcion,
          preguntas: item.cantidad_preguntas,
          fecha: `Disponible hasta ${new Date(item.fecha_fin).toLocaleDateString('es-MX', {
            day: '2-digit', month: 'short', year: 'numeric'
          })}`,
          estado: 'Disponible', // Aquí puedes agregar lógica según la fecha
        }));

        setEncuestas(encuestasAdaptadas);
      } catch (error) {
        console.error('Error al obtener encuestas:', error);
      }
    };

    obtenerEncuestas();
  }, []);

  return (
    <div>
      <div><NavigationMenu /> {/* Agrega el componente NavigationMenu aquí */}</div>

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
            {/* Usamos el nombre de la encuesta en la URL con encodeURIComponent */}
            <Link 
              to={`/alumno/encuesta/${encodeURIComponent(encuesta.titulo)}`}  
              className="action-button"
            >
              Comenzar
            </Link>
          </article>
        ))}
      </div>
    </div>
    </div>
  );
};

export default InicioAlumno;
