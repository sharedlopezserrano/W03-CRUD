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
 *       404:
 *         description: Movie not found
 */
router.get("/:id", [check("id").isMongoId()], moviesController.getSingle);


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
 *       422:
 *         description: Validation error
 */
router.post(
  "/",
  [
    check("title").notEmpty(),
    check("year").isInt(),
    check("rating").isFloat({ min: 0, max: 10 }),
    check("genre").notEmpty(),
    check("pg").isBoolean()
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
 *     responses:
 *       204:
 *         description: Movie updated
 *       404:
 *         description: Movie not found
 */
router.put(
  "/:id",
  [
    check("id").isMongoId(),
    check("title").notEmpty(),
    check("year").isInt(),
    check("rating").isFloat({ min: 0, max: 10 }),
    check("genre").notEmpty(),
    check("pg").isBoolean()
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
 *       404:
 *         description: Movie not found
 */
router.delete("/:id", [check("id").isMongoId()], moviesController.deleteMovie);

module.exports = router;