import { db } from "./pool.js";

export async function getAllSociedades() {
  const res = await db.query("SELECT nombre FROM sociedades");
  return res.rows;
}

