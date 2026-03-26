const mongodb = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const results = await mongodb.getDatabase().collection("games").find();
        results.toArray().then((users) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(users);
        });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection("games").find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(users);
    });
};

const createGame = async (req, res) => {
    const game = {
        game: req.body.game,
        yearreleased: req.body.yearreleased,
        rating: req.body.rating,
        console: req.body.console,
        pg: req.body.pg
    };

        const responst = await mongodb.getDatabase().collection("games").insertOne(game);

        if (responst.acknowledged) {
            res.status(201).send();
        } else {
            res.status(500).json(responst.error || "An error occurred while creating the game.");
        }
};


const deleteGame = async (req, res) => { 
    const gameId = new ObjectId(req.params.id);

    const response = await mongodb.getDatabase().collection("games").deleteOne({ _id: gameId });

    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while deleting the game.");
    }
};


const updateGame = async (req, res) => {
    const gameId = new ObjectId(req.params.id);

    const game = {
        game: req.body.game,
        yearreleased: req.body.yearreleased,
        rating: req.body.rating,
        console: req.body.console,
        pg: req.body.pg
    };

    const response = await mongodb.getDatabase().collection("games").replaceOne({ _id: gameId }, game);

    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "An error occurred while updating the game.");
    }

};

module.exports = {
    getAll,
    getSingle,
    createGame,
    deleteGame,
    updateGame
};