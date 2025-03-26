// Notifications.js
import React from 'react';
import './notificaciones.css'; // Si tienes estilos personalizados para el componente de notificaciones

function Notifications() {
  return (
    <div className="notifications-container">
      <h3>Notificaciones</h3>
      <ul>
        <li>Notificación 1</li>
        <li>Notificación 2</li>
        <li>Notificación 3</li>
        {/* Puedes agregar más notificaciones aquí */}
      </ul>
    </div>
  );
}

export default Notifications;
