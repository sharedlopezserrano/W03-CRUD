const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
    try {
        const results = await mongodb.getDatabase().collection("movies").find().toArray();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const id = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().collection("movies").findOne({ _id: id });

        if (!result) return res.status(404).json({ message: "Movie not found" });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const movie = {
            title: req.body.title,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            pg: req.body.pg
        };

        const response = await mongodb.getDatabase().collection("movies").insertOne(movie);

        res.status(201).json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const id = new ObjectId(req.params.id);

        const movie = {
            title: req.body.title,
            year: req.body.year,
            rating: req.body.rating,
            genre: req.body.genre,
            pg: req.body.pg
        };

        const response = await mongodb.getDatabase().collection("movies").replaceOne({ _id: id }, movie);

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
        const id = new ObjectId(req.params.id);

        const response = await mongodb.getDatabase().collection("movies").deleteOne({ _id: id });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Movie not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createMovie,
    updateMovie,
    deleteMovie
};