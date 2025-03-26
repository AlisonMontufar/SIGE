import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

function NavigationMenu() {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="navigation-bar">
      {/* Botón de Home */}
      <div className="nav-item">
        <button className="nav-button" onClick={() => navigateTo('/')}>🏠 Inicio ▼</button>
      </div>

      {/* Dropdown Planeación Didáctica */}
      <div className="nav-item">
        <button className="nav-button">📄 Planeación Didáctica ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/planeacion/opcion1')}>Opción 1</li>
          <li onClick={() => navigateTo('/planeacion/opcion2')}>Opción 2</li>
        </ul>
      </div>

      {/* Dropdown Calificaciones */}
      <div className="nav-item">
        <button className="nav-button">📊 Calificaciones ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/calificaciones/envio-modificaciones')}>Envío y modificaciones</li>
          <li onClick={() => navigateTo('/calificaciones/desempeno-academico')}>Desempeño Académico</li>
        </ul>
      </div>

      {/* Dropdown Calendario/Horarios */}
      <div className="nav-item">
        <button className="nav-button">📅 Calendario/Horarios ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/calendario/horario-clases')}>Horario de clases</li>
          <li onClick={() => navigateTo('/calendario/calendario')}>Calendario</li>
        </ul>
      </div>

      {/* Perfil */}
      <div className="nav-item">
        <button className="profile-button">👤 Perfil ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/perfil/configuracion')}>Ajustes</li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationMenu;
