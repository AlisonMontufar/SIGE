import React from 'react';
import './Encuesta.css'; // Importa el archivo de estilo

const Encuesta = () => {
  return (
    <div className="encuesta">
      <h1>Encuesta de Opinión</h1>
      <form>
        <div className="pregunta">
          <label>¿Te gusta React?</label>
          <div className="opciones">
            <input type="radio" name="react" value="si" id="si" />
            <label htmlFor="si">Sí</label>
            <input type="radio" name="react" value="no" id="no" />
            <label htmlFor="no">No</label>
          </div>
        </div>

        <div className="pregunta">
          <label>¿Te gustaría aprender más sobre React?</label>
          <textarea name="comentarios" placeholder="Escribe tus comentarios..."></textarea>
        </div>

        <button type="submit" className="enviar-btn">Enviar Respuestas</button>
      </form>
    </div>
  );
};

export default Encuesta;
