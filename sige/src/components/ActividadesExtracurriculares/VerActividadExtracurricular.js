import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VerActividadExtracurricular.css';

const VerActividadExtracurricular = () => {
  const { id } = useParams();
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulación de carga desde API
    const fetchData = async () => {
      setLoading(true);
      
      // Datos de ejemplo (reemplazar con llamada API real)
      const actividadesData = [
        { 
          id: 1, 
          nombre: 'Voluntariado Comunitario', 
          descripcion: 'Participa en actividades de servicio a la comunidad local ayudando en centros comunitarios y programas sociales.',
          categoria: 'Social',
          fecha: '15 Nov 2023',
          horario: '10:00 - 14:00 hrs',
          lugar: 'Centro Comunitario Principal',
          cupos: 20,
          responsable: 'Dra. María González',
          requisitos: 'Disposición para trabajar en equipo y compromiso social'
        },
        { 
          id: 2, 
          nombre: 'Torneo de Fútbol Intercarreras', 
          descripcion: 'Competencia deportiva entre facultades que promueve el trabajo en equipo y la sana competencia.',
          categoria: 'Deportes',
          fecha: '20 Nov 2023',
          horario: '16:00 - 19:00 hrs',
          lugar: 'Canchas Universitarias',
          cupos: 10,
          responsable: 'Prof. Juan Pérez',
          requisitos: 'Certificado médico vigente'
        },
      ];

      setTimeout(() => {
        const actividadEncontrada = actividadesData.find(a => a.id === parseInt(id));
        setActividad(actividadEncontrada);
        setLoading(false);
      }, 800);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando información de la actividad...</p>
      </div>
    );
  }

  if (!actividad) {
    return (
      <div className="not-found-container">
        <h1>Actividad no encontrada</h1>
        <p>La actividad solicitada no existe o no está disponible.</p>
        <Link to="/admin/actividades" className="btn-primary">
          Volver a actividades
        </Link>
      </div>
    );
  }

  return (
    <div className="actividad-container">
      <div className="actividad-header">
        <div className="breadcrumb">
          <Link to="/admin/actividades">Actividades</Link>
          <span> / </span>
          <span>{actividad.nombre}</span>
        </div>
        
        <div className="header-actions">
          <Link to={`/admin/editar-actividad/${actividad.id}`} className="btn-edit">
            Editar Actividad
          </Link>
        </div>
      </div>

      <div className="actividad-content">
        <div className="actividad-card">
          <div className="card-badge">{actividad.categoria}</div>
          
          <h1>{actividad.nombre}</h1>
          
          <div className="actividad-meta">
            <div className="meta-item">
              <i className="fas fa-calendar-alt"></i>
              <span>{actividad.fecha}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-clock"></i>
              <span>{actividad.horario}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>{actividad.lugar}</span>
            </div>
            <div className="meta-item">
              <i className="fas fa-users"></i>
              <span>{actividad.cupos} cupos disponibles</span>
            </div>
          </div>
          
          <div className="actividad-section">
            <h2>Descripción</h2>
            <p>{actividad.descripcion}</p>
          </div>
          
          <div className="actividad-details">
            <div className="detail-item">
              <h3>Responsable</h3>
              <p>{actividad.responsable}</p>
            </div>
            <div className="detail-item">
              <h3>Requisitos</h3>
              <p>{actividad.requisitos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerActividadExtracurricular;