import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Cardenal from './img/Cardenal.png';
import R1 from './img/R1.png';
import R2 from './img/R2.png';
import P1 from './img/P1.png';
import P2 from './img/Polygon 4.png';
import P3 from './img/Polygon 5.png';
import P4 from './img/Polygon 6.png';
import R3 from './img/R2.png';
import LogoUt from './img/image 35 (1).png';

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

      {/* Imágenes en las esquinas */}
      <img src={R1} alt="Esquina izquierda" className="corner-image-left" />
      <img src={R2} alt="Esquina izquierda" className="corner-image-left-r2" />
      <img src={R3} alt="Esquina izquierda" className="corner-image-left-r3" />
      <img src={LogoUt} alt="Esquina izquierda" className="corner-image-logo" />
      <img src={Cardenal} alt="Esquina derecha" className="corner-image-right" />
      <img src={P2} alt="Esquina derecha" className="corner-image-right-p2" />
      <img src={P1} alt="Esquina derecha" className="corner-image-right-p1" />
      <img src={P4} alt="Esquina derecha" className="corner-image-right-p3" />
      <img src={P3} alt="Esquina derecha" className="corner-image-right-p4" />
    </div>
  );
}

export default Home;
