const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");


const getAll = async (req, res) => {
    try {
        const results = await mongodb.getDatabase().collection("games").find().toArray();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: "Error getting games", error: err.message });
    }
};

const getSingle = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const gameId = new ObjectId(req.params.id);

        const result = await mongodb.getDatabase().collection("games").findOne({ _id: gameId });

        if (!result) {
            return res.status(404).json({ message: "Game not found" });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error getting game", error: err.message });
    }
};

const createGame = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const game = {
            game: req.body.game,
            yearreleased: req.body.yearreleased,
            rating: req.body.rating,
            console: req.body.console,
            pg: req.body.pg
        };

        const response = await mongodb.getDatabase().collection("games").insertOne(game);

        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: "Error creating game" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const deleteGame = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const gameId = new ObjectId(req.params.id);

        const response = await mongodb.getDatabase().collection("games").deleteOne({ _id: gameId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Game not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting game", error: err.message });
    }
};


const updateGame = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const gameId = new ObjectId(req.params.id);

        const game = {
            game: req.body.game,
            yearreleased: req.body.yearreleased,
            rating: req.body.rating,
            console: req.body.console,
            pg: req.body.pg
        };

        const response = await mongodb.getDatabase().collection("games").replaceOne(
            { _id: gameId },
            game
        );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Game not found or no changes made" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating game", error: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createGame,
    deleteGame,
    updateGame
};