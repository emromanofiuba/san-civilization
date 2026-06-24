import express from "express";
import cors from "cors";

import { endpointsSociedades } from "./api/sociedades.js";
import { endpointsEventos } from "./api/eventos.js";
import { endpointsGruposEtarios } from "./api/gruposEtarios.js";
import { endpointsRegistrosHistoricos } from "./api/registrosHistoricos.js";
import { endpointsSimulacion } from "./api/simulacion.js";


const app = express();

const corsOptions = {
  origin: '*', // Replace with your domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 

const port = 8000;

app.use(express.json());

app.use("/api/v1/sociedades", endpointsSociedades);
app.use("/api/v1/eventos", endpointsEventos);
app.use("/api/v1/grupos-etarios", endpointsGruposEtarios);
app.use("/api/v1/registros-historicos", endpointsRegistrosHistoricos);
app.use("/api/v1/simular", endpointsSimulacion);

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, () => {
  console.log(`SanCivilizationAPI listening on port ${port}`);
});
