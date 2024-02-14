import express from 'express';
import { releasePokemon, catchPokemon, listPokemons } from '../../controller/pokemon.controller';
import verifyToken from "../../middleware/auth.middleware";

const router = express.Router();

router.post("/release", verifyToken, releasePokemon);
router.post("/catch", verifyToken, catchPokemon);
router.get("/list", verifyToken, listPokemons);

export default router;