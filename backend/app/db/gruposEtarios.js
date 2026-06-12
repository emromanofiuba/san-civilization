import { db } from "./pool.js";

export async function getAllGruposEtarios() {
  const res = await db.query("SELECT nombre FROM grupos_etarios");
  return res.rows;
}

