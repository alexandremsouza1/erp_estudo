const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/mensagem', (req, res) => {
  res.send({ express: `TESTE DE REQUISIÇÃO GET NODE - FUNCIONANDO... ${new Date().getDate()}` });
});

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));