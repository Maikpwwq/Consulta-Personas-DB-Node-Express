const devolucionConsulta = (req, res) => {

    const { nombre, apellido, cedula } = req.body;

    const persona = {
        nombre: `${nombre}`,
        apellido: `${apellido}`,
        cedula: `${cedula}`,
    };

    res.send(persona (), (err, res) => {
        DataPersonas.find(`${_id}`).exec(function (err, res) {
            if (err) {
                console.log('Fallo el envio de la consulta', err);
                console.log(data);                
                res.send(500, { error: err });
            }
            else {
                console.log('Los datos se consultaron en forma correcta!');
                res.send(res);
            }
        });
    }
}

const verifica = [
    [        
        check('nombre')
            .not()
            .isEmpty(),
        check('apellido')
            .not()
            .isEmpty(),
        check('cedula')
            .not()
            .isEmpty()
    ]
];

module.exports = { devolucionConsulta, verifica };    