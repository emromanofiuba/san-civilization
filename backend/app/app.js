import express from "express";
import { endpointsSociedades } from "./api/sociedades.js";
import { endpointsEventos } from "./api/eventos.js";
import { endpointsGruposEtarios } from "./api/gruposEtarios.js";
import { endpointsRegistrosHistoricos } from "./api/registrosHistoricos.js";

const app = express();
const port = 8000;

app.use(express.json());

app.use("/api/v1/sociedades", endpointsSociedades);
app.use("/api/v1/eventos", endpointsEventos);
app.use("/api/v1/grupos-etarios", endpointsGruposEtarios);
app.use("/api/v1/registros-historicos", endpointsRegistrosHistoricos);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`SanCivilizationAPI listening on port ${port}`);
});
