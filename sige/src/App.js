import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import ListaEncuestas from './components/Encuestas/ListaEncuestas';
import FormularioEncuesta from './components/Encuestas/FormularioEncuesta';
import ResultadoEncuesta from './components/Encuestas/ResultadoEncuesta';

import './App.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

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

          {/* Dropdown Encuestas */}
          <div className="nav-item">
            <button className="nav-button">📋 Encuestas ▼</button>
            <ul className="dropdown-menu">
              <li onClick={() => navigateTo('/encuestas')}>Lista de Encuestas</li>
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />

        {/* Rutas de Encuestas */}
        <Route path="/encuestas" element={<ListaEncuestas />} />
        <Route path="/encuesta/:id" element={<FormularioEncuesta />} />
        <Route path="/encuesta/:id/resultados" element={<ResultadoEncuesta />} />
      </Routes>
    </Router>
  );
}

export default App;
