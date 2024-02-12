const express = require("express");
const router = express.Router();

const { releasePokemon, catchPokemon, listPokemons } = require("../../controller/pokemons.controller");

const verifyToken = require("../../middleware/auth.middleware");

router.post("/release", verifyToken, releasePokemon);
router.post("/catch", verifyToken, catchPokemon);
router.get("/list/:id", verifyToken, listPokemons);

module.exports = router;