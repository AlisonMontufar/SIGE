const express = require('express');
const cors = require('cors');
const { connectToDatabase, sql } = require('./db'); // Importar conexión a la base de datos
const app = express();
const port = 5000;

// Configuración de CORS
app.use(cors());

// Permitir manejo de JSON en las solicitudes
app.use(express.json());

// Ruta para obtener los roles desde la base de datos
app.get('/get-roles', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM Roles');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ message: 'Error al obtener los roles', error });
  } finally {
    sql.close();
  }
});

// Ruta para autenticar a un usuario
app.post('/login', async (req, res) => {
  const { matricula, contraseña } = req.body;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('matricula', sql.NVarChar, matricula)
      .query('SELECT * FROM Usuarios WHERE matricula = @matricula');

    // Verificar si el usuario existe
    if (result.recordset.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const user = result.recordset[0];

    if (contraseña !== user.contraseña) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    res.json({
      message: 'Autenticación exitosa',
      user: {
        id: user.usuario_id,
        nombre: user.nombre,
        rol_id: user.rol_id,
      },
    });
  } catch (error) {
    console.error('Error en el proceso de autenticación:', error);
    res.status(500).json({ message: 'Error en el proceso de autenticación', error });
  } finally {
    sql.close();
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
