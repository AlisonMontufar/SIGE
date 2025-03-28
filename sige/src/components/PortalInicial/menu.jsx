import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

function NavigationMenu() {
  const navigate = useNavigate();

  // Obtener la matrícula y el rol del usuario desde el localStorage
  const matricula = localStorage.getItem("userMatricula");
  const role = localStorage.getItem("userRole");

  // Verificar si la matrícula y el rol se obtuvieron correctamente
  console.log("Matrícula:", matricula); // Esto debería mostrar la matrícula si está correctamente almacenada
  console.log("Rol:", role); // Esto debería mostrar el rol si está correctamente almacenado

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina el token de autenticación, la matrícula y el rol
    localStorage.removeItem("authToken");
    localStorage.removeItem("userMatricula");
    localStorage.removeItem("userRole");

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
        <button className="nav-button" onClick={() => navigateTo('/')}>🏠 Inicio </button>
      </div>

      {/* Dropdown Planeación Didáctica */}
      <div className="nav-item">
        <button className="nav-button">📄 Eventos ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/eventosAcademicos')}>Eventos Académicos</li>
        </ul>
      </div>

      <div className="nav-item">
        <button className="nav-button">📄 Encuestas ▼</button>
        <ul className="dropdown-menu">
          <li onClick={() => navigateTo('/alumno')}>Ver Encuestas</li>
        </ul>
      </div>

      {role?.toLowerCase() !== "estudiante" && (
  <div className="nav-item">
    <button className="nav-button">📊 Calificaciones ▼</button>
    <ul className="dropdown-menu">
      <li onClick={() => navigateTo('/Calificaciones/Modificaciones')}>Envío y modificaciones</li>
      <li onClick={() => navigateTo('/Calificaciones/DesempeñoAcademico')}>Desempeño Académico</li>
    </ul>
  </div>
)}

     {/* Dropdown Calendario/Horarios */}
<div className="nav-item">
  <button className="nav-button">📅 Calendario/Horarios ▼</button>
  <ul className="dropdown-menu">
    <li onClick={() => navigateTo('/horarios')}>Horarios</li>
    {/* Mostrar la opción de Calificaciones solo si el rol es "estudiante" */}
    {role?.toLowerCase() === "estudiante" && (
      <li onClick={() => navigateTo('/calificaciones')}>Calificaciones</li>
    )}
    <li onClick={() => navigateTo('/calendario')}>Calendario</li>
  </ul>
</div>

      {/* Mostrar matrícula y opción de cerrar sesión */}
      <div className="nav-item">
        {matricula ? (
          <>
            <button className='profile-button' onClick={() => navigateTo('/perfil')}>👤 Perfil: {matricula} ▼</button>
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
