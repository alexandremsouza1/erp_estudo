const PORT = process.env.PORT || 5000;

module.exports = {
    mercadolivre: {
        CLIENT_ID: 8828109757058917,
        CLIENT_SECRET: 'CzJ8bUeMslAaNQ1BrBvTxozJ5OyHKK2G',
        CALLBACK_URL: `http://localhost:${PORT}/auth/mercadolibre/callback`
    }
}