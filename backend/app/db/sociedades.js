import { db } from "./pool.js";

export async function getAllSociedades() {
  const res = await db.query("SELECT * FROM sociedades");
  return res.rows;
}

export async function getOneSociedad(id) {
  const res = await db.query("SELECT * FROM sociedades WHERE id = $1", [id]);
  return res.rows;
}
