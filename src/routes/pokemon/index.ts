import express from 'express';
import { getPokemons } from '../../controller/pokemon/pokemon.controller';

const router = express.Router();

router.get("/", getPokemons);

export default router;