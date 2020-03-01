require('dotenv').config();
// Generar el aplicativo
const express = require('express');
const app = express();
app.enable('trust proxy');
// CSS
import './styles/site.css';
//
import Consulta from './src/consultas/consulta';
import EnviarCorreo from './src/correos/enviarCorreo';
// const enviarCorreo = require('./src/correos/enviarCorreo');
// importar dependencies
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodeMailer = require('nodemailer');
const debug = require('debug')('email-sender:server');
const http = require('http');
// consultar post datos 
const rateLimit = require('express-rate-limit');
const logger = require('morgan');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    skipFailedRequests: true
});
// Usos integrados al aplicativo
app.set('view-engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(router);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static('src'));
app.use('/api/personas', usersRoute);
// Activar el Servidor 
const port = process.env.PORT || 3000; // 8081
const server = http.createServer(app);

app.listen(port, () => {
    // submit(e => { e.preventDefault();
    console.log(`Servidor activo en el puerto http://localhost:%s ${port}`);
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// manejar errores de escucha específicos con mensajes amigables
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requiere privigilegios de administrador');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' ya se encuentra en uso');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server "listening" event.
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Escuchando en el puerto' + bind);
}

// implementacion de Rutas 
// Get rutas
router.get('/', (req, res) => {
    res.render('app.js');
});

router.get('/consulta', (req, res) => {
    res.render('consulta.js');
});

router.get('/enviarCorreo', (req, res) => {
    res.render('enviarCorreo.js');
});

// Get uno 
router.get('/:id', (req, res) => {
    res.sendStatus(200);
});


// Creando uno
router.post('/', async (req, res) => {
    const consulta = new Consulta({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    });

    try {
        const newConsulta = await consulta.save();
        res.status(201).json(newConsulta);
    } catch (err) {
        res.status(400).json({ mensaje: err.menssage });
    }
});

router.post('/api/personas', async (req, res) => {
    const persona = new Persona({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula
    });

    try {
        const datos = await post.find(persona)([
            edad: req.edad,
            genero: req.genero,
            ciudadResidencia: req.ciudadResidencia,
            fechaNacimiento: req.fechaNacimiento
        ]);
        res.json();
        res.send(datos);
    }
    catch (err) {
        res.json({ mensaje: err });
    }
});

router.post('/api/email',
    [limiter, ...enviarCorreo.validate],
    enviarCorreo.enviarCorreo
);

// Generar mensaje de Email
app.post('/enviarCorreo', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // Reemplazar con la direccion real del remitente
            nombre: req.body.nombre,
            remite: req.body.remite,
            pass: 'test'
        }
    });
    let mailOptions = {
        // Reemplazar con la direccion real del destinatario
        destino: req.body.destino,
        asunto: req.body.asunto,
        mensaje: req.body.mensaje
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensaje %s enviado: %s', info.mensajeId, info.response);
    });
    res.writeHead(301, { Location: 'index.html' });
    res.end();
});

// Actualizando uno
router.patch('/:id', (req, res) => {

});

class App {

    

    render() {

        return (
            <div>
                <Consulta />
                <EnviarCorreo />
            </div>
            // document.getElementById('root')
        );
    }
}


//
module.exports = { App, app, router };