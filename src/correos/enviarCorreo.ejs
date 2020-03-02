// Enviar Correo

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

class EnviarCorreo {
    render() {
        return (
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-6 offset-md-3">
                            <h3>Registra un mensaje para enviar</h3>
                            <div class="form-area">

                                <form role="form" action="./correos/enviarCorreo" method="post">
                                    <br style="clear:both"/>
                                    <p>
                                       Envia un mensaje a la direccion de correo del destinatario
                                    </p>
                                    <div class="form-group">
                                        <label>
                                            Nombre:
                                        </label><br />
                                        <input type="text"
                                            style="width:500px; height:30px"
                                            class="form-control"
                                            id="nombre"
                                            name="nombre"
                                            placeholder="Ingrese su nombre o nickname" required />
                                        <br />
                                        <label>
                                            Email Remitente:
                                    </label><br />
                                        <input type="email"
                                            style="width:500px; height:30px"
                                            class="form-control"
                                            id="remite"
                                            name="remite"
                                            placeholder="Ingrese su direccion de correo electronico" required />
                                        <br />
                                        <label>
                                            Email Destinatario:
                                    </label><br />
                                        <input type="email"
                                            style="width:500px; height:30px"
                                            class="form-control"
                                            id="destino"
                                            name="destino"
                                            placeholder="Ingrese la direccion de correo a donde se enviara el mensaje" required />
                                        <br />
                                        <label>
                                            Asunto:
                                    </label>
                                        <br />
                                        <input type="text"
                                            style="width:500px; height:30px"
                                            class="form-control"
                                            id="asunto"
                                            name="asunto"
                                            placeholder="Elija un asunto para el mensaje" required />
                                        <br />
                                        <label>
                                            Mensaje:
                                    </label><br />
                                        <textarea type=""
                                            style="width:500px; height:300px"
                                            class="form-control"
                                            id="mensaje"
                                            name="mensaje"
                                            placeholder="Ingrese el mensaje que adjuntara a este correo" required />
                                        <br />
                                        <div>
                                            <button type="submit"
                                                style="align-content:center"
                                                onclick=""
                                                id="enviar"
                                                name="enviar"
                                                class="btn btn-primary pull-right btn-submit">
                                                Enviar
                                        </button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section >                                                
        );
    }

}

module.exports = { EnviarCorreo, enviarCorreo, validar };