const router = require("express").Router();
const { check } = require("express-validator");

const gamesController = require("../controllers/games");

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get all games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: List of games
 *       500:
 *         description: Server error
 */
router.get("/", gamesController.getAll);

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a single game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single game
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Game not found
 *       500:
 *         description: Server error
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
 *     tags: [Games]
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
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
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
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Game ID
 *         schema:
 *           type: string
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
 *       204:
 *         description: Game updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Game not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  [
    check("id").isMongoId().withMessage("Invalid ID"),
    check("game").notEmpty().withMessage("Game is required"),
    check("yearreleased").isInt().withMessage("Year must be a number"),
    check("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating must be 0-10"),
    check("console").notEmpty().withMessage("Console is required"),
    check("pg").isBoolean().withMessage("PG must be true or false")
  ],
  gamesController.updateGame
);

/**
 * @swagger
 * /games/{id}:
 *   delete:
 *     summary: Delete a game
 *     tags: [Games]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Game deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Game not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid ID")],
  gamesController.deleteGame
);

module.exports = router;