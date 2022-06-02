const mongoose = require('mongoose')
require('dotenv').config({ path: 'variable.env'});

const conectarDB = async () => {
    try {
        console.log(process.env.DB_MONGO);
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('BD Conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDB