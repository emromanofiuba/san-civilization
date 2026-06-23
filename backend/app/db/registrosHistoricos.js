import { db } from "./pool.js";

export async function getAllRegistrosHistoricos() {
  const res = await db.query("SELECT *, (select nombre from sociedades s where s.id = sociedad_id) as sociedad, (select nombre from grupos_etarios ge where ge.id = grupo_etario_id) as grupo_etario FROM registros_historicos ORDER BY sociedad_id, anio, grupo_etario_id");
  return res.rows;
}

export async function getOneRegistroHistorico(id) {
  const res = await db.query("SELECT *, (select nombre from sociedades s where s.id = sociedad_id) as sociedad, (select nombre from grupos_etarios ge where ge.id = grupo_etario_id) as grupo_etario FROM registros_historicos WHERE id = $1 limit 1", [id]);
  return res.rows[0];
}

export async function createRegistroHistorico(sociedad, grupoEtario, cantidad, anio) {
  const res = await db.query(
    "INSERT INTO registros_historicos (sociedad_id, grupo_etario_id, cantidad, anio) VALUES ($1, $2, $3, $4)",
    [sociedad, grupoEtario, cantidad, anio],
  );

  return res.rowCount == 1;
}

// Crea un registro historico en cantidad 0 para cada grupo etario de la sociedad, en el anio de inicio elegido
export async function iniciarSociedad(sociedad, anio) {
  const res = await db.query(
    "INSERT INTO registros_historicos (sociedad_id, grupo_etario_id, cantidad, anio) SELECT sociedad_id, id, 0, $2 FROM grupos_etarios WHERE sociedad_id = $1",
    [sociedad, anio],
  );

  return res.rowCount > 0;
}
