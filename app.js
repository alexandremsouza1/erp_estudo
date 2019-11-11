const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/api/mensagem', (req, res) => {
  res.send({ express: `TESTE DE REQUISIÇÃO GET NODE - FUNCIONANDO... ${new Date().getDate()}` });
});

const create = router.post('/', (req, res, next) => {
  res.status(201).send(req.body);
});

app.use('/', create);

module.exports = app;

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));