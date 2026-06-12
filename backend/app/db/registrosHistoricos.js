import { db } from "./pool.js";

export async function getAllRegistrosHistoricos() {
  const res = await db.query("SELECT * FROM registros_historicos");
  return res.rows;
}

export async function getOneRegistroHistorico(id) {
  const res = await db.query("SELECT * FROM registros_historicos WHERE id = $1", [id]);
  return res.rows;
}

export async function createRegistroHistorico(sociedad, grupoEtario, cantidad, anio) {
  const res = await db.query(
    "INSERT INTO registros_historicos (sociedad_id, grupo_etario_id, cantidad, anio) VALUES ($1, $2, $3, $4)",
    [sociedad, grupoEtario, cantidad, anio],
  );

  return res.rowCount == 1;
}
