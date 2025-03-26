import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

function NavigationMenu() {
  const navigate = useNavigate();

  // Obtener la matrícula del usuario desde el localStorage
  const matricula = localStorage.getItem("userMatricula");

  // Verificar si la matrícula se obtuvo correctamente
  console.log("Matrícula:", matricula); // Esto debería mostrar la matrícula si está correctamente almacenada

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina el token de autenticación y la matrícula
    localStorage.removeItem("authToken");
    localStorage.removeItem("userMatricula");

    // Redirige al login
    navigate('/');
  };

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
          <li onClick={() => navigateTo('/admin/actividades')}>Opción 1</li>
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

      {/* Mostrar matrícula y opción de cerrar sesión */}
      <div className="nav-item">
        {matricula ? (
          <>
            <button className="profile-button">👤 Perfil: {matricula} ▼</button>
            <ul className="dropdown-menu">
              <li onClick={() => navigateTo('/perfil/configuracion')}>Ajustes</li>
              <li onClick={handleLogout}>Cerrar sesión</li>
            </ul>
          </>
        ) : (
          <p>Loading...</p>  // Mostrar mensaje si no se encuentra la matrícula
        )}
      </div>
    </div>
  );
}

export default NavigationMenu;
