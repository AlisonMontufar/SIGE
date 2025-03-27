import React from 'react';
import './Env-Mod-calificaciones.css';

function DesempenoAcademico() {
  return (
    <div className="grade-management-container">
      <header className="grade-header">
        <div className="header-top">
          <p className="professor-name"><strong>Matricula</strong> Dr. Juan Pérez</p>
          <h1 className="title-green">Desempeño academico</h1>
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
            <select className="small-select">
              <option>Grupo A</option>
            </select>
          </div>
          <div className="subject-field">
            <strong>Asignatura:</strong>
            <select className="medium-select">
              <option>Programación</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grades-table-container">
        <div className="grades-table">
          <div className="table-row main-header">
            <div className="cell matricula-header">Matrículas</div>
            <div className="cell nombre-header">Nombres</div>
            <div className="cell unidi-header">UNID1 50%</div>
            <div className="cell final-header">CALIF FINAL</div>
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
          <div className="table-row data-row">
            <div className="cell matricula-cell"></div>
            <div className="cell nombre-cell">Carlos López</div>
            <div className="cell">90</div>
            <div className="cell">85</div>
            <div className="cell">95%</div>
            <div className="cell">89</div>
            <div className="cell">AS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesempenoAcademico;
