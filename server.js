#! /usr/bin/env node

var express = require('express');
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var Sequelize = require('sequelize'); // framework for ORM-Persistence
var app = express(); // create our app w/ express

var sequelize = new Sequelize('sbc', null, null, {
    dialect: 'postgres'
});

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var Igreja = null;
var Cidade = null;
var igrejas = null;
var cidades = null;

loadEntity();
//createDataBase();
//importDataBase();

app.get('/igrejas', function(req, res) {
    Igreja.findAll({attributes: ['id', 'nome', 'bairro', 'fk_cidade'], include: {model: Cidade}, order: 'nome'}).then(function(igrejas) {        
        res.json(igrejas.map(function(igreja){ return igreja.toJSON()}));
    });
});

app.get('/igrejas/:id', function(req, res) {    
    Igreja.findAll({where: {id: req.params.id}, include: {model: Cidade}}).then(function(igrejas) {        
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

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");

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
    
   Igreja.belongsTo(Cidade, {foreignKey: 'fk_cidade'});    
}

function createDataBase(){
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
         {nome: "Abadia de Goiás", estado: "GO"},
         {nome: "Abadiânia", estado: "GO"},
         {nome: "Acreúna", estado: "GO"},
         {nome: "Adelândia", estado: "GO"},
         {nome: "Água Fria de Goiás", estado: "GO"},
         {nome: "Água Limpa", estado: "GO"},
         {nome: "Águas Lindas de Goiás", estado: "GO"},
         {nome: "Alexânia", estado: "GO"},
         {nome: "Aloândia", estado: "GO"},
         {nome: "Alto Horizonte", estado: "GO"},
         {nome: "Alto Paraíso de Goiás", estado: "GO"},
         {nome: "Alvorada do Norte", estado: "GO"},
         {nome: "Amaralina", estado: "GO"},
         {nome: "Americano do Brasil", estado: "GO"},
         {nome: "Amorinópolis", estado: "GO"},
         {nome: "Anápolis", estado: "GO"},
         {nome: "Anhanguera", estado: "GO"},
         {nome: "Anicuns", estado: "GO"},
         {nome: "Aparecida de Goiânia", estado: "GO"},
         {nome: "Aparecida do Rio Doce", estado: "GO"},
         {nome: "Aporé", estado: "GO"},
         {nome: "Araçu", estado: "GO"},
         {nome: "Aragarças", estado: "GO"},
         {nome: "Aragoiânia", estado: "GO"},
         {nome: "Araguapaz", estado: "GO"},
         {nome: "Arenópolis", estado: "GO"},
         {nome: "Aruanã", estado: "GO"},
         {nome: "Aurilândia", estado: "GO"},
         {nome: "Avelinópolis", estado: "GO"},
         {nome: "Baliza", estado: "GO"},
         {nome: "Barro Alto", estado: "GO"},
         {nome: "Bela Vista de Goiás", estado: "GO"},
         {nome: "Bom Jardim de Goiás", estado: "GO"},
         {nome: "Bom Jesus de Goiás", estado: "GO"},
         {nome: "Bonfinópolis", estado: "GO"},
         {nome: "Bonópolis", estado: "GO"},
         {nome: "Brazabrantes", estado: "GO"},
         {nome: "Britânia", estado: "GO"},
         {nome: "Buriti Alegre", estado: "GO"},
         {nome: "Buriti de Goiás", estado: "GO"},
         {nome: "Buritinópolis", estado: "GO"},
         {nome: "Cabeceiras", estado: "GO"},
         {nome: "Cachoeira Alta", estado: "GO"},
         {nome: "Cachoeira de Goiás", estado: "GO"},
         {nome: "Cachoeira Dourada", estado: "GO"},
         {nome: "Caçu", estado: "GO"},
         {nome: "Caiapônia", estado: "GO"},
         {nome: "Caldas Novas", estado: "GO"},
         {nome: "Caldazinha", estado: "GO"},
         {nome: "Campestre de Goiás", estado: "GO"},
         {nome: "Campinaçu", estado: "GO"},
         {nome: "Campinorte", estado: "GO"},
         {nome: "Campo Alegre de Goiás", estado: "GO"},
         {nome: "Campo Limpo de Goiás", estado: "GO"},
         {nome: "Campos Belos", estado: "GO"},
         {nome: "Campos Verdes", estado: "GO"},
         {nome: "Carmo do Rio Verde", estado: "GO"},
         {nome: "Castelândia", estado: "GO"},
         {nome: "Catalão", estado: "GO"},
         {nome: "Caturaí", estado: "GO"},
         {nome: "Cavalcante", estado: "GO"},
         {nome: "Ceres", estado: "GO"},
         {nome: "Cezarina", estado: "GO"},
         {nome: "Chapadão do Céu", estado: "GO"},
         {nome: "Cidade Ocidental", estado: "GO"},
         {nome: "Cocalzinho de Goiás", estado: "GO"},
         {nome: "Colinas do Sul", estado: "GO"},
         {nome: "Córrego do Ouro", estado: "GO"},
         {nome: "Corumbá de Goiás", estado: "GO"},
         {nome: "Corumbaíba", estado: "GO"},
         {nome: "Cristalina", estado: "GO"},
         {nome: "Cristianópolis", estado: "GO"},
         {nome: "Crixás", estado: "GO"},
         {nome: "Cromínia", estado: "GO"},
         {nome: "Cumari", estado: "GO"},
         {nome: "Damianópolis", estado: "GO"},
         {nome: "Damolândia", estado: "GO"},
         {nome: "Davinópolis", estado: "GO"},
         {nome: "Diorama", estado: "GO"},
         {nome: "Divinópolis de Goiás", estado: "GO"},
         {nome: "Doverlândia", estado: "GO"},
         {nome: "Edealina", estado: "GO"},
         {nome: "Edéia", estado: "GO"},
         {nome: "Estrela do Norte", estado: "GO"},
         {nome: "Faina", estado: "GO"},
         {nome: "Fazenda Nova", estado: "GO"},
         {nome: "Firminópolis", estado: "GO"},
         {nome: "Flores de Goiás", estado: "GO"},
         {nome: "Formosa", estado: "GO"},
         {nome: "Formoso", estado: "GO"},
         {nome: "Gameleira de Goiás", estado: "GO"},
         {nome: "Goianápolis", estado: "GO"},
         {nome: "Goiandira", estado: "GO"},
         {nome: "Goianésia", estado: "GO"},
         {nome: "Goiânia", estado: "GO"},
         {nome: "Goianira", estado: "GO"},
         {nome: "Goiás", estado: "GO"},
         {nome: "Goiatuba", estado: "GO"},
         {nome: "Gouvelândia", estado: "GO"},
         {nome: "Guapó", estado: "GO"},
         {nome: "Guaraíta", estado: "GO"},
         {nome: "Guarani de Goiás", estado: "GO"},
         {nome: "Guarinos", estado: "GO"},
         {nome: "Heitoraí", estado: "GO"},
         {nome: "Hidrolândia", estado: "GO"},
         {nome: "Hidrolina", estado: "GO"},
         {nome: "Iaciara", estado: "GO"},
         {nome: "Inaciolândia", estado: "GO"},
         {nome: "Indiara", estado: "GO"},
         {nome: "Inhumas", estado: "GO"},
         {nome: "Ipameri", estado: "GO"},
         {nome: "Ipiranga de Goiás", estado: "GO"},
         {nome: "Iporá", estado: "GO"},
         {nome: "Israelândia", estado: "GO"},
         {nome: "Itaberaí", estado: "GO"},
         {nome: "Itaguari", estado: "GO"},
         {nome: "Itaguaru", estado: "GO"},
         {nome: "Itajá", estado: "GO"},
         {nome: "Itapaci", estado: "GO"},
         {nome: "Itapirapuã", estado: "GO"},
         {nome: "Itapuranga", estado: "GO"},
         {nome: "Itarumã", estado: "GO"},
         {nome: "Itauçu", estado: "GO"},
         {nome: "Itumbiara", estado: "GO"},
         {nome: "Ivolândia", estado: "GO"},
         {nome: "Jandaia", estado: "GO"},
         {nome: "Jaraguá", estado: "GO"},
         {nome: "Jataí", estado: "GO"},
         {nome: "Jaupaci", estado: "GO"},
         {nome: "Jesúpolis", estado: "GO"},
         {nome: "Joviânia", estado: "GO"},
         {nome: "Jussara", estado: "GO"},
         {nome: "Lagoa Santa", estado: "GO"},
         {nome: "Leopoldo de Bulhões", estado: "GO"},
         {nome: "Luziânia", estado: "GO"},
         {nome: "Mairipotaba", estado: "GO"},
         {nome: "Mambaí", estado: "GO"},
         {nome: "Mara Rosa", estado: "GO"},
         {nome: "Marzagão", estado: "GO"},
         {nome: "Matrinchã", estado: "GO"},
         {nome: "Maurilândia", estado: "GO"},
         {nome: "Mimoso de Goiás", estado: "GO"},
         {nome: "Minaçu", estado: "GO"},
         {nome: "Mineiros", estado: "GO"},
         {nome: "Moiporá", estado: "GO"},
         {nome: "Monte Alegre de Goiás", estado: "GO"},
         {nome: "Montividiu", estado: "GO"},
         {nome: "Montividiu do Norte", estado: "GO"},
         {nome: "Morrinhos", estado: "GO"},
         {nome: "Morro Agudo de Goiás", estado: "GO"},
         {nome: "Mossâmedes", estado: "GO"},
         {nome: "Mozarlândia", estado: "GO"},
         {nome: "Mundo Novo", estado: "GO"},
         {nome: "Mutunópolis", estado: "GO"},
         {nome: "Nazário", estado: "GO"},
         {nome: "Nerópolis", estado: "GO"},
         {nome: "Niquelândia", estado: "GO"},
         {nome: "Nova América", estado: "GO"},
         {nome: "Nova Aurora", estado: "GO"},
         {nome: "Nova Crixás", estado: "GO"},
         {nome: "Nova Glória", estado: "GO"},
         {nome: "Nova Iguaçu de Goiás", estado: "GO"},
         {nome: "Nova Roma", estado: "GO"},
         {nome: "Nova Veneza", estado: "GO"},
         {nome: "Novo Brasil", estado: "GO"},
         {nome: "Novo Gama", estado: "GO"},
         {nome: "Novo Planalto", estado: "GO"},
         {nome: "Orizona", estado: "GO"},
         {nome: "Ouro Verde de Goiás", estado: "GO"},
         {nome: "Ouvidor", estado: "GO"},
         {nome: "Padre Bernardo", estado: "GO"},
         {nome: "Palestina de Goiás", estado: "GO"},
         {nome: "Palmeiras de Goiás", estado: "GO"},
         {nome: "Palmelo", estado: "GO"},
         {nome: "Palminópolis", estado: "GO"},
         {nome: "Panamá", estado: "GO"},
         {nome: "Paranaiguara", estado: "GO"},
         {nome: "Paraúna", estado: "GO"},
         {nome: "Perolândia", estado: "GO"},
         {nome: "Petrolina de Goiás", estado: "GO"},
         {nome: "Pilar de Goiás", estado: "GO"},
         {nome: "Piracanjuba", estado: "GO"},
         {nome: "Piranhas", estado: "GO"},
         {nome: "Pirenópolis", estado: "GO"},
         {nome: "Pires do Rio", estado: "GO"},
         {nome: "Planaltina", estado: "GO"},
         {nome: "Pontalina", estado: "GO"},
         {nome: "Porangatu", estado: "GO"},
         {nome: "Porteirão", estado: "GO"},
         {nome: "Portelândia", estado: "GO"},
         {nome: "Posse", estado: "GO"},
         {nome: "Professor Jamil", estado: "GO"},
         {nome: "Quirinópolis", estado: "GO"},
         {nome: "Rialma", estado: "GO"},
         {nome: "Rianápolis", estado: "GO"},
         {nome: "Rio Quente", estado: "GO"},
         {nome: "Rio Verde", estado: "GO"},
         {nome: "Rubiataba", estado: "GO"},
         {nome: "Sanclerlândia", estado: "GO"},
         {nome: "Santa Bárbara de Goiás", estado: "GO"},
         {nome: "Santa Cruz de Goiás", estado: "GO"},
         {nome: "Santa Fé de Goiás", estado: "GO"},
         {nome: "Santa Helena de Goiás", estado: "GO"},
         {nome: "Santa Isabel", estado: "GO"},
         {nome: "Santa Rita do Araguaia", estado: "GO"},
         {nome: "Santa Rita do Novo Destino", estado: "GO"},
         {nome: "Santa Rosa de Goiás", estado: "GO"},
         {nome: "Santa Tereza de Goiás", estado: "GO"},
         {nome: "Santa Terezinha de Goiás", estado: "GO"},
         {nome: "Santo Antônio da Barra", estado: "GO"},
         {nome: "Santo Antônio de Goiás", estado: "GO"},
         {nome: "Santo Antônio do Descoberto", estado: "GO"},
         {nome: "São Domingos", estado: "GO"},
         {nome: "São Francisco de Goiás", estado: "GO"},
         {nome: "São João da Paraúna", estado: "GO"},
         {nome: "São João d'Aliança", estado: "GO"},
         {nome: "São Luís de Montes Belos", estado: "GO"},
         {nome: "São Luíz do Norte", estado: "GO"},
         {nome: "São Miguel do Araguaia", estado: "GO"},
         {nome: "São Miguel do Passa-Quatro", estado: "GO"},
         {nome: "São Patrício", estado: "GO"},
         {nome: "São Simão", estado: "GO"},
         {nome: "Senador Canedo", estado: "GO"},
         {nome: "Serranópolis", estado: "GO"},
         {nome: "Silvânia", estado: "GO"},
         {nome: "Simolândia", estado: "GO"},
         {nome: "Sítio d'Abadia", estado: "GO"},
         {nome: "Taquaral de Goiás", estado: "GO"},
         {nome: "Teresina de Goiás", estado: "GO"},
         {nome: "Terezópolis de Goiás", estado: "GO"},
         {nome: "Três Ranchos", estado: "GO"},
         {nome: "Trindade", estado: "GO"},
         {nome: "Trombas", estado: "GO"},
         {nome: "Turvânia", estado: "GO"},
         {nome: "Turvelândia", estado: "GO"},
         {nome: "Uirapuru", estado: "GO"},
         {nome: "Uruaçu", estado: "GO"},
         {nome: "Uruana", estado: "GO"},
         {nome: "Urutaí", estado: "GO"},
         {nome: "Valparaíso de Goiás", estado: "GO"},
         {nome: "Varjão", estado: "GO"},
         {nome: "Vianópolis", estado: "GO"},
         {nome: "Vicentinópolis", estado: "GO"},
         {nome: "Vila Boa", estado: "GO"},
         {nome: "Vila Propício", estado: "GO"}
    ];

    cidades.forEach(function(cidade){
        Cidade.create(cidade);
    });

    igrejas.forEach(function(igreja){
        Igreja.create(igreja);
    });    
}
