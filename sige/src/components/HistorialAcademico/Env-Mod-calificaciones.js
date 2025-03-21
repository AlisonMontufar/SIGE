import React, { useState } from 'react';
import './Env-Mod-calificaciones.css'; 

const EnvModCalificaciones = () => {
  const [programaEducativo, setProgramaEducativo] = useState('');
  const [grupo, setGrupo] = useState('');
  const [asignatura, setAsignatura] = useState('');

  const handleEditarCalificaciones = () => {
    alert('Editar calificaciones');
  };

  // Datos de ejemplo para la tabla
  const estudiantes = [
    { matricula: '001', nombre: 'Juan Pérez', unid1: 8, ar: 7, as: 90, calificacionFinal: 8.5 },
    { matricula: '002', nombre: 'Ana Gómez', unid1: 9, ar: 8, as: 85, calificacionFinal: 8.7 },
    { matricula: '003', nombre: 'Luis Martínez', unid1: 7, ar: 6, as: 80, calificacionFinal: 7.8 },
  ];

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="programaEducativo">Programa Educativo:</label>
          <select
            id="programaEducativo"
            value={programaEducativo}
            onChange={(e) => setProgramaEducativo(e.target.value)}
          >
            <option value="">Seleccione un programa</option>
            <option value="Programa1">Programa 1</option>
            <option value="Programa2">Programa 2</option>
            <option value="Programa3">Programa 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grupo">Grupo:</label>
          <select
            id="grupo"
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
          >
            <option value="">Seleccione un grupo</option>
            <option value="Grupo1">Grupo 1</option>
            <option value="Grupo2">Grupo 2</option>
            <option value="Grupo3">Grupo 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="asignatura">Asignatura:</label>
          <select
            id="asignatura"
            value={asignatura}
            onChange={(e) => setAsignatura(e.target.value)}
          >
            <option value="">Seleccione una asignatura</option>
            <option value="Asignatura1">Asignatura 1</option>
            <option value="Asignatura2">Asignatura 2</option>
            <option value="Asignatura3">Asignatura 3</option>
          </select>
        </div>

        <button className="edit-button" onClick={handleEditarCalificaciones}>
          Editar Calificaciones
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nombre</th>
              <th>Unid1</th>
              <th>AR</th>
              <th>%AS</th>
              <th>Calificación Final</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante) => (
              <tr key={estudiante.matricula}>
                <td>{estudiante.matricula}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.unid1}</td>
                <td>{estudiante.ar}</td>
                <td>{estudiante.as}%</td>
                <td>{estudiante.calificacionFinal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnvModCalificaciones;