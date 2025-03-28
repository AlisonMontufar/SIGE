import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioActividadesExtracurriculares.css';

const InicioActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Datos de ejemplo (simulando API)
    const actividadesData = [
      { 
        id: 1, 
        nombre: 'Voluntariado Comunitario', 
        descripcion: 'Participa en actividades de servicio a la comunidad',
        categoria: 'Social',
        fecha: '15 Nov 2023',
        cupos: 20
      },
      { 
        id: 2, 
        nombre: 'Torneo de Fútbol Intercarreras', 
        descripcion: 'Competencia deportiva entre facultades',
        categoria: 'Deportes',
        fecha: '20 Nov 2023',
        cupos: 10
      },
    ];
    setActividades(actividadesData);
  }, []);

  return (
    <div className="actividades-container">
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
              <div key={actividad.id} className="actividad-card">
                <div className="card-header">
                  <span className="categoria-badge">{actividad.categoria}</span>
                  <span className="cupos-info">{actividad.cupos} cupos</span>
                </div>
                <h2>{actividad.nombre}</h2>
                <p className="descripcion">{actividad.descripcion}</p>
                <div className="card-footer">
                  <span className="fecha">{actividad.fecha}</span>
                  <Link 
                    to={`/admin/actividad/${actividad.id}`} 
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