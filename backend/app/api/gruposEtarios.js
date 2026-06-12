import { Router } from "express";
import { getAllGruposEtarios } from "../db/gruposEtarios.js";

export const endpointsGruposEtarios = Router();

endpointsGruposEtarios.get("/", async (req, res) => {
    const gruposEtarios = await getAllGruposEtarios();
    res.json(gruposEtarios);
});
