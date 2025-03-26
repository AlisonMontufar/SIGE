import React, { useState, useEffect } from 'react';
import NavigationMenu from './menu';
import { FiBell } from 'react-icons/fi'; // Icono de campana
import Notifications from '../Notificaciones/notificaciones'; // Importar el componente de notificaciones
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
  const [showNotifications, setShowNotifications] = useState(false); // Estado para controlar la visibilidad de las notificaciones

  useEffect(() => {
    const loadFacebookSDK = () => {
      if (window.FB) return;
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0';
      script.async = true;
      script.onload = () => window.FB.XFBML.parse();
      document.body.appendChild(script);
    };

    loadFacebookSDK();
  }, []);

  // Función para mostrar o esconder las notificaciones
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="App">
      <NavigationMenu />

      <div className="Titulo-bienvenida">
        <h1>Bienvenido</h1>
        <h3>Gracias por formar parte de nuestra institución</h3>
      </div>

      <div className="container">
        <div className="card-noticias">
          <div className="facebook-page">
            <div
              className="fb-page"
              data-href="https://www.facebook.com/UTTTMx"
              data-tabs="timeline"
              data-width="400"
              data-height="450"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            ></div>
          </div>
        </div>
      </div>


      <div className="notification-menu" onClick={toggleNotifications}>
        <FiBell size={30} color="#000" />
      </div>


      {showNotifications && <Notifications />}

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
