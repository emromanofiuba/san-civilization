import { db } from "./pool.js";

export async function getAllEventos() {
  const res = await db.query("SELECT nombre FROM eventos");
  return res.rows;
}

