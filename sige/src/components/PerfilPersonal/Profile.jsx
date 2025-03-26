import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "../PerfilPersonal/ProfileStyle.css"; // Archivo de estilos
import NavigationMenu from '../PortalInicial/menu';

const API_URL = "http://localhost:5000"; // Reemplázalo con la URL real del backend

const Profile = () => {
  const [formData, setFormData] = useState({
    direccion: "",
    telefonoCasa: "",
    telefonoCelular: "",
    correoPersonal: "",
    correoInstitucional: "",
  });

  const [originalData, setOriginalData] = useState({
    nombre: "",
    direccion: "",
    telefonoCasa: "",
    telefonoCelular: "",
    correoPersonal: "",
    correoInstitucional: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    actual: "",
    nueva: "",
    confirmar: "",
  });
  const [error, setError] = useState(null);

  // Obtener la matrícula del localStorage
  const matricula = localStorage.getItem("userMatricula");

  // Obtener datos del usuario (usando la matrícula)
  useEffect(() => {
    const fetchUserData = async () => {
      if (!matricula) return;

      try {
        const response = await fetch(`${API_URL}/get-perfil/${matricula}`);
        if (!response.ok) throw new Error("Error al obtener el perfil");
        const data = await response.json();

        setFormData({
          direccion: data.direccion,
          telefonoCasa: data.telefono_casa,
          telefonoCelular: data.telefono_celular,
          correoPersonal: data.correo_personal,
          correoInstitucional: data.correo_institucional,
        });

        // Guardar también el nombre en el estado
        setOriginalData({
          nombre: data.nombre, // Guardar el nombre
          direccion: data.direccion,
          telefonoCasa: data.telefono_casa,
          telefonoCelular: data.telefono_celular,
          correoPersonal: data.correo_personal,
          correoInstitucional: data.correo_institucional,
        });
      } catch (error) {
        console.error("Error en la solicitud:", error);
        setError("No se pudo cargar la información del perfil.");
      }
    };

    fetchUserData();
  }, [matricula]);

  // Formatear la etiqueta de cada campo
  const formatLabel = (field) => {
    return field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    if (isEditing) {
      // Restaurar datos originales si se cancela la edición
      setFormData({
        direccion: originalData.direccion,
        telefonoCasa: originalData.telefonoCasa,
        telefonoCelular: originalData.telefonoCelular,
        correoPersonal: originalData.correoPersonal,
        correoInstitucional: originalData.correoInstitucional,
      });
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordUpdate = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  // Guardar cambios del perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/update-perfil`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, matricula }),
      });
      const data = await response.json(); // Verifica la respuesta del backend
      if (!response.ok) throw new Error(data.message || "Error al actualizar el perfil");

      alert("Datos actualizados correctamente");

      // Actualiza los datos originales después de la actualización
      setOriginalData({ ...formData });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError("Hubo un error al actualizar los datos.");
    }
  };

  // Actualizar contraseña
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwords.nueva !== passwords.confirmar) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/update-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matricula,
          actual: passwords.actual,
          nueva: passwords.nueva,
        }),
      });
      if (!response.ok) throw new Error("Error al actualizar la contraseña");
      alert("Contraseña actualizada correctamente.");
      setIsChangingPassword(false);
      setPasswords({ actual: "", nueva: "", confirmar: "" });
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la contraseña.");
    }
  };

  return (
    <div>
      <NavigationMenu />
    <div className="profile-container">
      {error && <div className="error-message">{error}</div>}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h2 className="profile-name">{originalData.nombre || "Nombre no disponible"}</h2>
        </div>

        {/* Botones de acción */}
        <div className="profile-actions">
          <button className="action-button" onClick={handleEdit}>
            {isEditing ? "Cancelar" : "Editar Información"}
          </button>
          {isEditing && (
            <button className="action-button" onClick={handleSubmit}>
              Guardar Cambios
            </button>
          )}
          <button className="action-button" onClick={handlePasswordUpdate}>
            {isChangingPassword ? "Cancelar" : "Cambiar Contraseña"}
          </button>
        </div>

        {/* Redes Sociales */}
        <div className="profile-social">
          <a href="https://www.instagram.com/uttt_mx/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon instagram" />
          </a>
          <a href="https://www.facebook.com/UTTTMx" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon facebook" />
          </a>
        </div>

        {/* Información del perfil */}
        <form className="profile-form">
          {Object.keys(formData).map((field) => (
            <div key={field} className="form-group">
              <label className="form-label">{formatLabel(field)}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-input"
                />
              ) : (
                <p className="form-text">{formData[field]}</p>
              )}
            </div>
          ))}
        </form>

        {/* Cambio de contraseña */}
        {isChangingPassword && (
          <form className="password-form" onSubmit={handlePasswordSubmit}>
            <h3 className="password-title">Cambiar Contraseña</h3>
            <div className="form-group">
              <label className="form-label">Contraseña Actual</label>
              <input
                type="password"
                name="actual"
                value={passwords.actual}
                onChange={handlePasswordChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nueva Contraseña</label>
              <input
                type="password"
                name="nueva"
                value={passwords.nueva}
                onChange={handlePasswordChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                name="confirmar"
                value={passwords.confirmar}
                onChange={handlePasswordChange}
                className="form-input"
                required
              />
            </div>
            <button type="submit" className="action-button">Actualizar Contraseña</button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;
