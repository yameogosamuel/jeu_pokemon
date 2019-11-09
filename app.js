let express = require('express');
let mongoose = require('mongoose');
let nunjucks = require('nunjucks');
let bodyParser = require('body-parser');
let multer = require('multer');

require('./models/Pokemon');
require('./models/Type');

////////////////////////////////////////////////////////////// DB CONNECTION ////////////////////////////////////////////////////////////

//let uri = "mongodb+srv://raegarth:APqmWN23!@airsoftloadoutsmanager-sje1e.mongodb.net/pokedex?retryWrites=true";"mongodb://localhost:27017/pokedex"
let uri = "mongodb://localhost:27017/pokedex";

mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on('connected', success =>
{ // if connection to DB succeed
    console.log("connecté à la base de données MongoDB");
});

////////////////////////////////////////////////////////////// EXPRESS INIT //////////////////////////////////////////////////////////////

let app = express();

if (app.listen(8080))
console.log("connecté sur le port 8080");

////////////////////////////////////////////////////////////// NUNJUCKS CONFIG ///////////////////////////////////////////////////////////

nunjucks.configure('views',
{ // nunjucks settings
    autoescape: true,
    express: app
})

////////////////////////////////////////////////////////////// IMAGE UPLOAD HANDLING /////////////////////////////////////////////////////

let storage = multer.diskStorage(
{ // initializing multer diskStorage to be able to keep the file original name and extension
    destination: function (req, file, cb)
    {
        cb(null, __dirname + '/uploads');
    },
    filename: function (req, file, cb)
    {
        cb(null, file.originalname);
    }
});


let upload = multer({ storage: storage }); // see multer documentation

////////////////////////////////////////////////////////////// MIDDLEWARES ////////////////////////////////////////////////////////////

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(upload.single('file'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));
