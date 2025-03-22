import React, { useState } from 'react';
import './GestionarActividadesExtracurriculares.css';

const GestionarActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([
    { id: 1, nombre: 'Actividad de Voluntariado', descripcion: 'Descripción de la actividad' },
    { id: 2, nombre: 'Evento Deportivo', descripcion: 'Descripción del evento' },
  ]);

  const [confirmacionEliminacion, setConfirmacionEliminacion] = useState(null);

  const eliminarActividad = (id) => {
    setConfirmacionEliminacion(id);  // Guardamos la actividad que se quiere eliminar
  };

  const confirmarEliminacion = (id) => {
    const actividadesActualizadas = actividades.filter((actividad) => actividad.id !== id);
    setActividades(actividadesActualizadas);
    setConfirmacionEliminacion(null);  // Limpiamos la confirmación
  };

  const cancelarEliminacion = () => {
    setConfirmacionEliminacion(null);  // Cancelamos la eliminación
  };

  return (
    <div className="gestionar-actividades">
      <h1>Gestionar Actividades Extracurriculares</h1>
      
      {/* Mensaje de confirmación de eliminación */}
      {confirmacionEliminacion && (
        <div className="confirmacion-eliminacion">
          <p>¿Estás seguro de que deseas eliminar esta actividad?</p>
          <button onClick={() => confirmarEliminacion(confirmacionEliminacion)}>Sí, Eliminar</button>
          <button onClick={cancelarEliminacion}>Cancelar</button>
        </div>
      )}
      
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id} className="actividad-item">
            <h2>{actividad.nombre}</h2>
            <p>{actividad.descripcion}</p>
            <button className="editar-btn">Editar</button>
            <button className="eliminar-btn" onClick={() => eliminarActividad(actividad.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GestionarActividadesExtracurriculares;
