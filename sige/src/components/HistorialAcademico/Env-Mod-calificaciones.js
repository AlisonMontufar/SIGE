import React, { useEffect, useState } from 'react';
import './Env-Mod-calificaciones.css';
import NavigationMenu from '../PortalInicial/menu';

function EnvModCalificaciones() {
  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [calificaciones, setCalificaciones] = useState([]);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
  const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
  const [profesorInfo, setProfesorInfo] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editableCalificaciones, setEditableCalificaciones] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  // Obtén la matrícula del profesor del localStorage
  const matricula = localStorage.getItem("userMatricula");

  useEffect(() => {
    const fetchCalificaciones = async () => {
      try {
        if (!matricula) {
          console.error('Matricula no encontrada en localStorage');
          return;
        }

        const response = await fetch(`http://localhost:5000/ModificarCalificaciones/${matricula}`);
        const data = await response.json();

        if (data.length > 0) {
          setProfesorInfo({
            nombre: data[0].profesor,
            matricula: data[0].profesor_matricula
          });

          const materiasUnicas = Array.from(new Set(data.map(item => item.materia)));
          setMaterias(materiasUnicas);
          setMateriaSeleccionada(materiasUnicas[0] || '');

          const gruposUnicos = Array.from(new Set(data.map(item => item.nombre_grupo)));
          setGrupos(gruposUnicos);
          setGrupoSeleccionado(gruposUnicos[0] || '');
        }

        setCalificaciones(data);
      } catch (error) {
        console.error('Error al obtener calificaciones:', error);
      }
    };

    fetchCalificaciones();
  }, [matricula]);

  const handleMateriaChange = (event) => {
    setMateriaSeleccionada(event.target.value);
    if (isEditing) toggleEditMode(); // Cancelar edición si está activa
  };

  const handleGrupoChange = (event) => {
    setGrupoSeleccionado(event.target.value);
    if (isEditing) toggleEditMode(); // Cancelar edición si está activa
  };

  // Filtrar calificaciones por grupo y materia seleccionados
  const calificacionesFiltradas = calificaciones.filter(cal => 
    cal.materia === materiaSeleccionada && 
    cal.nombre_grupo === grupoSeleccionado
  );

  // Agrupar por unidad primero, luego por alumno
  const calificacionesPorUnidad = calificacionesFiltradas.reduce((acc, calificacion) => {
    const unidad = calificacion.unidad || 'Sin unidad';
    if (!acc[unidad]) acc[unidad] = {};
    
    const alumnoId = calificacion.alumno_id;
    if (!acc[unidad][alumnoId]) {
      acc[unidad][alumnoId] = {
        nombre: calificacion.alumno_nombre,
        matricula: calificacion.alumno_usuario_id,
        calificaciones: []
      };
    }
    
    acc[unidad][alumnoId].calificaciones.push(calificacion);
    return acc;
  }, {});

  const toggleEditMode = () => {
    if (!isEditing) {
      // Crear estructura de datos editable
      const editableData = {};
      calificacionesFiltradas.forEach(cal => {
        const key = `${cal.alumno_id}-${cal.unidad}`;
        editableData[key] = {
          calificacion_id: cal.calificacion_id,
          calificacion: cal.calificacion,
          calificacion_remedial: cal.calificacion_remedial,
          asistencias: cal.asistencias,
          calificacion_extraordinario: cal.calificacion_extraordinario
        };
      });
      setEditableCalificaciones(editableData);
    } else {
      // Limpiar datos editables al cancelar
      setEditableCalificaciones({});
    }
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (alumnoId, unidad, field, value) => {
    const key = `${alumnoId}-${unidad}`;
    setEditableCalificaciones(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value !== '' ? (field === 'asistencias' ? parseInt(value) : parseFloat(value)) : null
      }
    }));
  };

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      // Preparar los datos en el formato que espera el backend
      const updates = Object.values(editableCalificaciones).map(cal => ({
        calificacion_id: cal.calificacion_id,
        calificacionEditada: cal.calificacion,
        calificacionRemedialEditada: cal.calificacion_remedial,
        asistenciasEditadas: cal.asistencias,
        calificacion_extraordinario: cal.calificacion_extraordinario
      }));

      const response = await fetch('http://localhost:5000/GuardarCalificaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error al guardar los cambios');
      }

      // Actualizar el estado local con los cambios confirmados
      const updatedCalificaciones = calificaciones.map(cal => {
        const key = `${cal.alumno_id}-${cal.unidad}`;
        if (editableCalificaciones[key]) {
          return { 
            ...cal, 
            calificacion: editableCalificaciones[key].calificacion,
            calificacion_remedial: editableCalificaciones[key].calificacion_remedial,
            asistencias: editableCalificaciones[key].asistencias,
            calificacion_extraordinario: editableCalificaciones[key].calificacion_extraordinario
          };
        }
        return cal;
      });

      setCalificaciones(updatedCalificaciones);
      setIsEditing(false);
      alert('Calificaciones actualizadas correctamente');
    } catch (error) {
      console.error('Error al guardar calificaciones:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const getEditableValue = (alumnoId, unidad, field) => {
    const key = `${alumnoId}-${unidad}`;
    return editableCalificaciones[key]?.[field] ?? 
           calificacionesFiltradas.find(c => 
             c.alumno_id === alumnoId && c.unidad === unidad
           )?.[field];
  };

  return (

    <div>
      <div><NavigationMenu/></div>  
      <div>
    <div className="grade-management-container">
      {isSaving && (
        <div className="saving-overlay">
          <div className="saving-message">
            <div className="saving-spinner"></div>
            <span>Guardando cambios...</span>
          </div>
        </div>
      )}

      <header className="grade-header">
        <div>
          
        </div>
        <div className="header-top">
          <p className="professor-name"><strong>Profesor: </strong>{profesorInfo.nombre || 'No disponible'}</p>
          <h1 className="title-green">Gestión de Calificaciones</h1>
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
            <select 
              className="small-select" 
              value={grupoSeleccionado} 
              onChange={handleGrupoChange}
              disabled={isEditing}
            >
              {grupos.map((grupo, index) => (
                <option key={index} value={grupo}>{grupo}</option>
              ))}
            </select>
          </div>

          <div className="subject-field">
            <strong>Asignatura:</strong>
            <select 
              className="medium-select" 
              value={materiaSeleccionada} 
              onChange={handleMateriaChange}
              disabled={isEditing}
            >
              {materias.map((materia, index) => (
                <option key={index} value={materia}>{materia}</option>
              ))}
            </select>
            <button 
              className={`edit-button ${isEditing ? 'cancel' : ''}`}
              onClick={toggleEditMode}
              disabled={calificacionesFiltradas.length === 0}
            >
              {isEditing ? 'Cancelar Edición' : 'Editar Calificaciones'}
            </button>
          </div>
        </div>
      </header>

      <div className="grades-table-container">
        {Object.keys(calificacionesPorUnidad).length > 0 ? (
          <>
            {Object.entries(calificacionesPorUnidad).map(([unidad, alumnos]) => (
              <div key={unidad} className="unit-table">
                <h2 className="unit-title">{unidad}</h2>
                <div className="grades-table">
                  <div className="table-row main-header">
                    <div className="cell matricula-header">Matrícula</div>
                    <div className="cell nombre-header">Nombre del Alumno</div>
                    <div className="cell unidi-header"><h3>Calificaciones</h3></div>
                    <div className="">Acción</div>
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
                  {Object.values(alumnos).map((alumno) => (
                    alumno.calificaciones.map((calificacion) => {
                      const key = `${calificacion.alumno_id}-${calificacion.unidad}`;
                      return (
                        <div key={key} className="table-row data-row">
                          <div className="cell matricula-cell">{alumno.matricula}</div>
                          <div className="cell nombre-cell">{alumno.nombre}</div>
                          
                          {/* Calificación ES */}
                          <div className="cell">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={getEditableValue(calificacion.alumno_id, calificacion.unidad, 'calificacion') || ''}
                                onChange={(e) => handleFieldChange(
                                  calificacion.alumno_id, 
                                  calificacion.unidad, 
                                  'calificacion', 
                                  e.target.value
                                )}
                                className="edit-input"
                              />
                            ) : (
                              calificacion.calificacion
                            )}
                          </div>
                          
                          {/* Calificación AR */}
                          <div className="cell">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={getEditableValue(calificacion.alumno_id, calificacion.unidad, 'calificacion_remedial') || ''}
                                onChange={(e) => handleFieldChange(
                                  calificacion.alumno_id, 
                                  calificacion.unidad, 
                                  'calificacion_remedial', 
                                  e.target.value
                                )}
                                className="edit-input"
                              />
                            ) : (
                              calificacion.calificacion_remedial || '-'
                            )}
                          </div>
                          
                          {/* % Asistencias */}
                          <div className="cell">
                            {isEditing ? (
                              <>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={getEditableValue(calificacion.alumno_id, calificacion.unidad, 'asistencias') || 0}
                                  onChange={(e) => handleFieldChange(
                                    calificacion.alumno_id, 
                                    calificacion.unidad, 
                                    'asistencias', 
                                    e.target.value
                                  )}
                                  className="edit-input"
                                />%
                              </>
                            ) : (
                              `${calificacion.asistencias}%`
                            )}
                          </div>
                          
                          {/* Calif. Extraordinario */}
                          <div className="cell">
                            {isEditing ? (
                              <input
                                type="number"
                                min="0"
                                max="10"
                                step="0.1"
                                value={getEditableValue(calificacion.alumno_id, calificacion.unidad, 'calificacion_extraordinario') || ''}
                                onChange={(e) => handleFieldChange(
                                  calificacion.alumno_id, 
                                  calificacion.unidad, 
                                  'calificacion_extraordinario', 
                                  e.target.value
                                )}
                                className="edit-input"
                              />
                            ) : (
                              calificacion.calificacion_extraordinario || '-'
                            )}
                          </div>
                          
                          <div className="cell">{calificacion.accion}</div>
                        </div>
                      );
                    })
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="no-data-message">
            No hay calificaciones disponibles para la materia y grupo seleccionados.
          </div>
        )}
      </div>

      {isEditing && (
        <div className="save-actions">
          <button 
            className="save-button" 
            onClick={saveChanges}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>
      )}
    </div>
        </div>  
    </div>
  );
}

export default EnvModCalificaciones;