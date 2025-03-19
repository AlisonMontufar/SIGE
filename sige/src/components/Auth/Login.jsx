import { useState } from "react";
import './Login.css';  // Importa los estilos

export default function Login() {
  const [role, setRole] = useState("DOCENTE");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <h1>¡BIENVENIDO(A)</h1>
      <h2>Nuevo(a) Cardenal</h2>
      <div className="form-container">
        <h3>Ingrese Sus Datos:</h3>
        <label className="block text-sm font-medium text-gray-700">Roles:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="DOCENTE">DOCENTE</option>
          <option value="ESTUDIANTE">ESTUDIANTE</option>
          <option value="ADMINISTRADOR">ADMINISTRADOR</option>
        </select>
        <label className="block text-sm font-medium text-gray-700 mt-3">Usuario:</label>
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
        <button>
          Ingresar
        </button>
      </div>
    </div>
  );
}
