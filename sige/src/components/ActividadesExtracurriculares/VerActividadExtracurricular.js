import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VerActividadExtracurricular.css';
import NavigationMenu from '../PortalInicial/menu';  // Importa el componente NavigationMenu

const VerActividadExtracurricular = () => {
  const { id } = useParams(); // Extraer el 'id' desde la URL
  const [actividad, setActividad] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActividad = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/actividadesExtra/${id}`);
        const data = await response.json();

        if (data.actividadesExtra && data.actividadesExtra.length > 0) {
          setActividad(data.actividadesExtra[0]); // Asumiendo que la respuesta es un arreglo con la actividad
        } else {
          setActividad(null); // Si no se encuentra actividad, mostrar "Actividad no encontrada"
        }
      } catch (error) {
        console.error('Error al cargar la actividad:', error);
        setActividad(null);
      } finally {
        setLoading(false);
      }
    };

    fetchActividad();
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
        <Link to="/eventosAcademicos" className="btn-primary">
          Volver a actividades
        </Link>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Menú fuera de la vista central */}
      <NavigationMenu />

      <div className="actividad-container">
        <div className="actividad-header">
          <div className="breadcrumb">
            <Link to="/eventosAcademicos">Actividades</Link>
            <span> / </span>
            <span>{actividad.nombre_actividad}</span>
          </div>
        </div>

        <div className="actividad-content">
          <div className="actividad-card">
            <h1>{actividad.nombre_actividad}</h1>

            <div className="actividad-meta">
              <div className="meta-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Fecha:</span> <span>{actividad.fecha}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-trophy"></i>
                <span>Premios:</span> <span>{actividad.premios}</span>
              </div>
            </div>

            <div className="actividad-section">
              <h2>Descripción</h2>
              <p>{actividad.descripcion}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerActividadExtracurricular;
