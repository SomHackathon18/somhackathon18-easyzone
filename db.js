var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/mataro_mobilitat';

module.exports = {
    aparcaments: function (callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                db.collection("parking").find({}).toArray(function(err, result) {
                    callback(err, result);
                    client.close();
                });
            }
        });
    },
    autoritzarZonesprivades: function (matricula, carrer, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var autoritzacio = { matricula: matricula, carrer: carrer };
                db.collection("autoritzacioZonesprivades").insertOne(autoritzacio, function(err, res) {
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
    },
    reservarParking: function (matricula, carrer, horaFi, socVei, callback) {
        MongoClient.connect(url, function(err, client) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error: ', err);
                callback(err, null);
            } else {
                var db = client.db("mataro_mobilitat");
                var aparcament = { matricula: matricula, carrer: carrer, horaIni: Date.now(), horaFi: horaFi, socVei: socVei};
                db.collection("parking").insertOne(aparcament, function(err, res) {
                    callback(err, res);
                    client.close();
                });
            }
        });
    }
}