var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var igrejas = [
    {id: 1, nome: "Igreja Presbiteriana Finsocial", logradouro: "Rua VF-42", complemento:"Quadra X Lote X", bairro: "Vila Finsocial", cidade: {nome: "Goiânia", estado: "GO"}, cep: "74000-000"}
];
     
var cidades = [
     {nome: "Goiânia", estado: "GO"}
];

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/igrejas', function(req, res) {
  res.json(igrejas);
});

app.get('/igreja/:id', function(req, res) {
  contatos.forEach(function (igreja) {
  	if (igreja.id == req.params.id) {
  		res.json(igreja);
  		return;
  	}
  });
  res.status(404).end();
});

app.post('/igrejas', function(req, res) {
  igrejas.push(req.body);
  res.json(true);
});

app.get('/cidades', function(req, res) {
  res.json(cidades);
});

app.listen(process.env.PORT || 3412);