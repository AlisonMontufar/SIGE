import React, { useState, useEffect } from 'react';
import './Env-Mod-calificaciones.css';

function EnvModCalificaciones() {
  // Datos jerárquicos según la estructura solicitada
  const data = [
    {
      id: 1,
      name: 'Programa Educativo 1',
      professors: [
        {
          id: 1,
          name: 'Laura Alejandra Angeles Reyes',
          subjects: [
            {
              id: 1,
              name: 'Matemáticas',
              groups: [
                {
                  id: 1,
                  name: 'Grupo A',
                  students: [
                    { id: 1, name: 'Juan Pérez', es: 85, ar: 90, asPercent: 80, finalGrade: 87.5 },
                    { id: 2, name: 'María García', es: 78, ar: 92, asPercent: 85, finalGrade: 84.3 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Programa Educativo 2',
      professors: [
        {
          id: 2,
          name: 'Carlos Martínez',
          subjects: [
            {
              id: 2,
              name: 'Ciencias',
              groups: [
                {
                  id: 2,
                  name: 'Grupo B',
                  students: [
                    { id: 3, name: 'Carlos López', es: 90, ar: 88, asPercent: 95, finalGrade: 89.5 }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];

  // Simulamos que el profesor está logueado (por ejemplo, profesor con ID 1)
  const loggedInProfessorId = 2;

  // Filtramos los datos para obtener el programa que pertenece al profesor logueado
  const [selectedProgram, setSelectedProgram] = useState(() => {
    const program = data.find(program =>
      program.professors.some(professor => professor.id === loggedInProfessorId)
    );
    return program;
  });

  const [selectedProfessor, setSelectedProfessor] = useState(() => {
    const professor = selectedProgram.professors.find(professor => professor.id === loggedInProfessorId);
    return professor;
  });

  const [selectedSubject, setSelectedSubject] = useState(selectedProfessor.subjects[0]);
  const [selectedGroup, setSelectedGroup] = useState(selectedSubject.groups[0]);

  useEffect(() => {
    setSelectedProgram(prevProgram => {
      const program = data.find(program =>
        program.professors.some(professor => professor.id === loggedInProfessorId)
      );
      return program;
    });
  }, []);

  return (
    <div className="grade-management-container">
      <header className="grade-header">
        <div className="header-top">
          <p className="professor-name"><strong>Profesor:</strong> {selectedProfessor.name}</p>
          <h1 className="title-green">Envio Calificaciones</h1>
        </div>

        <div className="program-selector">
          <div className="program-label">
            <strong>Programa Educativo:</strong>
          </div>
          <select className="full-width-select" disabled>
            <option>{selectedProgram.name}</option>
          </select>
        </div>

        <div className="group-selector">
          <div className="group-field">
            <strong>Grupos:</strong>
            <select className="small-select" onChange={(e) => {
              const group = selectedSubject.groups.find(g => g.id === parseInt(e.target.value));
              setSelectedGroup(group);
            }}>
              {selectedSubject.groups.map(group => (
                <option key={group.id} value={group.id}>{group.name}</option>
              ))}
            </select>
          </div>
          <div className="subject-field">
            <strong>Asignatura:</strong>
            <select className="medium-select" onChange={(e) => {
              const subject = selectedProfessor.subjects.find(s => s.id === parseInt(e.target.value));
              setSelectedSubject(subject);
              setSelectedGroup(subject.groups[0]);
            }}>
              {selectedProfessor.subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <button className='edit-button'>Editar Calificaciones</button>
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
          {selectedGroup.students.map(student => (
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
}

export default EnvModCalificaciones;
