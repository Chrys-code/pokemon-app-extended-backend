import express from 'express';
import { getPokedex, addToPokedex, removeFromPokedex } from '../../controller/pokedex/pokedex.controller';
import verifyToken from "../../middleware/auth.middleware";

const router = express.Router();

router.get("/list", verifyToken, getPokedex);
router.post("/catch", verifyToken, addToPokedex);
router.post("/release", verifyToken, removeFromPokedex);

export default router;