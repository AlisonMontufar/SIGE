import React from 'react';
import './InicioAdministrador.css';

const InicioAdministrador = () => {
  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <p className="welcome-message">Bienvenido Administrador</p>
      </header>

      <div className="admin-content">
        <nav className="admin-menu">
          <ul>
            <li>
              <a href="/admin/agregar-encuesta" className="menu-link">
                <span className="menu-icon">+</span>
                <span className="menu-text">Crear Nueva Encuesta</span>
              </a>
            </li>
            <li>
              <a href="/admin/gestionar-encuestas" className="menu-link">
                <span className="menu-icon">≡</span>
                <span className="menu-text">Gestionar Encuestas</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default InicioAdministrador;