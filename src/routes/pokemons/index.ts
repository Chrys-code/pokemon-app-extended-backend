const express = require("express");
const router = express.Router();

const { releasePokemon, catchPokemon, listPokemons } = require("../../controller/pokemons.controller");

// const { collectionSchemaValidator } = require("../../middleware/validator.middleware");
// const verifyToken = require("../../middleware/auth.middleware");

router.post("/release", releasePokemon);
router.post("/catch", catchPokemon);
router.get("/list/:id", listPokemons);

module.exports = router;