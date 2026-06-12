import { db } from "./pool.js";

export async function getAllRegistrosHistoricos() {
  const res = await db.query("SELECT * FROM registros_historicos");
  return res.rows;
}

export async function getOneRegistroHistorico(id) {
  const res = await db.query("SELECT * FROM registros_historicos WHERE id = $1", [id]);
  return res.rows;
}
