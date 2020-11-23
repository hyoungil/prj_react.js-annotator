const express = require("express");
const app = express();
const fs = require('fs');
const port = 8002;
const server = require("http").Server(app);
const elasticRoute = require('./routes/elasticSearch');
const dataRoute = require('./routes/data');
const path = require('path');
const parser = require('body-parser')
const winston = require('winston');
// const io = require("socket.io")(server);
const cors = require("cors");
const elastic = require("elasticsearch");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());

// inject routes

// app.set('views', path.join(__dirname, 'views'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
app.use('/api', require('./routes/media'));
app.use(express.static(path.join(__dirname, 'views')));


global.client = new elastic.Client({
    host: '127.0.0.1:9200'
})

global.client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        // console.trace("elasticsearch Cluster is donw");
        console.log(`############## Elasticsearch Cluster Is Donw=======>##############`);
    } else {
        console.log(`############## Elasticsearch Cluster Is Run=======>##############`);
        // console.log("elasticsearch all is well")
    }
})



server.listen(port, () => {
    console.log('############## ##############  ##############');
    console.log(`############## listening on IP ${getIPAddress()}=======>##############`);
    console.log(`############## listening on port ${port}=======>##############`);
    checkConnection()
    elasticRoute.indices()
    dataRoute.createFakeData()
});

app.get("*", (req, res) => {
    console.log("=================get")
    // res.sendfile(path.join(__dirname, 'views/index.html'));
})

function getIPAddress() {
    let interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }
    return '127.0.0.1';
}

/** Check the ES connection status */
async function checkConnection() {
    let isConnected = false
    while (!isConnected) {
        console.log('############## Connecting to Elastic Search=======>##############');
        try {
            const health = await global.client.cluster.health({})
            isConnected = true
        } catch (err) {
            console.log('Connection Failed, Retrying...', err)
        }
    }
}

// winstone log
function winstonTimeStamp() {
    let d = new Date();
    let timeStamp = "[" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "]" + " " + "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]";
    return timeStamp;
};

let logDirectory = __dirname + '/log';

if (fs.existsSync(logDirectory) === false) {
    fs.mkdirSync(logDirectory);
};

winston.add(winston.transports.DailyRotateFile, {
    level: 'debug',
    json: false,
    filename: logDirectory + '/ect_cloud_dangermidia_',
    datePattern: 'yyyy-MM-dd.log',
    timestamp: winstonTimeStamp
});

console.log = function (msg) {
    winston.info(msg);
};
console.info = function (msg) {

    winston.info(msg);
};

console.error = function (msg) {
    winston.error(msg);
};

console.warn = function (msg) {
    winston.warn(msg);
};

console.debug = function (msg) {
    winston.debug(msg);
};

