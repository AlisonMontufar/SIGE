import React, { useState } from 'react';
import './Encuesta.css';
import NavigationMenu from '../../PortalInicial/menu';  // Importar el menú de navegación

// Datos de ejemplo (esto debería venir de una API o base de datos)
const encuesta = { 
  titulo: 'Encuesta de Satisfacción', 
  descripcion: 'Ayúdanos a mejorar nuestros servicios',
  preguntas: [
    '¿Qué tan satisfecho estás con nuestro servicio?',
    '¿Recomendarías nuestros servicios a otras personas?',
    '¿Qué mejorarías de nuestro servicio?'
  ]
};

const VistaPreguntas = () => {
  const [respuestas, setRespuestas] = useState(Array(encuesta.preguntas.length).fill(''));
  const [enviado, setEnviado] = useState(false);

  const handleChange = (index, event) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = event.target.value;
    setRespuestas(newRespuestas);
  };

  const handleSubmit = () => {
    // Comprobamos si todas las respuestas están llenas
    if (respuestas.every(respuesta => respuesta.trim() !== '')) {
      // Simulamos el envío
      setEnviado(true);
      // Aquí normalmente enviarías los datos a un servidor
      console.log('Respuestas enviadas:', respuestas);
    } else {
      alert('Por favor, responde todas las preguntas.');
    }
  };

  return (
    <div className="encuesta-container">
      <NavigationMenu /> {/* Coloca el componente NavigationMenu aquí */}

      <h1 className="encuesta-titulo">{encuesta.titulo}</h1>
      <p className="encuesta-descripcion">{encuesta.descripcion}</p>
      
      <div className="preguntas-lista">
        {encuesta.preguntas.map((pregunta, index) => (
          <div key={index} className="pregunta-item">
            <p>{pregunta}</p>
            <input 
              type="text" 
              value={respuestas[index]} 
              onChange={(event) => handleChange(index, event)} 
              placeholder="Escribe tu respuesta..." 
            />
          </div>
        ))}
      </div>
      
      <button 
        className="btn-enviar-respuestas" 
        onClick={handleSubmit}
        disabled={enviado}  // Deshabilitar botón después de enviar
      >
        {enviado ? 'Respuestas Enviadas' : 'Enviar Respuestas'}
      </button>

      {enviado && <p className="mensaje-enviado">¡Gracias por tus respuestas!</p>}
    </div>
  );
};

export default VistaPreguntas;
