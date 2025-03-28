import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Home from './components/PortalInicial/home';
import InicioAdministrador from './components/Encuestas/Administrador/InicioAdministrador';
import AgregarEncuesta from './components/Encuestas/Administrador/AgregarEncuesta';
import GestionarEncuestas from './components/Encuestas/Administrador/GestionarEncuestas';
import InicioAlumno from './components/Encuestas/Alumno/InicioAlumno';
import Encuesta from './components/Encuestas/Alumno/Encuesta';
import EnvModCalificaciones from './components/HistorialAcademico/Env-Mod-calificaciones';
import DesempenoAcademico from './components/HistorialAcademico/DesempeñoAcademico';

// Importa las vistas de actividades extracurriculares
import InicioActividadesExtracurriculares from './components/ActividadesExtracurriculares/InicioActividadesExtracurriculares';
import AgregarActividadExtracurricular from './components/ActividadesExtracurriculares/AgregarActividadExtracurricular';
import GestionarActividadesExtracurriculares from './components/ActividadesExtracurriculares/GestionarActividadesExtracurriculares';
import VerActividadExtracurricular from './components/ActividadesExtracurriculares/VerActividadExtracurricular'; // Nuevo componente


import Calendario from './components/HorariosCalificaciones/Calendario';
import Calificaciones from './components/HorariosCalificaciones/Calificaciones'; 
import Perfil from './components/PerfilPersonal/Profile'; 

import PrivateRoute from './components/Auth/PrivateRoute'; // Importar el componente de ruta privada

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para login */}
        <Route path="/" element={<Login />} />
        
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        
        {/* Rutas de Calificaiones protegidas */}
        <Route path="/Calificaciones/Modificaciones" element={<PrivateRoute><EnvModCalificaciones /></PrivateRoute>} />
        <Route path="/Calificaciones/DesempeñoAcademico" element={<PrivateRoute><DesempenoAcademico /></PrivateRoute>} />
        
        {/* Rutas de administrador protegidas */}
        <Route path="/admin" element={<PrivateRoute><InicioAdministrador /></PrivateRoute>} />
        <Route path="/admin/agregar-encuesta" element={<PrivateRoute><AgregarEncuesta /></PrivateRoute>} />
        <Route path="/admin/gestionar-encuestas" element={<PrivateRoute><GestionarEncuestas /></PrivateRoute>} />
        
        {/* Rutas de alumno protegidas */}
        <Route path="/alumno" element={<PrivateRoute><InicioAlumno /></PrivateRoute>} />
        <Route path="/alumno/encuesta/:nombre" element={<PrivateRoute><Encuesta /></PrivateRoute>} />

        {/* Rutas para Actividades Extracurriculares protegidas */}
        <Route path="/eventosAcademicos" element={<PrivateRoute><InicioActividadesExtracurriculares /></PrivateRoute>} />
        <Route path="/admin/agregar-actividad" element={<PrivateRoute><AgregarActividadExtracurricular /></PrivateRoute>} />
        <Route path="/admin/gestionar-actividades" element={<PrivateRoute><GestionarActividadesExtracurriculares /></PrivateRoute>} />
        <Route path="/eventosAcademicos/:id" element={<PrivateRoute><VerActividadExtracurricular /></PrivateRoute>} />

        <Route path="/calendario" element={<Calendario />} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/perfil" element={<Perfil />} />



      </Routes>
    </Router>
  );
}

export default App;
