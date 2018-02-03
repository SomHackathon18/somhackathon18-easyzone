var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mataro_mobilitat';

module.exports = {
    verificar: function (matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("zona_blava").findOne({matricula: matricula, acceptat: true}, function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
    buscarMataro: function (dni, matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("mataro").findOne({dni: dni, matricula: matricula, ciutat: "Mataro"}, function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
    buscar: function (dni, matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("zona_blava").findOne({dni: dni, matricula: matricula}, function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
    solicitar: function (dni, matricula, correu, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var autoritzacio = { dni: dni, matricula: matricula, correu: correu, dataInici: Date.now(), dataFinal: -1, acceptat: false };
                db.collection("zona_blava").insertOne(autoritzacio, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    },
    solicituds: function (callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("zona_blava").find({}).toArray(function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
    acceptar: function (dni, matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var autoritzacio = { dni: dni, matricula: matricula };
                db.collection("zona_blava").update(autoritzacio, {$set: {acceptat: true, dataFinal: Date.now()}}, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    },
    denegar: function (dni, matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var autoritzacio = { dni: dni, matricula: matricula };
                db.collection("zona_blava").update(autoritzacio, {$set: {acceptat: false, dataFinal: Date.now()}}, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    },
    autoritzarCarregadescarrega: function (matricula, carrer, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var autoritzacio = { matricula: matricula, carrer: carrer };
                db.collection("autoritzacioCarregadescarrega").insertOne(autoritzacio, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    }
}