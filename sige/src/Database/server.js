const express = require('express');
const cors = require('cors');
const { connectToDatabase, sql } = require('./db'); // Importar conexión a la base de datos
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

// Configuración de CORS
app.use(cors());

// Permitir manejo de JSON en las solicitudes
app.use(express.json());


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
  
      // Comparar la contraseña encriptada
      const isMatch = await bcrypt.compare(contraseña, user.contraseña);
      if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
      }
  
      // Enviar respuesta si la autenticación es exitosa
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



  app.post('/insert-encuesta', async (req, res) => {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
  
    try {
      // Conectar a la base de datos
      const pool = await connectToDatabase();
      
      // Insertar los datos en la tabla Encuestas
      const result = await pool.request()
        .input('nombre', sql.NVarChar, nombre)
        .input('fecha_inicio', sql.DateTime, fecha_inicio)
        .input('fecha_fin', sql.DateTime, fecha_fin)
        .query(`
          INSERT INTO [dbo].[Encuestas] ([nombre], [fecha_inicio], [fecha_fin])
          VALUES (@nombre, @fecha_inicio, @fecha_fin);
        `);
  
      res.status(201).json({
        message: 'Encuesta insertada correctamente',
        encuesta: { nombre, fecha_inicio, fecha_fin }
      });
    } catch (error) {
      console.error('Error al insertar la encuesta:', error);
      res.status(500).json({ message: 'Error al insertar la encuesta', error });
    } finally {
      sql.close();
    }
  });
  app.post('/insert-pregunta', async (req, res) => {
    const { encuesta_id, pregunta } = req.body;
  
    try {
      // Conectar a la base de datos
      const pool = await connectToDatabase();
      
      // Insertar los datos en la tabla Preguntas_Encuesta
      const result = await pool.request()
        .input('encuesta_id', sql.Int, encuesta_id)
        .input('pregunta', sql.NVarChar, pregunta)
        .query(`
          INSERT INTO [dbo].[Preguntas_Encuesta] ([encuesta_id], [pregunta])
          VALUES (@encuesta_id, @pregunta);
        `);
  
      res.status(201).json({
        message: 'Pregunta insertada correctamente',
        pregunta: { encuesta_id, pregunta }
      });
    } catch (error) {
      console.error('Error al insertar la pregunta:', error);
      res.status(500).json({ message: 'Error al insertar la pregunta', error });
    } finally {
      sql.close();
    }
  });

  app.post('/insert-respuesta', async (req, res) => {
    const { encuesta_id, usuario_id, pregunta_id, respuesta } = req.body;
  
    try {
      // Conectar a la base de datos
      const pool = await connectToDatabase();
      
      // Insertar los datos en la tabla Respuestas_Encuesta
      const result = await pool.request()
        .input('encuesta_id', sql.Int, encuesta_id)
        .input('usuario_id', sql.Int, usuario_id)
        .input('pregunta_id', sql.Int, pregunta_id)
        .input('respuesta', sql.NVarChar, respuesta)
        .query(`
          INSERT INTO [dbo].[Respuestas_Encuesta] ([encuesta_id], [usuario_id], [pregunta_id], [respuesta])
          VALUES (@encuesta_id, @usuario_id, @pregunta_id, @respuesta);
        `);
  
      res.status(201).json({
        message: 'Respuesta insertada correctamente',
        respuesta: { encuesta_id, usuario_id, pregunta_id, respuesta }
      });
    } catch (error) {
      console.error('Error al insertar la respuesta:', error);
      res.status(500).json({ message: 'Error al insertar la respuesta', error });
    } finally {
      sql.close();
    }
  });
  app.get('/get-encuestas', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT TOP (1000) [encuesta_id], [nombre], [fecha_inicio], [fecha_fin] FROM [dbo].[Encuestas]');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las encuestas:', error);
    res.status(500).json({ message: 'Error al obtener las encuestas', error });
  } finally {
    sql.close();
  }
});
app.get('/get-preguntas/:encuesta_id', async (req, res) => {
  const { encuesta_id } = req.params;
  
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('encuesta_id', sql.Int, encuesta_id)
      .query('SELECT TOP (1000) [pregunta_id], [encuesta_id], [pregunta] FROM [dbo].[Preguntas_Encuesta] WHERE [encuesta_id] = @encuesta_id');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las preguntas:', error);
    res.status(500).json({ message: 'Error al obtener las preguntas', error });
  } finally {
    sql.close();
  }
});
app.get('/get-respuestas/:encuesta_id', async (req, res) => {
  const { encuesta_id } = req.params;

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('encuesta_id', sql.Int, encuesta_id)
      .query('SELECT TOP (1000) [respuesta_id], [encuesta_id], [usuario_id], [pregunta_id], [respuesta] FROM [dbo].[Respuestas_Encuesta] WHERE [encuesta_id] = @encuesta_id');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las respuestas:', error);
    res.status(500).json({ message: 'Error al obtener las respuestas', error });
  } finally {
    sql.close();
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



