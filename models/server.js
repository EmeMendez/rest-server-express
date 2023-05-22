const express = require('express');
const cors = require('cors');
const { port, mongoUri } = require('../config/app');
const { mongoConnection } = require('../config/database');
const fileUpload = require('express-fileupload');
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
        this.app.use('/api/auth', require('../routes/auth.router'));
        this.app.use('/api/categories', require('../routes/categories.router'));
        this.app.use('/api/products', require('../routes/products.router'));
    }

    middlewares(){
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.static('public'));
        this.app.use('storage', express.static('storage'));
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
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