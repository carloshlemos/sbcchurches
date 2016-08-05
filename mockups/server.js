var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var Sequelize = require('sequelize');
var sequelize = new Sequelize('sbc', null, null, {
    dialect: 'postgres'
})

var Igreja = sequelize.define('igreja', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        get: function()  {},
        set: function(v) {}            
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
    latitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -90, max: 90 }
      },
    longitude: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: { min: -180, max: 180 }
    }
}, {
    tableName: 'igreja',
    timestamps: false // this will deactivate the timestamp columns
})


var Cidade = sequelize.define('cidade', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING
    },
    estado: {
        type:   Sequelize.ENUM,
        values:['GO']
    }
}, {
    tableName: 'cidade',
    timestamps: false
})

Igreja.belongsTo(Cidade, {foreignKey: 'fk_cidade'});

sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

Cidade.sync().then(function(){
    var goiania = {
        nome: 'GOIÂNIA',
        estado: 'GO'
    }
    
    Cidade.create(goiania).then(function(cidade){
        console.dir(cidade.get())
    })
    
    Igreja.sync({force: true}).then(function (){
        var finsocial = {
            nome: "IGREJA PRESBITERIANA FINSOCIAL",
            logradouro: "Rua VF-42",
            complemento: "Quadra 34 Lote 5",
            bairro: "Vila Finsocial",
            fk_cidade: 1
        }

        Igreja.create(finsocial).then(function(igreja){
            console.dir(igreja.get())
        })
    })        
})

//Igreja.findAll({ include: [ Cidade ] }).then(function(igrejas) {
//  console.log(JSON.stringify(igrejas))
//})

var igrejas = [{
	"id": 1,
	"nome": "IGREJA PRESBITERIANA FINSOCIAL",
	"logradouro": "Rua VF-42",
	"complemento": "Quadra 34 Lote 5",
	"bairro": "Vila Finsocial",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.473-380",    
	"latitude": -16.622404,
	"longitude": -49.318091,
	"telefone": "(62) 3093-6971",
    "email": ""
}, {
	"id": 2,
	"nome": "2ª IGREJA PRESBITERIANA DE GOIÂNIA",
	"logradouro": "Rua Doutor Inácio Zacarias Pereira, 66",
	"complemento": "Quadra 13",
	"bairro": "Centro Oeste",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.550-070",
	"latitude": -16.664592,
	"longitude": -49.277972,
	"telefone": "(62) 3591-1440",
    "email": ""
}, {
	"id": 3,
	"nome": "IGREJA PRESBITERIANA DE VILA NOVA",
	"logradouro": "4ª Avenida esquina com 5ª Avenida",
	"complemento": "Cx. Postal:12.006",
	"bairro": "Vila Nova",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.645-020",
	"latitude": -16.664099,
	"longitude": -49.245344,
	"telefone": "(62) 3261-1017",
    "email": "ipdevilanova@yahoo.com.br"
}, {
	"id": 4,
	"nome": "IGREJA PRESBITERIANA JARDIM NOVO MUNDO",
	"logradouro": "Av. Cristóvão Colombo",
	"complemento": "Quadra 165, Lote 9",
	"bairro": "Jardim Novo Mundo",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.705-130",
	"latitude": -16.673278,
	"longitude": -49.218613,
	"telefone": "(62) 3091-7975",
    "email": ""
}, {
	"id": 5,
	"nome": "IGREJA PRESBITERIANA REDENÇÃO",
	"logradouro": "Rua 1083",
	"complemento": "Quadra 84, Lote 33",
	"bairro": "Vila Redenção",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.850-300",
	"latitude": -16.721286,
	"longitude": -49.240628,
	"telefone": "(62) 3259-1745",
    "email": ""
}, {
	"id": 6,
	"nome": "IGREJA PRESBITERIANA DO CRIMÉIA LESTE",
	"logradouro": "Avenida Pedro Ludovico Teixeira",
	"complemento": "Quadra 04, Lote 07",
	"bairro": "Criméia Leste",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.660-300",
	"latitude": -16.651049,
	"longitude": -49.258833,
	"telefone": "(62) 3954-1960",
    "email": "ippl@ih.com.br"
}, {
	"id": 7,
	"nome": "IGREJA PRESBITERIANA BETÂNIA",
	"logradouro": "Rua 15, 272",
	"complemento": "",
	"bairro": "Vila Santa Helena",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.555-270",    
	"latitude": -16.655436,
	"longitude": -49.282364,
	"telefone": "(62) 3291-3942",
    "email": ""
}, {
	"id": 8,
	"nome": "IGREJA PRESBITERIANA EBENÉZER",
	"logradouro": "Rua 609",
	"complemento": "Quadra 533 Lote 12",
	"bairro": "São José",
	"cidade": {
		"nome": "Goiânia",
		"estado": "GO"
	},
	"cep": "74.440-550",    
	"latitude": -16.656756,
	"longitude": -49.303064,
	"telefone": "(62) 3271-4055",
    "email": ""
}, {
	"id": 9,
	"nome": "IGREJA PRESBITERIANA DE ITABERAÍ",
	"logradouro": "Rua 7, 54",
	"complemento": "",
	"bairro": "Vila Leonor",
	"cidade": {
		"nome": "Itaberaí",
		"estado": "GO"
	},
	"cep": "76.630-000",    
	"latitude": -16.013917,
	"longitude": -49.801951,
	"telefone": "(62) 3375-3334",
    "email": ""
}, {
	"id": 10,
	"nome": "IGREJA PRESBITERIANA DE ITAPURANGA",
	"logradouro": "Rua 52 “A”, 103",
	"complemento": "",
	"bairro": "Centro",
	"cidade": {
		"nome": "Itapuranga",
		"estado": "GO"
	},
	"cep": "76.680-000",    
	"latitude": -15.558996,
	"longitude": -49.947609,
	"telefone": "(62) 3355-1142",
    "email": ""
}];

     
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
  console.log(req.body);
  res.json(true);
});

app.get('/cidades', function(req, res) {
  res.json(cidades);
});

app.listen(process.env.PORT || 3412);