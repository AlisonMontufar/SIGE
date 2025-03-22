import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './VerActividadExtracurricular.css'; // Agregar archivo de estilo si es necesario

const VerActividadExtracurricular = () => {
  const { id } = useParams(); // Obtener el ID de la actividad desde la URL
  const [actividad, setActividad] = useState(null);

  useEffect(() => {
    // Simular la obtención de la actividad desde un backend
    const actividadesData = [
      { id: 1, nombre: 'Actividad de Voluntariado', descripcion: 'Descripción completa de la actividad de voluntariado.' },
      { id: 2, nombre: 'Evento Deportivo', descripcion: 'Descripción completa del evento deportivo.' },
    ];

    // Buscar la actividad por ID
    const actividadEncontrada = actividadesData.find((actividad) => actividad.id === parseInt(id));
    setActividad(actividadEncontrada);
  }, [id]);

  if (!actividad) {
    return <p>Cargando actividad...</p>;
  }

  return (
    <div className="actividad-detalle">
      <h1>{actividad.nombre}</h1>
      <p>{actividad.descripcion}</p>
    </div>
  );
};

export default VerActividadExtracurricular;
