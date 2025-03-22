import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InicioActividadesExtracurriculares.css'; // Asegúrate de tener los estilos

const InicioActividadesExtracurriculares = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    // Lógica para obtener las actividades disponibles (simulado con datos estáticos)
    const actividadesData = [
      { id: 1, nombre: 'Actividad de Voluntariado' },
      { id: 2, nombre: 'Evento Deportivo' },
    ];
    setActividades(actividadesData);
  }, []);

  return (
    <div className="inicio-actividades">
      <h1>Actividades Extracurriculares Disponibles</h1>
      
      {/* Si no hay actividades disponibles */}
      {actividades.length === 0 ? (
        <p>No hay actividades disponibles en este momento.</p>
      ) : (
        <ul>
          {actividades.map((actividad) => (
            <li key={actividad.id} className="actividad-item">
              <Link to={`/admin/actividad/${actividad.id}`}>{actividad.nombre}</Link>
            </li>
          ))}
        </ul>
      )}

      {/* Enlace para agregar nueva actividad */}
      <div className="agregar-actividad">
        <Link to="/admin/agregar-actividad" className="btn-agregar">Agregar Nueva Actividad</Link>
      </div>
    </div>
  );
};

export default InicioActividadesExtracurriculares;
