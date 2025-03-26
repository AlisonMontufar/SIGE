import React, { useState } from "react";
import { FaExclamationCircle, FaPaperPlane } from "react-icons/fa";
import "./Calificaciones.css";

// Datos simulados de las materias
const materiasData = [
  {
    nombre: "Matemáticas 2",
    calificaciones: [
      { unidad: 1, calificacion: 9, acreditada: true, fecha: "2025-02-15", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 7, acreditada: false, fecha: "2025-04-10", remedial: 6, extraordinario: 7.5 },
    ]
  },
  {
    nombre: "Base de Datos",
    calificaciones: [
      { unidad: 1, calificacion: 8.5, acreditada: true, fecha: "2025-03-01", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 6, acreditada: false, fecha: "2025-05-05", remedial: 7, extraordinario: 7.8 },
    ]
  },
  {
    nombre: "Seguridad en Apps",
    calificaciones: [
      { unidad: 1, calificacion: 9.2, acreditada: true, fecha: "2025-01-20", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 5.5, acreditada: false, fecha: "2025-04-25", remedial: 6.5, extraordinario: 8.2 },
    ]
  },
  {
    nombre: "Planeación del Trabajo",
    calificaciones: [
      { unidad: 1, calificacion: 10, acreditada: true, fecha: "2025-02-10", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 6.8, acreditada: false, fecha: "2025-04-30", remedial: 7.2, extraordinario: 8.0 },
    ]
  },
  {
    nombre: "Desarrollo de Apps",
    calificaciones: [
      { unidad: 1, calificacion: 8, acreditada: true, fecha: "2025-03-03", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 5.9, acreditada: false, fecha: "2025-05-12", remedial: 6.3, extraordinario: 7.6 },
    ]
  },
  {
    nombre: "Redes de Computadoras",
    calificaciones: [
      { unidad: 1, calificacion: 7, acreditada: false, fecha: "2025-02-25", remedial: 8, extraordinario: 9 },
      { unidad: 2, calificacion: 8.3, acreditada: true, fecha: "2025-04-05", remedial: "", extraordinario: "" },
    ]
  },
  {
    nombre: "Estructuras de Datos",
    calificaciones: [
      { unidad: 1, calificacion: 6.8, acreditada: false, fecha: "2025-01-10", remedial: 7.5, extraordinario: 8.1 },
      { unidad: 2, calificacion: 9.5, acreditada: true, fecha: "2025-03-21", remedial: "", extraordinario: "" },
    ]
  },
  {
    nombre: "Sistemas Operativos",
    calificaciones: [
      { unidad: 1, calificacion: 8.2, acreditada: true, fecha: "2025-03-15", remedial: "", extraordinario: "" },
      { unidad: 2, calificacion: 7, acreditada: false, fecha: "2025-05-15", remedial: 7.2, extraordinario: 8.5 },
    ]
  }
];

const Calificaciones = () => {
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [calificacionAModificar, setCalificacionAModificar] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [reporteEnviado, setReporteEnviado] = useState(false); // Estado para saber si el reporte fue enviado

  const handleMateriaSeleccionada = (materia) => {
    setMateriaSeleccionada(materia);
    setReporteEnviado(false); // Reiniciar estado de reporte al seleccionar nueva materia
  };

  const handleReportarError = (calificacion) => {
    setCalificacionAModificar(calificacion);
    setShowModal(true);
  };

  const handleEnviarReporte = () => {
    // Cambiar el estado visual de la calificación a "enviado"
    setReporteEnviado(true);
    setShowModal(false);
    setMotivo("");
  };

  return (
    <div className="calificaciones-container">
      <h2 className="title">📊 Calificaciones</h2>

      {/* Menú de materias */}
      <div className="materias-menu">
        {materiasData.map((materia, index) => (
          <button
            key={index}
            className={`materia-button ${materia.calificaciones.every(cal => cal.acreditada) ? "acreditada" : "no-acreditada"}`}
            onClick={() => handleMateriaSeleccionada(materia)}
          >
            {materia.nombre}
          </button>
        ))}
      </div>

      {/* Detalles de la materia seleccionada */}
      {materiaSeleccionada && (
        <div className="materia-detalles">
          <h3 className="materia-title">{materiaSeleccionada.nombre}</h3>

          <table className="calificaciones-table">
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Calificación</th>
                <th>Fecha</th>
                <th>Acreditada</th>
                <th>Remedial</th>
                <th>Extraordinario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materiaSeleccionada.calificaciones.map((calificacion, index) => (
                <tr
                  key={index}
                  className={calificacion.calificacion === calificacionAModificar?.calificacion ? 'espera' : ''}>
                  <td>Unidad {calificacion.unidad}</td>
                  <td
                    className={`calificacion 
                      ${calificacion.acreditada ? 'acreditada' : 'no-acreditada'}
                      ${reporteEnviado && calificacion.calificacion === calificacionAModificar?.calificacion ? 'enviado' : ''}
                    `}
                  >
                    {calificacion.calificacion}
                  </td>
                  <td>{calificacion.fecha}</td>
                  <td>{calificacion.acreditada ? "Sí" : "No"}</td>
                  <td>{calificacion.acreditada ? "" : calificacion.remedial}</td>
                  <td>{calificacion.acreditada || calificacion.remedial ? "" : calificacion.extraordinario}</td>
                  <td>
                    <button
                      className="report-button"
                      onClick={() => handleReportarError(calificacion)}
                    >
                      <FaExclamationCircle /> Reportar Error
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensaje indicando que el reporte fue enviado */}
          {reporteEnviado && (
            <div className="mensaje-enviado">
              <p>✅ El reporte ha sido enviado exitosamente. La calificación está en espera de revisión.</p>
            </div>
          )}
        </div>
      )}

      {/* Modal de reporte de error */}
      {showModal && (
        <div className="report-modal">
          <h3>Reporte de error</h3>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Escribe el motivo por el cual solicitas el cambio"
            className="error-textarea"
            rows="4"
          />
          <button className="submit-error" onClick={handleEnviarReporte}>
            <FaPaperPlane /> Enviar Reporte
          </button>
        </div>
      )}
    </div>
  );
};

export default Calificaciones;
