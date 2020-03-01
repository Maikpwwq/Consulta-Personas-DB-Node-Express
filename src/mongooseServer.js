//  Consultar datos de las personas en la base de datos
const { getSecret } = require('../config');
const mongoose = require('mongoose');

// DB cargue de la data
const MongoClient = require('mongoose').MongoClient;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
//
client.connect(err => {
    const collection = client.db("test").collection("devices");
    var PersonasDB = mongoose.connection;
    // perform actions on the collection object
    client.close();
}).then(() => {
    console.log('Connected to mongoDB');
},
    (err) => console.log('Error connecting to mongoDB', err)
);

PersonasDB.on('error', (error) =>
    console.error(error)
)

PersonasDB.once('open', () =>
    console.log('conectado con Mongo database')
)

// Estructura Base de datos 
var PersonaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    cedula: {
        type: Number,
        required: true
    },
    edad: Number,
    genero: {
        type: String,
        required: true
    },
    ciudadResidencia: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var DataPersonas = mongoose.model('Persona', PersonaSchema);

// Mientras se accede a la DB
db.on('error', console.error.bind(console, "error en la conexion"));

// Una vez esta corriendo la DB
db.once('open', function () {
    console.log("ha accedido a PersonasDb correctamente...");

    DataPersonas.find().exec(function (error, res) {
        if (res.length === 0) {
            DataPersonas.create({ name: "Anderson" });
            DataPersonas.create({ name: "Daniela" });
            DataPersonas.create({ name: "Cristian" });
            DataPersonas.create({ name: "Lucy" });
            DataPersonas.create({ name: "David" });
        }
    });
});

// Consultar algun resgistro de Persona
exports.fetch = function (req, res) {
    console.log("Recuperando los datos de la persona....");    
    DataPersonas.find({ _id: PersonaId }, { multi: false }).exec(
        function (err, res) {
        if (err) {
            res.send(500, { error: err });
        }
        else {
            res.send(res);
        }
    });
};

// Adicionar un nuevo registro de Persona
exports.add = function (req, res) {
    var newPersona = {
        name: req.body.name,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        edad: req.body.edad,
        genero: req.body.genero,
        ciudadResidencia: req.body.ciudadResidencia,
        fechaNacimiento: req.body.fechaNacimiento,
    };
    DataPersonas.create(newPersona, function (addError, addedPersona) {
        if (addError) {
            res.send(500, { error: addError });
        }
        else {
            res.send({ success: true, Persona: addedPersona });
        }
    });
};

// Alterar algun registro de Personas
exports.modify = function (req, res) {
    var PersonaId = req.params.PersonaId;
    DataPersonas.update({ _id: PersonaId }, { multi: false },
        function (error, rowsAffected) {
            if (error) {
                res.send(500, { error: error });
            }
            else if (rowsAffected === 0) {
                res.send(500, { error: "No se afecto la informacion de la persona" });
            }
            else {
                res.send(200);
            }
        }
    );
};