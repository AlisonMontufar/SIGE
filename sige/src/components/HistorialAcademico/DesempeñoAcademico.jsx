import React, { useEffect, useState } from 'react';
import './Env-Mod-calificaciones.css';
import NavigationMenu from '../PortalInicial/menu';

function DesempenoAcademico() {
  const [materias, setMaterias] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [grupo, setGrupo] = useState('');

  // Obtén la matrícula del localStorage
  const matricula = localStorage.getItem("userMatricula");

  useEffect(() => {

    console.log(matricula);
    const fetchCalificaciones = async () => {
      try {
        if (!matricula) {
          console.error('Matricula no encontrada en localStorage');
          return;
        }

        const response = await fetch(`http://localhost:5000/calificaciones/${matricula}`);
        const data = await response.json();

        if (data.length > 0) {
        setGrupo(data[0].nombre_grupo); // Guardar el grupo de la primera entrada
      }
        
        const materiasUnicas = Array.from(new Set(data.map(item => item.materia_nombre)));
        setMaterias(materiasUnicas);
        setCalificaciones(data);
        setMateriaSeleccionada(materiasUnicas[0] || '');
      } catch (error) {
        console.error('Error al obtener calificaciones:', error);
      }
    };

    fetchCalificaciones();
  }, []);

  const handleMateriaChange = (event) => {
    setMateriaSeleccionada(event.target.value);
  };

  const calificacionesFiltradas = calificaciones.filter(cal => cal.materia_nombre === materiaSeleccionada);

  // Agrupamos las calificaciones por unidad
  const calificacionesPorUnidad = calificacionesFiltradas.reduce((acc, calificacion) => {
    const unidad = calificacion.unidad || 'Sin unidad'; // Por si alguna calificación no tiene unidad definida
    if (!acc[unidad]) {
      acc[unidad] = [];
    }
    acc[unidad].push(calificacion);
    return acc;
  }, {});

  return (
    <div className="grade-management-container">
      <NavigationMenu/>
      <header className="grade-header">
        <div className="header-top">
          <p className="professor-name"><strong>Matricula: </strong>{matricula}</p>
          <h1 className="title-green">Desempeño académico</h1>
        </div>

        <div className="program-selector">
          <div className="program-label">
            <strong>Programa Educativo:</strong>
          </div>
          <select className="full-width-select" disabled>
            <option>Ingeniería en Sistemas</option> 
          </select>
        </div>

        <div className="group-selector">
            <div className="group-field">
              <strong>Grupos:</strong>
              <select className="small-select" disabled>
                <option>{grupo || "Sin grupo"}</option>
              </select>
            </div>

          <div className="subject-field">
            <strong>Asignatura:</strong>
            <select className="medium-select" value={materiaSeleccionada} onChange={handleMateriaChange}>
              {materias.map((materia, index) => (
                <option key={index} value={materia}>{materia}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="grades-table-container">
        {Object.keys(calificacionesPorUnidad).map((unidad) => (
          <div key={unidad} className="unit-table">
            <br/>
            <div className="grades-table">
              <div className="table-row main-header">
                <div className="cell matricula-header">Matrícula</div>
                <div className="cell nombre-header">Nombre</div>
                <div className="cell unidi-header"><h3>{unidad}</h3></div>
                <div className="">Calif. Final</div>
              </div>
              <div className="table-row sub-header">
                <div className="cell"></div>
                <div className="cell"></div>
                <div className="cell">ES</div>
                <div className="cell">AR</div>
                <div className="cell">%AS</div>
                <div className="cell">Calif</div>
                <div className="cell">AS</div>
              </div>
              {calificacionesPorUnidad[unidad].map((calificacion) => (
                <div key={calificacion.calificacion_id} className="table-row data-row">
                  <div className="cell matricula-cell">{calificacion.matricula}</div>
                  <div className="cell nombre-cell">{calificacion.nombre}</div>
                  <div className="cell">{calificacion.calificacion}</div>
                  <div className="cell">{calificacion.calificacion_remedial}</div>
                  <div className="cell">{calificacion.asistencias}%</div>
                  <div className="cell">
                    {calificacion.calificacion_extraordinario ? calificacion.calificacion_extraordinario : '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesempenoAcademico;
