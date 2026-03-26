const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
    try {
        const results = await mongodb.getDatabase().collection("movies").find().toArray();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Error getting movies", error: err.message });
    }
};

const getSingle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const id = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().collection("movies").findOne({ _id: id });

        if (!result) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error getting movie", error: err.message });
    }
};

const createMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }

    try {
        const movie = {
            title: req.body.title,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            pg: req.body.pg
        };

        if (req.body.title === "fail") {
            throw new Error("Forced server error");
        }

        const response = await mongodb.getDatabase().collection("movies").insertOne(movie);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: "Error creating movie" });
        }

    } catch (err) {
        res.status(500).json({ message: "Error creating movie", error: err.message });
    }
};

const updateMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const id = new ObjectId(req.params.id);

        const movie = {
            title: req.body.title,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            pg: req.body.pg
        };

        if (req.body.title === "fail") {
            throw new Error("Forced server error");
        }

        const response = await mongodb.getDatabase().collection("movies").replaceOne(
            { _id: id },
            movie
        );

        if (response.matchedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Movie not found" });
        }

    } catch (err) {
        res.status(500).json({ message: "Error updating movie", error: err.message });
    }
};

const deleteMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const id = new ObjectId(req.params.id);

        const response = await mongodb.getDatabase().collection("movies").deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Movie not found" });
        }

    } catch (err) {
        res.status(500).json({ message: "Error deleting movie", error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};