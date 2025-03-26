import React, { useState } from 'react';
import './AgregarEncuesta.css';

const AgregarEncuesta = () => {
  const [titulo, setTitulo] = useState('');
  const [preguntas, setPreguntas] = useState([
    { pregunta: '', tipo: 'abierta', opciones: [''] },
  ]);
  const [errores, setErrores] = useState({});

  // Validación de formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!titulo.trim()) {
      nuevosErrores.titulo = 'El título de la encuesta es obligatorio';
    }

    preguntas.forEach((pregunta, index) => {
      if (!pregunta.pregunta.trim()) {
        nuevosErrores[`pregunta${index}`] = `La pregunta ${index + 1} es obligatoria`;
      }

      if (pregunta.tipo === 'multiple') {
        const opcionesValidas = pregunta.opciones.filter(opcion => opcion.trim() !== '');
        if (opcionesValidas.length < 2) {
          nuevosErrores[`opciones${index}`] = 'Debe tener al menos dos opciones';
        }
      }
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambioTitulo = (e) => {
    setTitulo(e.target.value);
    if (errores.titulo) {
      const { titulo, ...restErrores } = errores;
      setErrores(restErrores);
    }
  };

  const manejarCambioPregunta = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].pregunta = e.target.value;
    setPreguntas(nuevasPreguntas);

    // Eliminar error de pregunta si se ha rellenado
    const errorKey = `pregunta${indice}`;
    if (errores[errorKey]) {
      const { [errorKey]: removed, ...restErrores } = errores;
      setErrores(restErrores);
    }
  };

  const manejarTipoPregunta = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].tipo = e.target.value;
    
    // Restablecer opciones si cambia el tipo
    if (e.target.value === 'abierta') {
      nuevasPreguntas[indice].opciones = [''];
    }
    
    setPreguntas(nuevasPreguntas);
  };

  const manejarCambioOpciones = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    const opcionesSeparadas = e.target.value
      .split(',')
      .map(opcion => opcion.trim())
      .filter(opcion => opcion !== '');
    
    nuevasPreguntas[indice].opciones = opcionesSeparadas;
    setPreguntas(nuevasPreguntas);

    // Eliminar error de opciones si hay suficientes
    const errorKey = `opciones${indice}`;
    if (errores[errorKey]) {
      const { [errorKey]: removed, ...restErrores } = errores;
      setErrores(restErrores);
    }
  };

  const eliminarPregunta = (indice) => {
    const nuevasPreguntas = preguntas.filter((_, i) => i !== indice);
    setPreguntas(nuevasPreguntas);
  };

  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '', tipo: 'abierta', opciones: [''] }]);
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      const nuevaEncuesta = { titulo, preguntas };
      console.log('Encuesta creada:', nuevaEncuesta);
      // Aquí podrías enviar la encuesta al backend
      alert('Encuesta creada exitosamente');
    }
  };

  return (
    <div className="agregar-encuesta">
      <h1>Crear Nueva Encuesta</h1>
      
      <form onSubmit={manejarEnvio}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Título de la Encuesta"
            value={titulo}
            onChange={manejarCambioTitulo}
          />
          {errores.titulo && <p className="error">{errores.titulo}</p>}
        </div>

        {preguntas.map((pregunta, indice) => (
          <div key={indice} className="pregunta-form">
            <div className="form-group">
              <input
                type="text"
                placeholder={`Pregunta ${indice + 1}`}
                value={pregunta.pregunta}
                onChange={(e) => manejarCambioPregunta(indice, e)}
              />
              {errores[`pregunta${indice}`] && (
                <p className="error">{errores[`pregunta${indice}`]}</p>
              )}
            </div>

            <div className="form-group">
              <select 
                onChange={(e) => manejarTipoPregunta(indice, e)} 
                value={pregunta.tipo}
              >
                <option value="abierta">Pregunta Abierta</option>
                <option value="multiple">Opción Múltiple</option>
              </select>
            </div>

            {pregunta.tipo === 'multiple' && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Opciones separadas por coma"
                  value={pregunta.opciones.join(', ')}
                  onChange={(e) => manejarCambioOpciones(indice, e)}
                />
                {errores[`opciones${indice}`] && (
                  <p className="error">{errores[`opciones${indice}`]}</p>
                )}
              </div>
            )}

            {preguntas.length > 1 && (
              <button 
                type="button"
                onClick={() => eliminarPregunta(indice)}
                className="eliminar-pregunta"
              >
                Eliminar Pregunta
              </button>
            )}
          </div>
        ))}

        <button 
          type="button" 
          className="agregar-pregunta" 
          onClick={agregarPregunta}
        >
          Agregar Pregunta
        </button>
        
        <button 
          type="submit" 
          className="crear-encuesta"
        >
          Crear Encuesta
        </button>
      </form>
    </div>
  );
};

export default AgregarEncuesta;