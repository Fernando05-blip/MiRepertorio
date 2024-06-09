const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    database: 'repertorio',
    user: 'postgres',
    password: 'Chamuco05',
    allowExitOnIdle: 'true'
});

const insertar = async (datos) => {
  const consulta = {
    text: 'INSERT INTO repertorio (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *',
    values: datos,
  };
  const res = await pool.query(consulta);
  return res.rows[0];
};

const consultar = async () => {
  const res = await pool.query('SELECT * FROM repertorio');
  return res.rows;
};

const editar = async ({ datos, id }) => {
  const consulta = {
    text: 'UPDATE repertorio SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *',
    values: [...datos, id],
  };
  const res = await pool.query(consulta);
  return res.rows[0];
};

const eliminar = async (id) => {
  const consulta = {
    text: 'DELETE FROM repertorio WHERE id = $1 RETURNING *',
    values: [id],
  };
  const res = await pool.query(consulta);
  return res.rows[0];
};

module.exports = { insertar, consultar, editar, eliminar };
