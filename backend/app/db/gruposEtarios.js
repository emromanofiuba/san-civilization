import { db } from "./pool.js";

export async function getAllGruposEtarios() {
  const res = await db.query("SELECT nombre FROM grupos_etarios");
  return res.rows;
}

export async function getOneGrupoEtario(id) {
  const res = await db.query("SELECT * FROM grupos_etarios WHERE id = $1", [id]);
  return res.rows;
}

export async function createGrupoEtario(nombre, sociedad, natalidadBase, mortalidadBase) {
  const res = await db.query(
    "INSERT INTO grupos_etarios (nombre, sociedad_id, natalidad_base, mortalidad_base) VALUES ($1, $2, $3, $4)",
    [nombre, sociedad, natalidadBase, mortalidadBase],
  );

  return res.rowCount == 1;
}
