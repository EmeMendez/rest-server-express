const express = require('express');
const cors = require('cors');
const { port, mongoUri } = require('../config/app');
const { mongoConnection } = require('../config/database');

class Server {

    constructor(){
        this.app = express();
        this.port = port;
        this.databaseConnect(mongoUri);
        this.middlewares();
        this.routes();
        this.listen();
    }

    routes(){
        this.app.use('/api/users', require('../routes/users.router'));
    }

    middlewares(){
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }

    async databaseConnect(mongoUri){
        await mongoConnection(mongoUri);
    }
}

module.exports = Server