const express = require('express');
const elasticsearch = require('elasticsearch');

const router = express.Router();
var SearchEngine = module.exports = {}

let handleResolvePropoty = {}


SearchEngine.createIndex = function (index, type, data) {
    let bulkBody = [];
    let contentName = "";
    data.forEach(item => {
        bulkBody.push({
            index: {
                _index: index,
                _type: type,
                _id: item.name
            }
        })
        contentName = item.name;
        bulkBody.push(item);
    });
    return global.client.bulk({ body: bulkBody })
        .then(response => {
            // console.log("here in response of bulk");
            let error = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++error, item.index.error);
                }
            });
            handleResolvePropoty = {
                'rescode': 200,
                'func': "createIndex",
                'index': index,
                'method': "put",
                'logSaveFlag': "y",
                'dateTime': getDateTimeFunc(),
                'message': "createIndex",
                'contentName': contentName
            };
            handleResolve(handleResolvePropoty);
            // console.log(`Successfully indexed ${data.length - error} out of ${data.length} items`)
            // return response;
            return "200";
        })
        .catch(err => {
            handleResolvePropoty = {
                'rescode': 400,
                'func': "createIndex",
                'index': index,
                'method': "put",
                'logSaveFlag': "n",
                'dateTime': getDateTimeFunc(),
                'message': "createIndex",
                'contentName': contentName
            };
            handleResolve(handleResolvePropoty);
            return "400";
        })
}

SearchEngine.search = (query) => {
    let name = ""
    // console.log(query)
    try {
        if (query.match) {
            name = query.match.imgIdx;
        }
    } catch (error) {
        
    }

    return global.client.search({ index: 'my_labal_list', body: query })
        .then((resp) => {
            handleResolvePropoty = {
                'rescode': 200,
                'func': "search",
                'index': 'my_labal_list',
                'method': "get",
                'logSaveFlag': "n",
                'dateTime': getDateTimeFunc(),
                'message': "search",
                'contentName': name
            };
            handleResolve(handleResolvePropoty);
            // console.log(`found ${resp.hits.total} items in ${resp.took}ms`);
            return { 'results': resp.hits.hits, 'time': resp.took, 'total': resp.hits.total, 'solt': resp };
        })
        .catch(err => {
            // console.log(err)
            handleResolvePropoty = {
                'rescode': 400,
                'func': "search",
                'index': 'my_labal_list',
                'method': "get",
                'logSaveFlag': "n",
                'dateTime': getDateTimeFunc(),
                'message': "search",
                'contentName': name
            };
            handleResolve(handleResolvePropoty);
            return "400";
        })
}

SearchEngine.indices = function () {
    return global.client.cat.indices({ v: true })
        .then((response) => {
            setterCreateIndexTable("my_labal_list", function (res) {
                if (res) {
                }
            })
        })
        .catch(err => console.error(`Error connecting to es global.client ${err}`))
}
SearchEngine.chackingIndex = function (indexName) {
    // return global.client.cat.indices({ v: true })
    //     .then(console.log("---------------indices SUCCESS"))
    //     .catch(err => console.error(`Error connecting to es global.client ${err}`))
    return global.client.indices.exists({ index: indexName })
        .then(res => {
            // console.log(res)
            return res
        }).catch(error => {
            return "ERROR"
        })
}

/**
 * @param  {[indexName]}
 * @return {[{acknowledge: true}]}
 */
SearchEngine.deleteIndex = (index) => {
    return global.client.delete({
        index: index
    });

}

/**
 * [description]
 * @param  {[string]} search string
 * @param  {[string]} index name
 * @return {[json]}  suggestion json
 */
// SearchEngine.suggest = (param, index) => {
SearchEngine.suggest = (index) => {
    // console.log(index)
    return global.client.search({
        index: index,
        // body: {
        //     mysuggester: {
        //         text: param,
        //         term: {
        //             field: 'name'
        //         }
        //     }
        // }
    })
}

