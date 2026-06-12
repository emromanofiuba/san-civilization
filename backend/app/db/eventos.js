import { db } from "./pool.js";

export async function getAllEventos() {
  const res = await db.query("SELECT * FROM eventos");
  return res.rows;
}

export async function getOneEvento(id) {
  const res = await db.query("SELECT * FROM eventos WHERE id = $1", [id]);
  return res.rows;
}

export async function createEvento(nombre, grupoEtario, anioDesde, anioHasta, natalidad, mortalidad) {
  const res = await db.query(
    "INSERT INTO eventos (nombre, grupo_etario_id, anio_desde, anio_hasta, natalidad, mortalidad) VALUES ($1, $2, $3, $4, $5, $6)",
    [nombre, grupoEtario, anioDesde, anioHasta, natalidad, mortalidad],
  );

  return res.rowCount == 1;
}
