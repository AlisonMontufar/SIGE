import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioActividadesExtracurriculares.css';
import NavigationMenu from '../PortalInicial/menu';  // Importa el componente NavigationMenu

const InicioActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener las actividades
    const fetchActividades = async () => {
      try {
        const response = await fetch('http://localhost:5000/actividadesExtra');
        const data = await response.json();
        if (data.actividades) {
          setActividades(data.actividades);
        }
      } catch (error) {
        console.error('Error al cargar las actividades:', error);
      }
    };

    fetchActividades();
  }, []);

  return (
    <div className="actividades-container">
      <NavigationMenu /> {/* Agrega el componente NavigationMenu aquí */}

      <header className="actividades-header">
        <h1>Actividades Extracurriculares</h1>
        <p className="subtitle">Participa en nuestras actividades formativas</p>
      </header>

      <div className="actividades-content">
        {actividades.length === 0 ? (
          <div className="empty-state">
            <p>No hay actividades disponibles actualmente</p>
            <Link to="/admin/agregar-actividad" className="btn-primary">
              Crear primera actividad
            </Link>
          </div>
        ) : (
          <div className="actividades-grid">
            {actividades.map((actividad) => (
              <div key={actividad.nombre} className="actividad-card">
                <div className="card-header">
                  {/* La API no tiene el campo "categoria", por lo que puedes eliminarlo o ajustarlo */}
                  <span className="cupos-info">{actividad.cupos || 'Sin información de cupos'}</span>
                </div>
                <h2>{actividad.nombre_actividad}</h2>
                <p className="descripcion">{actividad.descripcion}</p>
                <div className="card-footer">
                  <span className="fecha">{actividad.fecha}</span>
                  <Link 
                    to={`/admin/actividad/${actividad.nombre_actividad}`} 
                    className="btn-secondary"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InicioActividadesExtracurriculares;