SearchEngine.updateByQuery = (index, id, bodyData) => {
    console.log(index)
    console.log(bodyData)
    return global.client.update({
        index: index,
        type: '_doc',
        id: id,
        refresh: true,
        body: {
            script: {
                source: 'ctx._source["labelList"].add(params.label)',
                params: {
                    label: bodyData
                    // imglist: {
                    //     colors: 4,
                    //     name: "Leon",
                    //     breed: "Persian"
                    // }
                }
            }
        }
    }).then((resp) => {
        console.log(resp)
        handleResolvePropoty = {
            'rescode': 200,
            'func': "updateByQuery",
            'index': "my_labal_list",
            'method': "post",
            'logSaveFlag': "y",
            'dateTime': getDateTimeFunc(),
            'message': "post",
            'contentName': id
        };
        handleResolve(handleResolvePropoty);
        return "200";
        // return { 'results': resp.hits.hits, 'time': resp.took, 'total': resp.hits.total };
    }).catch(((error) => {
        console.log(error)
        handleResolvePropoty = {
            'rescode': 400,
            'func': "updateByQuery",
            'index': "my_labal_list",
            'method': "post",
            'logSaveFlag': "n",
            'dateTime': getDateTimeFunc(),
            'message': "post",
            'contentName': id
        };
        handleResolve(handleResolvePropoty);
        return "400";
    }))
}
SearchEngine.deleteByQuery = (index, id, dataIndex) => {
    return global.client.updateByQuery({
        index: index,
        type: '_doc',
        refresh: true,
        body: {
            script: {
              source: 'ctx._source.labelList.remove('+dataIndex+')'
            },
            query: {
              term: {
                '_id': id
              }
            }
          }
    }).then((resp) => {
        console.log(resp)
        handleResolvePropoty = {
            'rescode': 200,
            'func': "deleteByQuery",
            'index': "my_labal_list",
            'method': "del",
            'logSaveFlag': "y",
            'dateTime': getDateTimeFunc(),
            'message': "post",
            'contentName': id
        };
        handleResolve(handleResolvePropoty);
        return "200";
        // return { 'results': resp.hits.hits, 'time': resp.took, 'total': resp.hits.total };
    }).catch(((error) => {
        console.log(error)
        handleResolvePropoty = {
            'rescode': 400,
            'func': "deleteByQuery",
            'index': "my_labal_list",
            'method': "del",
            'logSaveFlag': "n",
            'dateTime': getDateTimeFunc(),
            'message': "post",
            'contentName': id
        };
        handleResolve(handleResolvePropoty);
        return "400";
    }))
}
function getDateTimeFunc() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1; //January is 0!
    var dd = today.getDate();
    if (mm < 10) {
        mm = '0' + mm
    }
    if (dd < 10) {
        dd = '0' + dd
    }
    var msg1 = today.getHours();
    if (msg1 < 10) {
        msg1 = "0" + msg1;
    }
    var msg2 = today.getMinutes();
    if (msg2 < 10) {
        msg2 = "0" + msg2;
    }
    var msg3 = today.getSeconds();
    if (msg3 < 10) {
        msg3 = "0" + msg3;
    }
    // "@timestamp" : "2016-11-01T23:59:59",
    return yyyy + "-" + mm + "-" + dd + "T" + msg1 + ":" + msg2 + ":" + msg3;

}

function handleResolve(body) {

    let rescode = body.rescode;
    let func = body.func;
    let index = body.index;
    let method = body.method;
    let logSaveFlag = body.logSaveFlag;
    let dateTime = body.dateTime;
    let message = body.message;
    let contentName = body.contentName;

    let consoleStr = rescode + " " + func + " " + index + " " + method + " " + logSaveFlag + " " + dateTime + " " + message + " " + contentName
    if (body.rescode == 200) {
        // console.log('\x1b[32m' + 'Success ' + consoleStr + '\x1b[37m');
        console.log('############## HandleResolve ES OK MSG ############## \n' + consoleStr);
        console.log('############## ################ ##############');
    } else if (body.rescode == 400) {
        console.log('############## HandleResolve ES ERROR MSG ############## \n' + consoleStr);
        console.log('############## ################ ##############');
        // console.log('\x1b[33m' + 'Failed ' + consoleStr + '\x1b[37m');
    }
    if (logSaveFlag == 'y') {
        // saveLog(body)
    }

    return Promise.resolve();
}

function setterCreateIndexTable(tableName, callback) {
    global.client.indices.exists({ index: tableName }).then(res => {
        if (!res) {
            global.client.indices.create({
                index: tableName,
                body: {
                    settings: {
                        index: {
                            number_of_replicas: 0 // for local development
                        }
                    }
                }
            }).then((resp) => {
                handleResolvePropoty = {
                    'rescode': 200,
                    'func': "indices",
                    'index': tableName,
                    'method': "post",
                    'logSaveFlag': "n",
                    'dateTime': getDateTimeFunc(),
                    'message': "start Node, Elk Server and IndexCheck========>" + tableName,
                    'contentName': ""
                };
                handleResolve(handleResolvePropoty);
                callback('S')
            }).catch(err => {
                handleResolvePropoty = {
                    'rescode': 400,
                    'func': "indices",
                    'index': tableName,
                    'method': "post",
                    'logSaveFlag': "n",
                    'dateTime': getDateTimeFunc(),
                    'message': "start Node, Elk Server and IndexCheck========>" + tableName,
                    'contentName': ""
                };
                handleResolve(handleResolvePropoty);
                callback('E')
            });
        } else {
            handleResolvePropoty = {
                'rescode': 200,
                'func': "indices",
                'index': tableName,
                'method': "post",
                'logSaveFlag': "n",
                'dateTime': getDateTimeFunc(),
                'message': "start Node, Elk Server and IndexCheck========>" + tableName,
                'contentName': ""
            };
            handleResolve(handleResolvePropoty);
            callback('S')
        }
    }).catch(error => {
        handleResolvePropoty = {
            'rescode': 200,
            'func': "indices",
            'index': tableName,
            'method': "post",
            'logSaveFlag': "n",
            'dateTime': getDateTimeFunc(),
            'message': "start Node, Elk Server and IndexCheck========>" + tableName,
            'contentName': ""
        };
        handleResolve(handleResolvePropoty);
        callback('E')
    })
}
