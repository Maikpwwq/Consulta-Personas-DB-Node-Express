const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodeMailer = require('nodemailer');
const debug = require('debug')('email-sender:server');
const http = require('http');

//
const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use('/api/personas', usersRoute);
app.use(express.json());
app.use(router);

app.use(express.static('src'));
app.use(bodyParser.urlencoded({ extended: true }));

//
const port = process.env.PORT || 3000;

/*
 let server = app.listen(8081, function () {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
 */

app.listen(port, () => {
    // submit(e => { e.preventDefault();
    console.log(`Server running on port ${port}`);
});

//
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// handle specific listen errors with friendly messages
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


// consultar post datos 
const rateLimit = require('express-rate-limit');
const logger = require('morgan');
const enviarCorreo = require('./src/correos/enviarCorreo');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    skipFailedRequests: true
});

router.get('/api/health', (req, res) => res.sendStatus(200));
router.post(
    '/api/email',
    [limiter, ...enviarCorreo.validate],
    enviarCorreo.enviarCorreo
);

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


// Generar mensaje de Email

app.post('/enviarCorreo', function (req, res) {
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            // Reemplazar con la direccion real del remitente
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

//
module.exports = { app };