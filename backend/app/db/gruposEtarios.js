import { db } from "./pool.js";

export async function getAllGruposEtarios() {
  const res = await db.query("SELECT nombre FROM grupos_etarios");
  return res.rows;
}

export async function getOneGrupoEtario(id) {
  const res = await db.query("SELECT * FROM grupos_etarios WHERE id = $1", [id]);
  return res.rows;
}
