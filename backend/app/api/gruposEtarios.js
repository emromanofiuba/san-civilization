import { Router } from "express";
import { getAllGruposEtarios, getOneGrupoEtario } from "../db/gruposEtarios.js";

export const endpointsGruposEtarios = Router();

endpointsGruposEtarios.get("/", async (req, res) => {
    const gruposEtarios = await getAllGruposEtarios();
    res.json(gruposEtarios);
});

endpointsGruposEtarios.get("/:id", async (req, res) => {
    let id = req.params.id;

    const grupoEtario = await getOneGrupoEtario(id);

    if (grupoEtario === undefined) {
        res.sendStatus(404);
        return;
    }

    res.json(grupoEtario);
});
