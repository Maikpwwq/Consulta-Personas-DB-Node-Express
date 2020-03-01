var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/PersonasDb');
var db = mongoose.connection;

var PersonaSchema = mongoose.Schema({
    name: String,
    apellido: String,
    cedula: Number,
    edad: Number,
    genero: String,
    ciudadResidencia: String,
    fechaNacimiento: Date
});

var DataPersonas = mongoose.model('Persona', PersonaSchema);

db.on('error', console.error.bind(console, "error en la conexion"));
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

exports.fetch = function (req, res) {
    console.log("Recuperando los datos de la persona....");
    DataPersonas.find().exec(function (err, res) {
        if (err) {
            res.send(500, { error: err });
        }
        else {
            res.send(res);
        }
    });
};

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