var cmd = require('node-cmd');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.static('public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

var mongo = require('./db.js');

/*cmd.get(
    'curl -X POST -F image=@m2.jpg "https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=eu&secret_key=sk_482e5e15d9d326b4c05421c9"',
    function(err, data, stderr) {
        var obj = JSON.parse(data);
        console.log(obj.results[0].plate)
    }
);*/

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/admin', function(req, res) {
    res.render('admin/admin', { message: null });
});

app.get('/aparcar', function(req, res) {
    res.render('aparcar', { message: null });
});

app.get('/admin/zonesprivades', function(req, res) {
    res.render('admin/zonesprivades', { message: null });
});

app.get('/admin/aparcaments', function(req, res) {
    mongo.aparcaments(function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            res.render('admin/aparcaments', { aparcaments: data });
        }
    });
});

app.get('/admin/carregadescarrega', function(req, res) {
    res.render('admin/carregadescarrega', { message: null });
});

app.post('/admin/zonesprivades', function(req, res) {
    var matricula = req.body.matricula;
    var carrer = req.body.carrer;
    mongo.autoritzarZonesprivades(matricula, carrer, function(err, data) {
        if (err) {
            res.render('admin/zonesprivades', { message: "Error, torna a intentar" });
        } else {
            res.render('admin/zonesprivades', { message: "Has autoritzat correctament" });
        }
    });
});

app.post('/admin/carregadescarrega', function(req, res) {
    var matricula = req.body.matricula;
    var carrer = req.body.carrer;
    mongo.autoritzarCarregadescarrega(matricula, carrer, function(err, data) {
        if (err) {
            res.render('admin/carregadescarrega', { message: "Error, torna a intentar" });
        } else {
            res.render('admin/carregadescarrega', { message: "Has autoritzat correctament" });
        }
    });
});

app.post('/aparcar', function(req, res) {
    var matricula = req.body.matricula;
    var carrer = req.body.carrer;
    var horaFi = req.body.horafi;
    var socVei = req.body.socvei;
    mongo.reservarParking(matricula, carrer, horaFi, socVei, function(err, data) {
        if (err) {
            res.render('aparcar', { message: "Error, torna a intentar" });
        } else {
            res.render('aparcar', { message: "Has aparcat correctament" });
        }
    });
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(3000, function() {
    console.log('Mataro Mobilitat funcionant al port 3000!');
});