const apiKey = process.env.API_KEY || 'mailgun-apiKey';
const domain = process.env.API_DOMAIN || 'mailgun-domain';
const correoRemite = process.env.MAIL_FROM || 'Remitente@domain.com';
const correoDestino = process.env.MAIL_TO || 'Enviar correo a <Destinatario@email.com>';
const correoAsunto = process.env.MAIL_SUBJECT || 'Asunto del correo';

module.exports = { apiKey, domain, correoRemite, correoDestino, correoAsunto };


const secrets = {
    dbUri: process.env.DB_URI || 'YOUR MONGODB URI HERE',
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };