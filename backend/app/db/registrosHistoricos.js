import { db } from "./pool.js";

export async function getAllRegistrosHistoricos() {
  const res = await db.query("SELECT * FROM registros_historicos");
  return res.rows;
}

