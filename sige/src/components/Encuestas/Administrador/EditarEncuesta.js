import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarEncuesta.css'; // Si usas un archivo de CSS adicional para estilos

const EditarEncuesta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Simulamos la encuesta obtenida desde un backend
  const [encuesta, setEncuesta] = useState({
    id: 1,
    titulo: 'Encuesta sobre React',
    preguntas: [
      { pregunta: '¿Te gusta React?', tipo: 'abierta' },
      { pregunta: '¿Usas React en tus proyectos?', tipo: 'multiple', opciones: ['Sí', 'No'] },
    ]
  });

  const [nuevoTitulo, setNuevoTitulo] = useState(encuesta.titulo);
  const [nuevasPreguntas, setNuevasPreguntas] = useState(encuesta.preguntas);

  useEffect(() => {
    // Aquí simulamos la obtención de la encuesta del backend
    if (id) {
      setEncuesta({ id, titulo: `Encuesta ${id}`, preguntas: [] });
      setNuevoTitulo(`Encuesta ${id}`);
      // Puedes agregar más lógica para llenar las preguntas.
    }
  }, [id]);

  const manejarCambioTitulo = (e) => {
    setNuevoTitulo(e.target.value);
  };

  const manejarCambioPregunta = (indice, e) => {
    const nuevasPreguntasActualizadas = [...nuevasPreguntas];
    nuevasPreguntasActualizadas[indice].pregunta = e.target.value;
    setNuevasPreguntas(nuevasPreguntasActualizadas);
  };

  const manejarTipoPregunta = (indice, e) => {
    const nuevasPreguntasActualizadas = [...nuevasPreguntas];
    nuevasPreguntasActualizadas[indice].tipo = e.target.value;
    setNuevasPreguntas(nuevasPreguntasActualizadas);
  };

  const manejarCambioOpciones = (indice, e) => {
    const nuevasPreguntasActualizadas = [...nuevasPreguntas];
    nuevasPreguntasActualizadas[indice].opciones = e.target.value.split(',');
    setNuevasPreguntas(nuevasPreguntasActualizadas);
  };

  const manejarEnvio = () => {
    if (!nuevoTitulo.trim()) {
      alert("El título de la encuesta es obligatorio");
      return;
    }

    // Aquí enviaríamos los datos actualizados al backend
    console.log('Encuesta actualizada:', { id, nuevoTitulo, nuevasPreguntas });
    navigate('/admin/gestionar-encuestas'); // Regresar a la lista de encuestas
  };

  return (
    <div className="editar-encuesta">
      <h1>Editar Encuesta: {nuevoTitulo}</h1>
      
      {/* Título de la encuesta */}
      <div className="form-group">
        <input
          type="text"
          value={nuevoTitulo}
          onChange={manejarCambioTitulo}
          placeholder="Título de la encuesta"
        />
      </div>
      
      {/* Preguntas */}
      {nuevasPreguntas.map((pregunta, indice) => (
        <div key={indice} className="pregunta-form">
          <div className="form-group">
            <input
              type="text"
              value={pregunta.pregunta}
              onChange={(e) => manejarCambioPregunta(indice, e)}
              placeholder={`Pregunta ${indice + 1}`}
            />
          </div>

          {/* Tipo de pregunta */}
          <div className="form-group">
            <select onChange={(e) => manejarTipoPregunta(indice, e)} value={pregunta.tipo}>
              <option value="abierta">Abierta</option>
              <option value="multiple">Múltiple</option>
            </select>
          </div>

          {/* Si la pregunta es de tipo múltiple, agregar opciones */}
          {pregunta.tipo === 'multiple' && (
            <div className="form-group">
              <input
                type="text"
                value={pregunta.opciones.join(',')}
                onChange={(e) => manejarCambioOpciones(indice, e)}
                placeholder="Opciones separadas por coma"
              />
            </div>
          )}
        </div>
      ))}

      <button className="actualizar-encuesta" onClick={manejarEnvio}>Actualizar Encuesta</button>
    </div>
  );
};

export default EditarEncuesta;
