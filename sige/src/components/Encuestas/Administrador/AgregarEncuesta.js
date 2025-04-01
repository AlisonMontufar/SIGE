import React, { useState, useRef, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll'; // Librería react-scroll
import './AgregarEncuesta.css';

const AgregarEncuesta = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [mensajePorque, setMensajePorque] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [preguntas, setPreguntas] = useState([]);
  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [loading, setLoading] = useState(false); // Para controlar la carga de preguntas
  const formRef = useRef(null);

  // Validación del formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título de la encuesta es obligatorio';
    }
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria';
    }
    if (!mensajePorque.trim()) {
      nuevosErrores.mensajePorque = 'El mensaje de "por qué" es obligatorio';
    }
    if (!fechaInicio) {
      nuevosErrores.fechaInicio = 'La fecha de inicio es obligatoria';
    }
    if (!fechaFin) {
      nuevosErrores.fechaFin = 'La fecha de fin es obligatoria';
    } else if (new Date(fechaInicio) > new Date(fechaFin)) {
      nuevosErrores.fechaFin = 'La fecha de fin no puede ser anterior a la fecha de inicio';
    }

    preguntas.forEach((pregunta, index) => {
      if (!pregunta.pregunta.trim()) {
        nuevosErrores[`pregunta${index}`] = `La pregunta ${index + 1} es obligatoria`;
      }
      if (pregunta.tipo === 'multiple' && pregunta.opciones.length < 2) {
        nuevosErrores[`opciones${index}`] = 'Debe tener al menos dos opciones';
      }
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Función para manejar el envío del formulario
  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    setMensajeError('');

    if (validarFormulario()) {
      const nuevaEncuesta = {
        nombre: titulo,
        descripcion: descripcion,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin,
        mensaje_porque: mensajePorque,
        activo: 1,
        cantidad_preguntas: preguntas.length,
        preguntas: preguntas.map(p => ({
          pregunta: p.pregunta,
          tipo_pregunta: p.tipo,
          opciones: p.tipo === 'multiple' ? p.opciones : [],
        })),
      };

      try {
        const respuesta = await fetch('http://localhost:5000/crearEncuesta', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevaEncuesta),
        });

        const data = await respuesta.json();
        if (respuesta.ok) {
          setMensajeExito('Encuesta creada exitosamente');
          console.log('Encuesta guardada:', data);
        } else {
          setMensajeError(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error al enviar la encuesta:', error);
        setMensajeError('Hubo un problema al enviar la encuesta');
      }
    }
  };

  return (
    <div className="agregar-encuesta">
      <h1>Crear Nueva Encuesta</h1>
      {mensajeExito && <p className="exito">{mensajeExito}</p>}
      {mensajeError && <p className="error">{mensajeError}</p>}

      <div ref={formRef} className="formulario-scroll">
        <form onSubmit={manejarEnvio}>
          <div className="form-group">
            <label htmlFor="titulo">Título de la Encuesta</label>
            <input
              id="titulo"
              type="text"
              placeholder="Escribe el título de la encuesta"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            {errores.titulo && <p className="error">{errores.titulo}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción de la Encuesta</label>
            <textarea
              id="descripcion"
              placeholder="Escribe una breve descripción de la encuesta"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {errores.descripcion && <p className="error">{errores.descripcion}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="mensajePorque">¿Por qué deberías participar?</label>
            <textarea
              id="mensajePorque"
              placeholder="Explica por qué los usuarios deberían participar en esta encuesta"
              value={mensajePorque}
              onChange={(e) => setMensajePorque(e.target.value)}
            />
            {errores.mensajePorque && <p className="error">{errores.mensajePorque}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha de Inicio</label>
            <input
              id="fechaInicio"
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            {errores.fechaInicio && <p className="error">{errores.fechaInicio}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fechaFin">Fecha de Fin</label>
            <input
              id="fechaFin"
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
            {errores.fechaFin && <p className="error">{errores.fechaFin}</p>}
          </div>

          <div className="preguntas-lista">
            {/* Preguntas dinámicas (sin cambios) */}
          </div>

          <div className="botones">
            <button type="submit">Crear Encuesta</button>
          </div>
        </form>
      </div>

      <Link to="formulario-scroll" smooth={true} duration={500}>
        Ir al formulario
      </Link>
    </div>
  );
};

export default AgregarEncuesta;
