import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioActividadesExtracurriculares.css';

const InicioActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch('http://localhost:3000/actividades'); // Cambia el puerto si es necesario
        const data = await response.json();
        if (data.actividades) {
          setActividades(data.actividades);
        }
      } catch (error) {
        console.error('Error al cargar actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);

  return (
    <div className="actividades-container">
      <header className="actividades-header">
        <h1>Actividades Extracurriculares</h1>
        <p className="subtitle">Participa en nuestras actividades formativas</p>
      </header>

      <div className="actividades-content">
        {loading ? (
          <p>Cargando actividades...</p>
        ) : actividades.length === 0 ? (
          <div className="empty-state">
            <p>No hay actividades disponibles actualmente</p>
            <Link to="/admin/agregar-actividad" className="btn-primary">
              Crear primera actividad
            </Link>
          </div>
        ) : (
          <div className="actividades-grid">
            {actividades.map((actividad) => (
              <div key={actividad.id_actividad} className="actividad-card">
                <div className="card-header">
                  <span className="categoria-badge">{actividad.categoria || 'General'}</span>
                  <span className="cupos-info">{actividad.cupos || 'N/D'} cupos</span>
                </div>
                <h2>{actividad.nombre}</h2>
                <p className="descripcion">{actividad.descripcion}</p>
                <div className="card-footer">
                  <span className="fecha">{new Date(actividad.fecha).toLocaleDateString()}</span>
                  <Link 
                    to={`/admin/actividad/${actividad.id_actividad}`} 
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
