import React from 'react';
import './InicioAdministrador.css'; // Importa el archivo de estilo

const InicioAdministrador = () => {
  return (
    <div className="inicio-administrador">
      <h1>Bienvenido al Panel de Administrador</h1>
      <nav>
        <ul className="menu">
          <li><a href="/admin/agregar-encuesta" className="menu-item">Agregar Encuesta</a></li>
          <li><a href="/admin/gestionar-encuestas" className="menu-item">Gestionar Encuestas</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default InicioAdministrador;
