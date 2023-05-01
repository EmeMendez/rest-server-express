const mongoose = require('mongoose');

const mongoConnection = async (mongoUri) => {
    try {
        await mongoose.connect( mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database online');

    } catch (error) {
        console.error(error);
        throw new Error('Error trying to start database connection');
    }
}

module.exports = {
    mongoConnection
}