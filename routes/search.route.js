const isRequired = require('../app/controllers/required');
const {abgaAPIsearchController} = require('../app/controllers/search');

const Router = require('express').Router();

Router.post('/search', abgaAPIsearchController , (req, res) => {
    res.json("Ready To Search")
});

module.exports = {searchRoute: Router}