import React, { useEffect, useState } from 'react';
import './Horarios.css';  // Importar los estilos

const Horario = () => {
  const [horarios, setHorarios] = useState([]);
  
  // Obtener la matrícula del localStorage
  const matricula = localStorage.getItem("userMatricula");

  useEffect(() => {
    const cargarHorario = async () => {
      if (!matricula) {
        console.error("No hay matrícula almacenada en localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/horarios/${matricula}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setHorarios(data);

      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    cargarHorario();
  }, [matricula]);

  return (
    <div className="horario-container">
      <h1 className="titulo">Horario</h1>
      {horarios.length > 0 ? (
        <table className="horario-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Aula</th>
              <th>Materia</th>
              <th>Código</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((h, index) => (
              <tr key={index}>
                <td>{h.dia_semana}</td>
                <td>{h.hora_inicio}</td>
                <td>{h.hora_fin}</td>
                <td>{h.aula}</td>
                <td>{h.materia}</td>
                <td>{h.codigo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-horarios">No hay horarios disponibles.</p>
      )}
    </div>
  );
};

export default Horario;
