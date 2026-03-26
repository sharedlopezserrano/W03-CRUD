require ('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

app.use (express.json());

app.use('/', require('./routes/index'));
app.use('/games', require('./routes/games'));
app.use('/api-docs', require('./routes/swagger'));

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else 
    {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});

