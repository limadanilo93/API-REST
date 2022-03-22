const express = require('express');
const consign = require('consign');
const myParser = require('body-parser');
module.exports = () => {
    const app = express();
    app.use(myParser.urlencoded({extended: true}));
    app.use(myParser.json());
    consign()
        .include('controllers')
        .into(app)
    return app;
}
