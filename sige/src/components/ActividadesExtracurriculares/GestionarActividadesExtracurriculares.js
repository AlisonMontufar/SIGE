import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GestionarActividadesExtracurriculares.css';

const GestionarActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([
    { 
      id: 1, 
      nombre: 'Voluntariado Comunitario', 
      descripcion: 'Participación en programas de ayuda a la comunidad local',
      categoria: 'Social',
      fecha: '15 Nov 2023',
      estado: 'Activa'
    },
    { 
      id: 2, 
      nombre: 'Torneo de Fútbol', 
      descripcion: 'Competencia deportiva entre facultades',
      categoria: 'Deportes',
      fecha: '20 Nov 2023',
      estado: 'Activa'
    },
  ]);

  const [actividadAEliminar, setActividadAEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const solicitarEliminacion = (id) => {
    setActividadAEliminar(id);
    setMostrarModal(true);
  };

  const confirmarEliminacion = () => {
    setActividades(actividades.filter(a => a.id !== actividadAEliminar));
    setMostrarModal(false);
  };

  const cancelarEliminacion = () => {
    setActividadAEliminar(null);
    setMostrarModal(false);
  };

  return (
    <div className="gestion-container">
      <div className="gestion-header">
        <h1>Gestión de Actividades Extracurriculares</h1>
        <Link to="/admin/agregar-actividad" className="btn-agregar">
          <i className="fas fa-plus"></i> Nueva Actividad
        </Link>
      </div>

      <div className="actividades-list">
        {actividades.length === 0 ? (
          <div className="empty-state">
            <p>No hay actividades registradas</p>
            <Link to="/admin/agregar-actividad" className="btn-primary">
              Crear primera actividad
            </Link>
          </div>
        ) : (
          actividades.map(actividad => (
            <div key={actividad.id} className="actividad-card">
              <div className="card-header">
                <div className="card-badge">{actividad.categoria}</div>
                <span className={`estado-badge ${actividad.estado.toLowerCase()}`}>
                  {actividad.estado}
                </span>
              </div>
              
              <h2>{actividad.nombre}</h2>
              <p className="descripcion">{actividad.descripcion}</p>
              
              <div className="card-meta">
                <span><i className="fas fa-calendar-alt"></i> {actividad.fecha}</span>
              </div>
              
              <div className="card-actions">
                <Link 
                  to={`/admin/editar-actividad/${actividad.id}`} 
                  className="btn-editar"
                >
                  <i className="fas fa-edit"></i> Editar
                </Link>
                <button 
                  onClick={() => solicitarEliminacion(actividad.id)} 
                  className="btn-eliminar"
                >
                  <i className="fas fa-trash-alt"></i> Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="actions-section">
          <Link to="/admin/agregar-actividad" className="btn-primary">
            <i className="fas fa-plus"></i> Agregar Nueva Actividad
          </Link>
        </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-content">
              <h3>Confirmar Eliminación</h3>
              <p>¿Estás seguro que deseas eliminar esta actividad? Esta acción no se puede deshacer.</p>
              
              <div className="modal-actions">
                <button onClick={cancelarEliminacion} className="btn-cancelar">
                  Cancelar
                </button>
                <button onClick={confirmarEliminacion} className="btn-confirmar">
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    </div>
    
  );
};

export default GestionarActividadesExtracurriculares;