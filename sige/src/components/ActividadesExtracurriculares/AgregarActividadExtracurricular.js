import React, { useState } from 'react';
import './AgregarActividadExtracurricular.css';

const AgregarActividadExtracurricular = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    fecha: '',
    horario: '',
    lugar: '',
    cupos: '',
    responsable: '',
    descripcion: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = {};
    
    if (!formData.nombre) nuevosErrores.nombre = 'Campo requerido';
    if (!formData.categoria) nuevosErrores.categoria = 'Campo requerido';
    if (!formData.fecha) nuevosErrores.fecha = 'Campo requerido';
    if (!formData.descripcion) nuevosErrores.descripcion = 'Campo requerido';
    
    setErrores(nuevosErrores);
    
    if (Object.keys(nuevosErrores).length === 0) {
      console.log('Formulario enviado:', formData);
      // Aquí iría la lógica para enviar los datos
    }
  };

  return (
    <div className="formulario-actividad">
      <div className="encabezado">
        <h1>Crear Nueva Actividad</h1>
        <p>Completa todos los campos para registrar una nueva actividad extracurricular</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="seccion">
          <h2>Nombre de la Actividad *</h2>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Torneo de Fútbol Intercarreras"
            className={errores.nombre ? 'error' : ''}
          />
          {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
        </div>

        <div className="seccion">
          <h2>Categoría *</h2>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className={errores.categoria ? 'error' : ''}
          >
            <option value="">Seleccione categoría</option>
            <option value="Deportes">Deportes</option>
            <option value="Cultural">Cultural</option>
            <option value="Académica">Académica</option>
            <option value="Voluntariado">Voluntariado</option>
          </select>
          {errores.categoria && <span className="mensaje-error">{errores.categoria}</span>}
        </div>

        <div className="seccion-doble">
          <div className="grupo">
            <h2>Fecha *</h2>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className={errores.fecha ? 'error' : ''}
            />
            {errores.fecha && <span className="mensaje-error">{errores.fecha}</span>}
          </div>
          <div className="grupo">
            <h2>Horario</h2>
            <input
              type="time"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="seccion">
          <h2>Lugar</h2>
          <input
            type="text"
            name="lugar"
            value={formData.lugar}
            onChange={handleChange}
            placeholder="Ej: Canchas Universitarias"
          />
        </div>

        <div className="seccion">
          <h2>Cupos Disponibles</h2>
          <input
            type="number"
            name="cupos"
            value={formData.cupos}
            onChange={handleChange}
            min="1"
            placeholder="Ej: 20"
          />
        </div>

        <div className="seccion">
          <h2>Responsable</h2>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            placeholder="Ej: Prof. Juan Pérez"
          />
        </div>

        <div className="seccion">
          <h2>Descripción *</h2>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción detallada de la actividad..."
            rows="4"
            className={errores.descripcion ? 'error' : ''}
          ></textarea>
          {errores.descripcion && <span className="mensaje-error">{errores.descripcion}</span>}
        </div>

        <div className="acciones">
          <button type="submit" className="boton-primario">Guardar Actividad</button>
          <button type="button" className="boton-secundario">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarActividadExtracurricular;