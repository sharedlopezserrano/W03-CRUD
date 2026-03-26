const express = require("express");
const router = express.Router();

const gamesController = require("../controllers/games");

router.get("/", gamesController.getAll);
router.get("/:id", gamesController.getSingle);
router.post("/", gamesController.createGame);
router.delete("/:id", gamesController.deleteGame);
router.put("/:id", gamesController.updateGame);

module.exports = router;