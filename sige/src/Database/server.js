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

// Llamar todas las encuestas
app.get('/encuestas', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .query('SELECT nombre, descripcion, fecha_fin, cantidad_preguntas FROM Encuestas');

    res.json({
      message: 'Encuestas obtenidas correctamente',
      encuestas: result.recordset,
    });
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



/** 📌 GET - Obtener perfil de usuario */
app.get("/get-perfil/:matricula", async (req, res) => {
  const { matricula } = req.params;
  try {
    const pool = await connectToDatabase();

    // Realizar INNER JOIN entre Usuarios y Portal_Personal usando usuario_id
    const result = await pool.request()
      .input("matricula", sql.NVarChar, matricula)
      .query(`
        SELECT u.nombre, pp.direccion, pp.telefono_casa, pp.telefono_celular, pp.correo_personal, pp.correo_institucional
        FROM Portal_Personal pp
        INNER JOIN Usuarios u ON pp.usuario_id = u.usuario_id
        WHERE u.matricula = @matricula
      `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolver los datos del perfil
    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});


app.put("/update-perfil", async (req, res) => {
  const { matricula, direccion, telefonoCasa, telefonoCelular, correoPersonal, correoInstitucional } = req.body;

  // Verificar que todos los campos requeridos están presentes
  if (!matricula || !direccion || !telefonoCasa || !telefonoCelular || !correoPersonal || !correoInstitucional) {
    return res.status(400).json({ message: "Todos los campos son obligatorios." });
  }

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input("matricula", sql.NVarChar, matricula)
      .input("direccion", sql.NVarChar, direccion)
      .input("telefonoCasa", sql.NVarChar, telefonoCasa)
      .input("telefonoCelular", sql.NVarChar, telefonoCelular)
      .input("correoPersonal", sql.NVarChar, correoPersonal)
      .input("correoInstitucional", sql.NVarChar, correoInstitucional)
      .query(`
        UPDATE Portal_Personal 
        SET direccion = @direccion, 
            telefono_casa = @telefonoCasa, 
            telefono_celular = @telefonoCelular, 
            correo_personal = @correoPersonal, 
            correo_institucional = @correoInstitucional
        FROM Portal_Personal pp
        INNER JOIN usuarios u ON pp.usuario_id = u.usuario_id  -- Aquí la relación entre tablas
        WHERE u.matricula = @matricula
      `);

    // Comprobar si se afectaron filas
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "No se encontró el usuario con la matrícula proporcionada." });
    }

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
});


/** 📌 POST - Cambiar contraseña */
app.post("/update-password", async (req, res) => {
  const { matricula, actual, nueva } = req.body;

  try {
    const pool = await connectToDatabase();

    // Verificar si el usuario existe
    const userResult = await pool.request()
      .input("matricula", sql.NVarChar, matricula)
      .query("SELECT contraseña FROM Usuarios WHERE matricula = @matricula");

    if (userResult.recordset.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const contrasenaActualDB = userResult.recordset[0].contraseña;

    // Verificar si la contraseña actual es correcta utilizando bcrypt
    const isMatch = await bcrypt.compare(actual, contrasenaActualDB);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña actual incorrecta" });
    }

    // Encriptar la nueva contraseña antes de actualizarla
    const nuevaContrasenaEncriptada = await bcrypt.hash(nueva, 10);

    // Actualizar la nueva contraseña
    await pool.request()
      .input("matricula", sql.NVarChar, matricula)
      .input("nueva", sql.NVarChar, nuevaContrasenaEncriptada)
      .query("UPDATE Usuarios SET contraseña = @nueva WHERE matricula = @matricula");

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
});


// /*** TABLAS DE CALIFICACIONES */
// app.get('/alumnos', async (req, res) => {
//   try {
//     const pool = await connectToDatabase();
//     const result = await pool.request().query('SELECT * FROM Alumnos');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error al obtener los alumnos:', error);
//     res.status(500).json({ message: 'Error al obtener los alumnos', error });
//   } finally {
//     sql.close();
//   }
// });

// app.get('/grupos', async (req, res) => {
//   try {
//     const pool = await connectToDatabase();
//     const result = await pool.request().query('SELECT * FROM Grupos');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error al obtener los grupos:', error);
//     res.status(500).json({ message: 'Error al obtener los grupos', error });
//   } finally {
//     sql.close();
//   }
// });

// /**
//  * Obtener todos los maestros
//  */
// app.get('/maestros', async (req, res) => {
//   try {
//     const pool = await connectToDatabase();
//     const result = await pool.request().query('SELECT * FROM Maestros');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error al obtener los maestros:', error);
//     res.status(500).json({ message: 'Error al obtener los maestros', error });
//   } finally {
//     sql.close();
//   }
// });

// /**
//  * Obtener todas las calificaciones
//  */
// app.get('/calificaciones', async (req, res) => {
//   try {
//     const pool = await connectToDatabase();
//     const result = await pool.request().query('SELECT * FROM Calificaciones');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Error al obtener las calificaciones:', error);
//     res.status(500).json({ message: 'Error al obtener las calificaciones', error });
//   } finally {
//     sql.close();
//   }
// });

/**
 * Endpoint para obtener las calificaciones del alumno
 */
app.get('/materias', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query('SELECT * FROM Materias');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las materias:', error);
    res.status(500).json({ message: 'Error al obtener las materias', error });
  } finally {
    sql.close();
  }
});

app.get('/calificaciones/:matricula', async (req, res) => {
  const { matricula } = req.params;

  try {
    const pool = await connectToDatabase();

    const query = `
      SELECT 
        U.matricula,
        A.alumno_id,
        U.nombre,
        C.calificacion_id,
        C.unidad,
        C.calificacion,
        C.fecha,
        C.calificacion_remedial,
        C.calificacion_extraordinario,
        C.accion,
        C.asistencias,
        M.materia_id,
        M.nombre AS materia_nombre,
        G.grupo_id,
        G.nombre_grupo,
        MA.maestro_id,
        MA.nombre AS maestro_nombre
      FROM Usuarios U
      INNER JOIN Alumnos A ON U.usuario_id = A.usuario_id
      INNER JOIN Calificaciones C ON A.alumno_id = C.alumno_id
      INNER JOIN Materias M ON C.materia_id = M.materia_id
      INNER JOIN Grupos G ON A.grupo_id = G.grupo_id
      INNER JOIN Maestros MA ON G.maestro_id = MA.maestro_id
      WHERE U.matricula = @matricula
    `;

    const result = await pool.request()
      .input('matricula', sql.NVarChar, matricula)
      .query(query);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No se encontraron calificaciones para la matrícula proporcionada.' });
    }

    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    res.status(500).json({ message: 'Error al obtener las calificaciones', error });
  } finally {
    sql.close();
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});




