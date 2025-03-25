import React from 'react';
import './Env-Mod-calificaciones.css';

function EnvModCalificaciones() {
  // Sample data
  const professor = {
    name: "Laura Alejandra Angeles Reyes",
    program: "Programa Educativo"
  };

  const programs = [
    { id: 1, name: "Programa Educativo 1" },
    { id: 2, name: "Programa Educativo 2" },
    { id: 3, name: "Programa Educativo 3" }
  ];

  const groups = [
    { id: 1, name: "Grupo A" },
    { id: 2, name: "Grupo B" },
    { id: 3, name: "Grupo C" }
  ];

  const subjects = [
    { id: 1, name: "Matemáticas" },
    { id: 2, name: "Español" },
    { id: 3, name: "Ciencias" },
    { id: 4, name: "Historia" }
  ];

  const students = [
    { id: 1, name: "Juan Pérez", es: 85, ar: 90, asPercent: 80, finalGrade: 87.5 },
    { id: 2, name: "María García", es: 78, ar: 92, asPercent: 85, finalGrade: 84.3 },
    { id: 3, name: "Carlos López", es: 90, ar: 88, asPercent: 95, finalGrade: 89.5 }
  ];

  return (
    <div className="grade-management-container">
      <header className="grade-header">
        <div className="header-top">
          <p className="professor-name"><strong>Profesor:</strong> {professor.name}</p>
          <h1 className="title-green">Envio Calificaciones</h1>
        </div>
        
        <div className="program-selector">
          <div className="program-label">
            <strong>Programa Educativo:</strong>
          </div>
          <select className="full-width-select">
            {programs.map(program => (
              <option key={program.id} value={program.id}>{program.name}</option>
            ))}
          </select>
        </div>
        
        <div className="group-selector">
          <div className="group-field">
            <strong>Grupos:</strong>
            <select className="small-select">
              {groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          <div className="subject-field">
            <strong>Asignatura:</strong>
            <select className="medium-select">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button className='edit-button'>Editar Calificaciones</button>
          </div>

          
        </div>
      </header>

      {/* Tabla corregida con estructura exacta */}
      <div className="grades-table-container">
        <div className="grades-table">
          {/* Fila de encabezados principales */}
          <div className="table-row main-header">
            <div className="cell matricula-header">Matrículas</div>
            <div className="cell nombre-header">Nombres</div>
            <div className="cell unidi-header">UNID1 50%</div>
            <div className="cell final-header">CALIF FINAL</div>
          </div>
          
          {/* Fila de subencabezados */}
          <div className="table-row sub-header">
            <div className="cell"></div>
            <div className="cell"></div>
            <div className="cell">ES</div>
            <div className="cell">AR</div>
            <div className="cell">%AS</div>
            <div className="cell">Calif</div>
            <div className="cell">AS</div>
          </div>
          
          {/* Filas de datos */}
          {students.map(student => (
            <div key={student.id} className="table-row data-row">
              <div className="cell matricula-cell"></div>
              <div className="cell nombre-cell">{student.name}</div>
              <div className="cell">{student.es}</div>
              <div className="cell">{student.ar}</div>
              <div className="cell">{student.asPercent}%</div>
              <div className="cell">{student.finalGrade}</div>
              <div className="cell">AS</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvModCalificaciones;