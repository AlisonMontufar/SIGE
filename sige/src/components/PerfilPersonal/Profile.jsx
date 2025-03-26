import { useState, useEffect } from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "../PerfilPersonal/ProfileStyle.css"; // Archivo de estilos

const API_URL = "http://localhost:5000"; // Reemplázalo con la URL real del backend

const Profile = () => {
  const [formData, setFormData] = useState({
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

  // Obtener datos del usuario (simulación con matrícula fija, reemplázala con la correcta)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/get-perfil/22300435`);
        if (!response.ok) throw new Error("Error al obtener el perfil");
        const data = await response.json();
        setFormData({
          direccion: data.direccion,
          telefonoCasa: data.telefono_casa,
          telefonoCelular: data.telefono_celular,
          correoPersonal: data.correo_personal,
          correoInstitucional: data.correo_institucional,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
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
        body: JSON.stringify({ ...formData, matricula: "22300435" }),
      });
      if (!response.ok) throw new Error("Error al actualizar el perfil");
      alert("Datos actualizados correctamente");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al actualizar los datos.");
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
          matricula: "22300435",
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
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">👤</div>
          <h2 className="profile-name">EMMANUEL CALVA OCAMPO</h2>
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
              <label className="form-label">{field.replace(/([A-Z])/g, " $1")}</label>
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
  );
};

export default Profile;
