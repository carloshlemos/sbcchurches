var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var igrejas = [
    {id: 1, nome: "Igreja Presbiteriana Finsocial", logradouro: "Rua VF-42", complemento:"Quadra 34 Lote 5", bairro: "Vila Finsocial", cidade: {nome: "Goiânia", estado: "GO"}, cep: "74473-380", latitude: -16.622451, longitude: -49.317838, telefone: "(62) 3093-6971"},
    {id: 2, nome: "2ª Igreja Presbiteriana de Goiânia", logradouro: "Rua Doutor Inácio Zacarias Pereira, 66", complemento:"Quadra 13", bairro: "Centro Oeste", cidade: {nome: "Goiânia", estado:
    "GO"}, cep: "74550-070", latitude: -16.664592, longitude: -49.277972, telefone: "(62) 3591-1440"}
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

app.get('/igrejas/:id', function(req, res) {
  igrejas.forEach(function (igreja) {
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