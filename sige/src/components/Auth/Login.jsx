import { useState, useEffect } from "react";
import './Login.css';
import Logo from './img/Logo.png';
import Cardenal from './img/Cardenal.png';
import { useNavigate } from "react-router-dom"; // Importar useNavigate

export default function Login() {
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); 

  // Cargar roles desde el backend
  useEffect(() => {
    fetch("http://localhost:5000/get-roles")
      .then(response => response.json())
      .then(data => {
        setRoles(data);
        if (data.length > 0) setRole(data[0].nombre_rol); 
      })
      .catch(error => console.error("Error al cargar roles:", error));

    // Verificar si ya está autenticado
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      navigate("/home");  // Redirige a home si ya está autenticado
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!user || !password) {
      setErrorMessage("Por favor ingrese su matrícula y contraseña.");
      return;
    }

    const loginData = { matricula: user, contraseña: password, rol: role };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Ingreso exitoso: " + data.message);

       
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userMatricula", user); 
        localStorage.setItem("userRole", role); // Guarda el rol también

        // Redirige a la página de home
        navigate("/home");
      } else {
        setErrorMessage(data.message || "Error desconocido. Intente nuevamente.");
      }
    } catch (error) {
      setErrorMessage("Error en la autenticación");
      console.error("Error de autenticación:", error);
    }
  };

  return (
    <div className="login-container">
      <img src={Logo} className="welcome-image" alt="Logo" />
      <img src={Cardenal} className="Cardenal-image" alt="Logo" />
      <div className="form-container">
        <h3>Ingrese Sus Datos:</h3>

        <label className="block text-sm font-medium text-gray-700">Roles:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {roles.map((role) => (
            <option key={role.rol_id} value={role.nombre_rol}>
              {role.nombre_rol}
            </option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 mt-3">Usuario (Matrícula):</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700 mt-3">Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button onClick={handleLogin}>
          Ingresar
        </button>
      </div>
    </div>
  );
}
