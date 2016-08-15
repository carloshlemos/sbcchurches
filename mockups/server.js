var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var Sequelize = require('sequelize');
var sequelize = new Sequelize('sbc', null, null, {
    dialect: 'postgres'
});

var Igreja = null;
var Cidade = null;
var igrejas = null;
var cidades = null;

loadEntity();
//createDataBase();
//importDataBase();

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/igrejas', function(req, res) {
    Igreja.findAll({attributes: ['id', 'nome', 'bairro', 'fk_cidade'], order: 'nome'}).then(function(igrejas) {        
        res.json(igrejas.map(function(igreja){ return igreja.toJSON()}));
    });
});

app.get('/igrejas/:id', function(req, res) {    
    Igreja.findAll({where: {id: req.params.id}}).then(function(igrejas) {        
        res.json(igrejas[0].toJSON());
    }).catch(function(error) {
        res.send('500: Igreja não encontrada: ' + error, 500);
    });
});

app.post('/igrejas', function(req, res) {
    Igreja.create(req.body).then(function(){
        res.json(true);  
    }).catch(function(error) {
        res.send('500: Igreja não cadastrada: ' + error, 500);
    });      
});

app.get('/cidades', function(req, res) {
    Cidade.findAll({hummorder: 'nome'}).then(function(cidades) {
      res.json(cidades.map(function(cidade){ return cidade.toJSON()}));
    });    
});

app.listen(process.env.PORT || 3412);

function loadEntity(){
    Igreja = sequelize.define('igreja', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true          
        },
        nome: {
            type: Sequelize.STRING
        },
        logradouro: {
            type: Sequelize.STRING
        }, 
        complemento: {
            type: Sequelize.STRING
        },
        bairro: {
            type: Sequelize.STRING
        },
        cep: {
            type: Sequelize.STRING
        }, 
        latitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: null,
            validate: { min: -90, max: 90 }
          },
        longitude: {
            type: Sequelize.DOUBLE,
            allowNull: true,
            defaultValue: null,
            validate: { min: -180, max: 180 }
        },
        telefone: {
            type: Sequelize.STRING     
        },    
        email: {
            type: Sequelize.STRING      
        }   
    }, {
        tableName: 'igreja',
        timestamps: false // this will deactivate the timestamp columns
    });

    Cidade = sequelize.define('cidade', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true 
        },
        nome: {
            type: Sequelize.STRING      
        },
        estado: {
            type: Sequelize.STRING(2)   
        }
    }, {
        tableName: 'cidade',
        timestamps: false
    });        
}

function createDataBase(){
    Igreja.belongsTo(Cidade, {foreignKey: 'fk_cidade'});

    sequelize
      .sync({ force: true })
      .then(function(err) {
        console.log('It worked!');
      }, function (err) { 
        console.log('An error occurred while creating the table:', err);
      });    
}

function importDataBase() {
    var igrejas = [{
        "nome": "IGREJA PRESBITERIANA FINSOCIAL",
        "logradouro": "Rua VF-42",
        "complemento": "Quadra 34 Lote 5",
        "bairro": "Vila Finsocial",
        fk_cidade: 1,
        "cep": "74.473-380",    
        "latitude": -16.622404,
        "longitude": -49.318091,
        "telefone": "(62) 3093-6971",
        "email": null
    }, {
        "nome": "2ª IGREJA PRESBITERIANA DE GOIÂNIA",
        "logradouro": "Rua Doutor Inácio Zacarias Pereira, 66",
        "complemento": "Quadra 13",
        "bairro": "Centro Oeste",
        fk_cidade: 1,
        "cep": "74.550-070",
        "latitude": -16.664592,
        "longitude": -49.277972,
        "telefone": "(62) 3591-1440",
        "email": null
    }, {	
        "nome": "IGREJA PRESBITERIANA DE VILA NOVA",
        "logradouro": "4ª Avenida esquina com 5ª Avenida",
        "complemento": "Cx. Postal:12.006",
        "bairro": "Vila Nova",
        fk_cidade: 1,
        "cep": "74.645-020",
        "latitude": -16.664099,
        "longitude": -49.245344,
        "telefone": "(62) 3261-1017",
        "email": "ipdevilanova@yahoo.com.br"
    }, {
        "nome": "IGREJA PRESBITERIANA JARDIM NOVO MUNDO",
        "logradouro": "Av. Cristóvão Colombo",
        "complemento": "Quadra 165, Lote 9",
        "bairro": "Jardim Novo Mundo",
        fk_cidade: 1,
        "cep": "74.705-130",
        "latitude": -16.673278,
        "longitude": -49.218613,
        "telefone": "(62) 3091-7975",
        "email": null
    }, {
        "nome": "IGREJA PRESBITERIANA REDENÇÃO",
        "logradouro": "Rua 1083",
        "complemento": "Quadra 84, Lote 33",
        "bairro": "Vila Redenção",
        fk_cidade: 1,
        "cep": "74.850-300",
        "latitude": -16.721286,
        "longitude": -49.240628,
        "telefone": "(62) 3259-1745",
        "email": null
    }, {
        "nome": "IGREJA PRESBITERIANA DO CRIMÉIA LESTE",
        "logradouro": "Avenida Pedro Ludovico Teixeira",
        "complemento": "Quadra 04, Lote 07",
        "bairro": "Criméia Leste",
        fk_cidade: 1,
        "cep": "74.660-300",
        "latitude": -16.651049,
        "longitude": -49.258833,
        "telefone": "(62) 3954-1960",
        "email": "ippl@ih.com.br"
    }, {
        "nome": "IGREJA PRESBITERIANA BETÂNIA",
        "logradouro": "Rua 15, 272",
        "complemento": null,
        "bairro": "Vila Santa Helena",
        fk_cidade: 1,
        "cep": "74.555-270",    
        "latitude": -16.655436,
        "longitude": -49.282364,
        "telefone": "(62) 3291-3942",
        "email": null
    }, {
        "nome": "IGREJA PRESBITERIANA EBENÉZER",
        "logradouro": "Rua 609",
        "complemento": "Quadra 533 Lote 12",
        "bairro": "São José",
        fk_cidade: 1,
        "cep": "74.440-550",    
        "latitude": -16.656756,
        "longitude": -49.303064,
        "telefone": "(62) 3271-4055",
        "email": null
    }, {
        "nome": "IGREJA PRESBITERIANA DE ITABERAÍ",
        "logradouro": "Rua 7, 54",
        "complemento": null,
        "bairro": "Vila Leonor",
        fk_cidade: 1,
        "cep": "76.630-000",    
        "latitude": -16.013917,
        "longitude": -49.801951,
        "telefone": "(62) 3375-3334",
        "email": null
    }, {
        "nome": "IGREJA PRESBITERIANA DE ITAPURANGA",
        "logradouro": "Rua 52 “A”, 103",
        "complemento": null,
        "bairro": "Centro",
        fk_cidade: 2,
        "cep": "76.680-000",    
        "latitude": -15.558996,
        "longitude": -49.947609,
        "telefone": "(62) 3355-1142",
        "email": null
    }];


    var cidades = [
         {nome: "Goiânia", estado: "GO"},
         {nome: "Itapuranga", estado: "GO"},
         {nome: "Itaberaí", estado: "GO"}
    ];

    cidades.forEach(function(cidade){
        Cidade.create(cidade);
    });

    igrejas.forEach(function(igreja){
        Igreja.create(igreja);
    });    
}