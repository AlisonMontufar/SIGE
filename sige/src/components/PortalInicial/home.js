import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css'

function Home() {
    
    const navigate = useNavigate();

    const navigateTo = (path) => {
      navigate(path);
    };
  
    return (
      <div className="App">
        <header className="App-header">
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
        </header>
  
        <div className="Titulo-bienvenida">
          <h1>Bienvenido</h1>
          <h3>Gracias por formar parte de nuestra institución</h3>
        </div>
  
        <div className="container">
          <div className="card-noticias">
            <h1>Contenido del Card</h1>
            <p>Este es un ejemplo de contenido dentro del card blanco.</p>
          </div>
        </div>
      </div>
    );
  }

  export default Home;