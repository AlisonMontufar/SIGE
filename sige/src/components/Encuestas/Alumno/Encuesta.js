import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useNavigate
import './Encuesta.css';
import NavigationMenu from '../../PortalInicial/menu';  // Importa el componente NavigationMenu

const VistaPreguntas = () => {
  const { nombre } = useParams(); // Obtener el nombre de la encuesta desde la URL
  const navigate = useNavigate();  // Instancia de useNavigate para redirigir
  const [encuesta, setEncuesta] = useState(null);  // Estado para almacenar la encuesta
  const [respuestas, setRespuestas] = useState([]);  // Estado para las respuestas
  const [enviado, setEnviado] = useState(false);  // Estado para saber si las respuestas fueron enviadas

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        console.log('Consultando preguntas para:', nombre);
        const response = await fetch(`http://localhost:5000/encuesta/${encodeURIComponent(nombre)}/preguntas`);
        const data = await response.json();
        console.log('Datos recibidos de la API:', data);

        // Verifica que la respuesta contiene preguntas
        if (data.preguntas && data.preguntas.length > 0) {
          setEncuesta({
            titulo: nombre, // Nombre de la encuesta obtenido de la URL
            descripcion: 'Ayúdanos a mejorar nuestros servicios', // Descripción fija
            preguntas: data.preguntas,
          });
          setRespuestas(Array(data.preguntas.length).fill('')); // Inicializa las respuestas con valores vacíos
        } else {
          console.log('No se encontraron preguntas para esta encuesta');
        }
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      }
    };

    obtenerPreguntas();
  }, [nombre]);

  const handleChange = (index, event) => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = event.target.value;
    setRespuestas(newRespuestas);
  };

  const handleSubmit = () => {
    if (respuestas.every(respuesta => respuesta.trim() !== '')) {
      setEnviado(true);
      console.log('Respuestas enviadas:', respuestas);
      
      // Simulamos el envío de las respuestas (esto debería ser una llamada a la API)
      setTimeout(() => {
        // Simulación de notificación o mensaje
        alert('¡Gracias por tu participación!');

        // Redirigimos al usuario a la página principal de encuestas o a donde desees
        navigate('/alumno');  // Redirige a la página de encuestas o la página principal
      }, 2000);  // Espera 2 segundos antes de redirigir y mostrar el mensaje de éxito
    } else {
      alert('Por favor, responde todas las preguntas.');
    }
  };

  if (!encuesta || !encuesta.preguntas) {
    return <p>Cargando preguntas...</p>;
  }

  return (
    <div className="encuesta-container">
      <NavigationMenu />
      <h1 className="encuesta-titulo">{encuesta.titulo}</h1>
      <p className="encuesta-descripcion">{encuesta.descripcion}</p>
      <div className="preguntas-lista">
        {encuesta.preguntas && encuesta.preguntas.map((pregunta, index) => (
          <div key={index} className="pregunta-item">
            <p>{pregunta.pregunta}</p>
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
        disabled={enviado}
      >
        {enviado ? 'Respuestas Enviadas' : 'Enviar Respuestas'}
      </button>
      {enviado && <p className="mensaje-enviado">¡Gracias por tus respuestas!</p>}
    </div>
  );
};

export default VistaPreguntas;
