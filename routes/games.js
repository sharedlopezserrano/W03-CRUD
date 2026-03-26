const router = require("express").Router();
const { check } = require("express-validator");

const gamesController = require("../controllers/games");

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     responses:
 *       200:
 *         description: List of games
 */

router.get("/", gamesController.getAll);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a single game
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single game
 */

router.get(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid ID")],
  gamesController.getSingle
);

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               game:
 *                 type: string
 *               yearreleased:
 *                 type: number
 *               rating:
 *                 type: number
 *               console:
 *                 type: string
 *               pg:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Game created
 */

router.post(
  "/",
  [
    check("game").notEmpty().withMessage("Game is required"),
    check("yearreleased").isInt().withMessage("Year must be a number"),
    check("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating must be 0-10"),
    check("console").notEmpty().withMessage("Console is required"),
    check("pg").isBoolean().withMessage("PG must be true or false")
  ],
  gamesController.createGame
);

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Game updated
 */

router.put(
  "/:id",
  [
    check("id").isMongoId().withMessage("Invalid ID"),
    check("game").notEmpty(),
    check("yearreleased").isInt(),
    check("rating").isFloat({ min: 0, max: 10 }),
    check("console").notEmpty(),
    check("pg").isBoolean()
  ],
  gamesController.updateGame
);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Game deleted
 */

router.delete(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid ID")],
  gamesController.deleteGame
);

module.exports = router;