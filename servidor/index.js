const express = require('express');
const bodyParser = require('body-parser');
const conectarDB = require('./config/db');
const cors = require('cors');
const multer = require('multer')
const path = require("path");
const { param } = require('./routes/producto');
const app = express();
const { unlink } = require("fs-extra");
const mysql = require('mysql');
const myconn = require('express-myconnection');

//mongo ATLAS
//conectarDB();

//Mysql
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'usbw',
    database: 'daw_15'
}

app.use(cors());
app.use(myconn(mysql, dbOptions, 'single'));
app.use(express.json());

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './image')
    },
    filename: function(req, file, cb) { 
        cb(null, Math.ceil(Date.now()/1000)+'-'+file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api/productos', require('./routes/producto'));
app.post('/api/subir', upload.single('imagen'), (req, res) => {
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
});

app.get("/api/img/:name", (req, res) => {
    res.sendFile(path.join(__dirname, "./image/"+req.params.name));
});

app.delete("/api/img/:name", async (req, res) => {
    try {
        await unlink(path.resolve("./image/"+req.params.name))
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error ede actualizacion');
    }
});

app.listen(4000, () => {
    console.log('El servidor esta corriendo')
})