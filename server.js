const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const app = express();
const postgres = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'wael1996',
      database : 'smart-brain'
    }
});


// parse from json to js object.
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    postgres.select('*').from('users')
    .then(users => res.json(users))
});

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, postgres)});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, postgres, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, postgres) });

app.put('/image', (req, res) => { image.handleImage(req, res, postgres) });

app.listen(5000, () => {
    console.log('I hear you on port 5000!');
});