var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var mysql = require('mysql');

var app = express();

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "prueba"
});

app.get('/indicadores', function (req, res) {
    request('http://si3.bcentral.cl/Indicadoressiete/secure/Indicadoresdiarios.aspx', function (error, response, html) {
        var $ = cheerio.load(html);

        var json = {
            UF: $('#lblValor1_1').text(),
            USD: $('#lblValor1_3').text(),
            EUR: $('#lblValor1_5').text()
        };

        con.connect(function (err) {
            con.query("INSERT INTO indicadores (uf, usd, eur) VALUES ('" + json.UF + "','" + json.USD + "','" + json.EUR + "')");
        });

        res.json(json);
    });
});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});
