const sql = require('mssql');


const config = {
  user: 'javierhernandez_SampleDB',
  password: 'admin123',
  server: 'sql.bsite.net\\MSSQL2016',
  database: 'javierhernandez_SampleDB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Conexión a la base de datos exitosa.');
    return pool;
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  sql,
};
