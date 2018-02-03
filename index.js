var cmd = require('node-cmd');
var base64ToImage = require('base64-to-image');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var sendmail = require('sendmail')();
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

var mongo = require('./db.js');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/admin', function(req, res) {
    res.render('admin/admin', { message: null });
});

app.get('/solicitar', function(req, res) {
    res.render('solicitar', { message: null });
});

app.get('/admin/solicituds', function(req, res) {
    mongo.solicituds(function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            res.render('admin/solicituds', { solicituds: data });
        }
    });
});

app.get('/admin/acceptar', function(req, res) {
    var correu = req.param('correu');
    var dni = req.param('dni');
    var matricula = req.param('matricula');
    mongo.acceptar(dni, matricula, function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            sendmail({
                from: 'no-reply@easyzone.com',
                to: correu,
                subject: 'Resultat acreditació Zona Blava',
                html: 'Has estat acceptat!',
            }, function(err, reply) {
                res.redirect('/admin/solicituds');
            });
        }
    });
});

app.get('/admin/denegar', function(req, res) {
    var correu = req.param('correu');
    var dni = req.param('dni');
    var matricula = req.param('matricula');
    mongo.denegar(dni, matricula, function(err, data) {
        if (err) {
            res.redirect('/');
        } else {
            sendmail({
                from: 'no-reply@easyzone.com',
                to: correu,
                subject: 'Resultat acreditació Zona Blava',
                html: 'Has estat denegat!',
            }, function(err, reply) {
                res.redirect('/admin/solicituds');
            });
        }
    });
});

app.get('/admin/zonesprivades', function(req, res) {
    res.render('admin/zonesprivades', { message: null });
});

app.get('/admin/carregadescarrega', function(req, res) {
    res.render('admin/carregadescarrega', { message: null });
});

app.post('/solicitar', function(req, res) {
    var dni = req.body.dni;
    var matricula = req.body.matricula;
    var correu = req.body.correu;
    mongo.buscarMataro(dni, matricula, function(err, resultat) {
        if (err) {
            res.render('solicitar', { message: "Error, torna a intentar" });
        } else if (resultat === null) {
            res.render('solicitar', { message: "No ets elegible per ser acreditat a la zona blava" });
        } else {
            mongo.buscar(dni, matricula, function(err, data) {
                if (err) {
                    res.render('solicitar', { message: "Error, torna a intentar" });
                } else if (data !== null) {
                    res.render('solicitar', { message: "Ja hi ha una solicitud amb aquest dni i matrícula en curs" });
                } else {
                    mongo.solicitar(dni, matricula, correu, function(err, data) {
                        if (err) {
                            res.render('solicitar', { message: "Error, torna a intentar" });
                        } else {
                            res.render('solicitar', { message: "Has solicitat correctament, revisa el teu correu" });
                        }
                    });
                }
            });
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

app.get('*', function(req, res) {
    res.redirect('/');
});

var path = './';
var optionalObj = {'fileName': 'matricula', 'type':'png'};

io.on('connection', function (socket) {
    socket.on('image', function (data) {
        base64ToImage(data.src,path,optionalObj);
        cmd.get(
            'curl -X POST -F image=@matricula.png "https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=eu&secret_key=sk_482e5e15d9d326b4c05421c9"',
            function(err, data, stderr) {
                var obj = JSON.parse(data);
                var matricula = obj.results[0].plate;
                console.log(matricula);
                mongo.verificar(matricula, function(err, data) {
                    if (err) {
                        res.send('Error');
                    } else {
                        socket.emit('matricula', { matricula: matricula, autoritzat: data });
                    }
                });
            }
        );
    });
});

server.listen(80, function() {
    console.log('EasyZone corrent al port 80!');
});