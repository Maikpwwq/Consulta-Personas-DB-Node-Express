// Consulta

const devolucionConsulta = (req, res) => {

    const { nombre, apellido, cedula } = req.body;

    const persona = {
        nombre: `${nombre}`,
        apellido: `${apellido}`,
        cedula: `${cedula}`,
    };

    res.send(persona(), (err, res) => {
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
    });
};

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

class Consulta {
    render() {

        return (
            <section>
                <div class="container">

                    <div class="row" style="display:flex">
                        <div class="col-md-12 offset-md-5">
                            <h3>Ingresa los campos a continuacion</h3>
                            <div class="form-area">

                                <form role="form" action="./consultas/consulta" method="post">
                                    <br style="clear:both"/>
                                    <p>
                                        Devuelve el registro de Edad, Genero, Ciudad de residencia, Fecha de nacimiento
                                    </p>
                                    <br />
                                    <div class="form-group">
                                        <label>
                                            Nombre de la Persona a consultar:
                                        </label>
                                        <br />
                                        <input list="nombres"
                                               type="text"
                                               class="form-control"
                                               id="nombre"
                                               name="nombre"
                                               placeholder="Ingrese Nombre" 
                                            required />
                                        <datalist id="nombres">
                                            <option value="Anderson"></option>
                                            <option value="Daniela"></option>
                                            <option value="Cristian"></option>
                                            <option value="Lucy"></option>
                                            <option value="David"></option>
                                        </datalist>
                                    </div>

                                    <div class="form-group">
                                        <label>
                                            Apellido de la persona a consultar:
                                    </label><br />
                                        <input type="text"
                                            class="form-control"
                                            id="apellido"
                                            name="apellido"
                                            placeholder="Ingrese Apellido"
                                            required />
                                    </div>
                                    <div class="form-group">
                                        <label>
                                            Cedula de la persona a consultar:
                                    </label><br />
                                        <input type="number"
                                            class="form-control"
                                            id="cedula"
                                            name="cedula"
                                            placeholder="Digite numero de Cedula"
                                            required />
                                    </div>
                                    <br />
                                    <div class="text-center">
                                        <button
                                            type="submit"
                                            id="submit"
                                            name="submit"
                                            class="btn btn-primary pull-right btn-submit">
                                            Consultar
                                    </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        );
    }
     
}


module.exports = { Consulta, devolucionConsulta, verifica };    