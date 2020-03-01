const { check, validationResult } = require('express-validator/check');
const { apiKey, domain, correoRemite, correoDestino, correoAsunto } = require('./config');
const mailgun = require('mailgun-js')({ apiKey: apiKey, domain: domain });

const enviarCorreo = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { nombre, remite, mensaje } = req.body;

    const data = {
        remite: `${nombre} <${correoRemite}>`,
        destino: `${correoDestino}`,
        asunto: `${correoAsunto} (${remite})`,
        correo: `${mensaje}\n\n${nombre}\n${remite}\n`,
        'h:Reply-To': remite
    };

    mailgun.mensajes().send(data, (error, mensaje) => {
        if (error) {
            console.log('Fallo el envio del correo', error);
            console.log(data);
            res.sendStatus(500);
        } else {
            console.log('El Correo se envio en forma correcta!', mensaje);
            res.sendStatus(204);
        }
    });
};

const validar = [
    [
        check('remite').isEcorreo(),
        check('destino').isEcorreo(),
        check('nombre')
            .not()
            .isEmpty(),
        check('asunto')
            .not()
            .isEmpty(),
        check('mensaje')
            .not()
            .isEmpty()
    ]
];

module.exports = { enviarCorreo, validar };