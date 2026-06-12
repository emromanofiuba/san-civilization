import { db } from "./pool.js";

export async function getAllEventos() {
  const res = await db.query("SELECT * FROM eventos");
  return res.rows;
}

export async function getOneEvento(id) {
  const res = await db.query("SELECT * FROM eventos WHERE id = $1", [id]);
  return res.rows;
}
