import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import './styles/site.css';

import App from './app.jsx';

import * as serviceWorker from './serviceWorker';

//  Consultar datos de las personas en la base de datos
require('dotenv').config();
const { getSecret } = require('../config');

const mongoose = require('mongoose');

// DB cargue de la data
mongoose.Promise = global.Promise;
mongoose.connect(getSecret('dbUri')).then(
    () => {
        console.log('Connected to mongoDB');
    },
    (err) => console.log('Error connecting to mongoDB', err)
);


// Llamado a pantalla de la pagina de sesiones y rutas "App.js "
ReactDOM.render(
    <Provider >
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
//serviceWorker.unregister();
