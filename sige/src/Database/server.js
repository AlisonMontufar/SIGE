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

// Llamar preguntas de una encuesta por nombre
app.get('/encuesta/:nombre/preguntas', async (req, res) => {
  const nombreEncuesta = req.params.nombre;
  console.log('Nombre de la encuesta recibido:', nombreEncuesta); // Verifica que se reciba el nombre correctamente

  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('nombreEncuesta', sql.NVarChar, nombreEncuesta)
      .query(`
        SELECT 
          pe.pregunta_id, 
          pe.pregunta, 
          pe.tipo_pregunta
        FROM 
          [dbo].[Preguntas_Encuesta] pe
        INNER JOIN 
          [dbo].[Encuestas] e ON pe.encuesta_id = e.encuesta_id
        WHERE 
          UPPER(e.nombre) = UPPER(@nombreEncuesta)
      `);

    console.log('Resultado de la consulta:', result.recordset); // Verifica lo que devuelve la consulta

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron preguntas para esta encuesta',
      });
    }

    res.json({
      message: 'Preguntas obtenidas correctamente',
      preguntas: result.recordset,
    });
  } catch (error) {
    console.error('Error al obtener las preguntas:', error);
    res.status(500).json({ message: 'Error al obtener las preguntas', error });
  } finally {
    sql.close();
  }
});

// Llamar todas las actividades extracurriculares
app.get('/actividadesExtra', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .query('SELECT actividad_id, nombre_actividad, descripcion, fecha FROM Actividades_Extracurriculares');

    res.json({
      message: 'Actividades extracurriculares obtenidas correctamente',
      actividades: result.recordset,
    });
  } catch (error) {
    console.error('Error al obtener las actividades extracurriculares:', error);
    res.status(500).json({ message: 'Error al obtener las actividades extracurriculares', error });
  } finally {
    sql.close();
  }
});

// Informacion de lasactividades extracurriculares
app.get('/actividadesExtra/:actividad_id', async (req, res) => {
  const actividadId = req.params.actividad_id;  // Obtener el id de la actividad de los parámetros de la URL
  
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('actividad_id', sql.Int, actividadId)  // Pasar el parámetro de actividad_id de manera segura
      .query(`
        SELECT  
            i.info_id,
            i.actividad_id,
            i.descripcion,
            i.premios,
            i.fecha
        FROM 
            info_ActiExtra i
        INNER JOIN 
            Actividades_Extracurriculares a
        ON i.actividad_id = a.actividad_id
        WHERE 
            a.actividad_id = @actividad_id
      `);

    res.json({
      message: 'Información de actividad extracurricular obtenida correctamente',
      actividadesExtra: result.recordset,
    });
  } catch (error) {
    console.error('Error al obtener la información de actividades extracurriculares:', error);
    res.status(500).json({ message: 'Error al obtener la información de actividades extracurriculares', error });
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

// Actualizar Perfil 
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




