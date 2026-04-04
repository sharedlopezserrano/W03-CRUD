require ('dotenv').config();
const express = require('express');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const { body } = require('express-validator');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app
   .use(bodyParser.json())
   .use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true ,
   }))
   .use(passport.initialize())
   .use(passport.session())
   .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        "Access-Control-Allow-Methods",
         "Origin, x-Requested-With, Content-Type, Z-key, Authorization"
        );
    res.setHeader("Access-Control-Allow-Headers",
         "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );

    next();
})
    .use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE']}))
    .use(cors({ origin: '*' }));

    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
    ));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});
 
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}!` : 'Logged out'); });

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }),
    (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});



app.use('/api-docs', require('./routes/swagger'))
app.use('/', require('./routes/index'));



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

