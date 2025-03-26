import React from "react";
import { FaDownload } from "react-icons/fa";
import pdfCalendario from "./Calendario24-25.pdf"; // Asegura que la ruta del archivo PDF sea correcta
import "./Calendario.css";  // Asegúrate de importar los estilos correctamente

const Calendario = () => {
  // Función para manejar la descarga del PDF
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfCalendario;
    link.download = "Calendario_UTTT.pdf"; // Nombre del archivo descargado
    link.click();
  };

  return (
    <div className="calendario-container">
      <h2 className="title">📅 Calendario Escolar</h2>
      <div className="pdf-viewer">
        <iframe
          src={pdfCalendario}
          width="100%"
          height="100%"
          title="Calendario UTTT"
          style={{ border: "none" }}
        ></iframe>
      </div>
      <button onClick={handleDownload} className="download-button">
        <FaDownload /> Descargar Calendario
      </button>
    </div>
  );
};

export default Calendario;
