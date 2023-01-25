const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

class App {
    constructor(options = {port: 0}){
        this._port = options.port
    }

    runApp = (routes = []) => {
        app.use(express.json({extended: true}))
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cors())
        routes.map(route => {
            app.use(route.path, route.object)
        })
        app.listen(this._port, () => console.log("Listening on port " + this._port))
    }

    getApp = () => {
        return app
    }
}

module.exports = App
