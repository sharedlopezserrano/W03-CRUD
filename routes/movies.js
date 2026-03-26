const router = require("express").Router();
const { check } = require("express-validator");
const moviesController = require("../controllers/movies");

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 *       500:
 *         description: Server error
 */
router.get("/", moviesController.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a single movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A movie
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid ID")],
  moviesController.getSingle
);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               rating:
 *                 type: number
 *               genre:
 *                 type: string
 *               pg:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Movie created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/",
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("year").isInt().withMessage("Year must be a number"),
    check("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating must be 0-10"),
    check("genre").notEmpty().withMessage("Genre is required"),
    check("pg").isBoolean().withMessage("PG must be true or false")
  ],
  moviesController.createMovie
);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               year:
 *                 type: number
 *               rating:
 *                 type: number
 *               genre:
 *                 type: string
 *               pg:
 *                 type: boolean
 *     responses:
 *       204:
 *         description: Movie updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.put(
  "/:id",
  [
    check("id").isMongoId().withMessage("Invalid ID"),
    check("title").notEmpty().withMessage("Title is required"),
    check("year").isInt().withMessage("Year must be a number"),
    check("rating").isFloat({ min: 0, max: 10 }).withMessage("Rating must be 0-10"),
    check("genre").notEmpty().withMessage("Genre is required"),
    check("pg").isBoolean().withMessage("PG must be true or false")
  ],
  moviesController.updateMovie
);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Movie ID
 *     responses:
 *       204:
 *         description: Movie deleted
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
router.delete(
  "/:id",
  [check("id").isMongoId().withMessage("Invalid ID")],
  moviesController.deleteMovie
);

module.exports = router;