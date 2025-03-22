import React, { useState } from 'react';
import './AgregarActividadExtracurricular.css';

const AgregarActividadExtracurricular = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensaje, setMensaje] = useState('');  // Para mostrar mensaje de éxito/error

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value);
  };

  const manejarCambioDescripcion = (e) => {
    setDescripcion(e.target.value);
  };

  const manejarEnvio = () => {
    if (!nombre || !descripcion) {
      setMensaje('Por favor completa todos los campos.');
      return;
    }
    
    const nuevaActividad = { nombre, descripcion };
    console.log('Actividad creada:', nuevaActividad);
    setMensaje('Actividad creada con éxito.');

    // Aquí podrías enviar la actividad al backend
    setNombre('');
    setDescripcion('');
  };

  return (
    <div className="agregar-actividad-extracurricular">
      <h1>Agregar Nueva Actividad Extracurricular</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}  {/* Mostrar mensaje de estado */}

      <input
        type="text"
        placeholder="Nombre de la Actividad"
        value={nombre}
        onChange={manejarCambioNombre}
      />

      <textarea
        placeholder="Descripción de la Actividad"
        value={descripcion}
        onChange={manejarCambioDescripcion}
      ></textarea>

      <button onClick={manejarEnvio}>Crear Actividad</button>
    </div>
  );
};

export default AgregarActividadExtracurricular;
