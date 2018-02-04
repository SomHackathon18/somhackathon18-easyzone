var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mataro_mobilitat';

module.exports = {
    robat: function (matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("robats").findOne({matricula: matricula}, function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
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
    reservar: function (matricula, dia, horaInici, horaFi, zona, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var insert = { matricula: matricula, horaInici: horaInici, horaFi: horaFi, zona: zona };
                db.collection("reserves").insertOne(insert, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    },
    reserves: function (callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("reserves").find({}).toArray(function(err, result) {
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
    cotxerobat: function (matricula, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("robats").insertOne({ matricula: matricula }, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    }
}