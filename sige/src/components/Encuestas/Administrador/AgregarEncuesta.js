import React, { useState } from 'react';
import './AgregarEncuesta.css'; // Importamos el archivo de estilos CSS

const AgregarEncuesta = () => {
  const [titulo, setTitulo] = useState('');
  const [preguntas, setPreguntas] = useState([
    { pregunta: '', tipo: 'abierta', opciones: [''] },
  ]);

  // Maneja el cambio del título de la encuesta
  const manejarCambioTitulo = (e) => {
    setTitulo(e.target.value);
  };

  // Maneja el cambio de texto de cada pregunta
  const manejarCambioPregunta = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].pregunta = e.target.value;
    setPreguntas(nuevasPreguntas);
  };

  // Maneja el cambio del tipo de pregunta (abierta o de opción múltiple)
  const manejarTipoPregunta = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].tipo = e.target.value;
    setPreguntas(nuevasPreguntas);
  };

  // Maneja el cambio de las opciones de la pregunta (solo si es de tipo múltiple)
  const manejarCambioOpciones = (indice, e) => {
    const nuevasPreguntas = [...preguntas];
    nuevasPreguntas[indice].opciones = e.target.value.split(','); // Opciones separadas por coma
    setPreguntas(nuevasPreguntas);
  };

  // Agrega una nueva pregunta
  const agregarPregunta = () => {
    setPreguntas([...preguntas, { pregunta: '', tipo: 'abierta', opciones: [''] }]);
  };

  // Enviar la encuesta (simulación)
  const manejarEnvio = () => {
    if (!titulo.trim()) {
      alert("El título es obligatorio");
      return;
    }

    const nuevaEncuesta = { titulo, preguntas };
    console.log('Encuesta creada:', nuevaEncuesta);
    // Aquí podrías enviar la encuesta al backend
  };

  return (
    <div className="agregar-encuesta">
      <h1>Agregar Nueva Encuesta</h1>
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Título de la Encuesta"
          value={titulo}
          onChange={manejarCambioTitulo}
        />
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
          </div>

          {/* Selector de tipo de pregunta */}
          <div className="form-group">
            <select onChange={(e) => manejarTipoPregunta(indice, e)} value={pregunta.tipo}>
              <option value="abierta">Pregunta Abierta</option>
              <option value="multiple">Opción Múltiple</option>
            </select>
          </div>

          {/* Si la pregunta es de tipo múltiple, agregamos opciones */}
          {pregunta.tipo === 'multiple' && (
            <div className="form-group">
              <input
                type="text"
                placeholder="Opciones separadas por coma"
                value={pregunta.opciones.join(',')}
                onChange={(e) => manejarCambioOpciones(indice, e)}
              />
            </div>
          )}
        </div>
      ))}

      <button className="agregar-pregunta" onClick={agregarPregunta}>Agregar Pregunta</button>
      <br />
      <button className="crear-encuesta" onClick={manejarEnvio}>Crear Encuesta</button>
    </div>
  );
};

export default AgregarEncuesta;
