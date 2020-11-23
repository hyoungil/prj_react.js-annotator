const express = require('express');
const router = express.Router();
const Engine = require('./elasticSearch');
const { all } = require('q');

router.delete('/unit_data', async function (req, res, next) {
    var imgUuid = req.body.imgUuid;
    var labelIndex = req.body.labelIndex;
    let [queryMathResData] = await Promise.all([deleteElasticeData("my_labal_list", imgUuid, labelIndex)]).then(data => data).catch((err) => {
        res.send({
            rescode: 400,
        });
    })
    if (queryMathResData !== "400") {
        res.send({
            rescode: 200,
        });
    }
})
router.get('/unit_data', async function (req, res, next) {

    var imgIdx = req.query.imgIdx;

    var queryObj = {
        "query": {
            "match": {
                "imgIdx": imgIdx
            }
        }
    }
    let [queryMathResData] = await Promise.all([getElasticeData(queryObj)]).then(data => data).catch((err) => {
        res.send({
            rescode: 400,
        });
    })
    let listObj = {
        rescode: '',
        name: '',
        imgBase64Str: '',
        label: '',
        viewFlag: false
    };
    console.log(queryMathResData.total.value)
    if (queryMathResData.total.value != 0) {
        listObj.rescode = 200
        listObj.imgIdx = queryMathResData.results[0]._source.imgIdx;
        listObj.name = queryMathResData.results[0]._source.name;
        listObj.imgBase64Str = queryMathResData.results[0]._source.base64str;
        let list = [];
        queryMathResData.results[0]._source.labelList.forEach(element => {
            list.push(element.label)
        });
        // listObj.fakeDummyLabalList = queryMathResData.results[0]._source.labelList;
        listObj.label = list;
        await res.json(listObj);
    } else {
        await res.json(listObj);

    }

})
router.get('/get_viewData', async function (req, res, next) {
    let allRecords = [];

    var { _scroll_id, hits } = await global.client.search({
        index: 'my_labal_list',
        type: '_doc',
        scroll: '10s',
        body: {
            query: {
                "match_all": {}
            }
            // _source: false
        }
    })

    while (hits && hits.hits.length) {
        allRecords.push(...hits.hits)


        var { _scroll_id, hits } = await global.client.scroll({
            scrollId: _scroll_id,
            scroll: '10s'
        })
    }

    let solttingList = [];
    if (allRecords.length > 0) {
        try {
            allRecords.forEach(function (element) {
                solttingList.push({
                    imgId: element._source.name,
                    imgIdx: element._source.imgIdx,
                    url: element._source.url,
                    dir: element._source.dir
                })
            })

        } catch (error) {
            console.log(error)
            await res.json([]);
            console.log(error)
            return;
        }
        await res.json(solttingList);
    } else if (allRecords.results === 0) {
        resData['rescode'] = 400;
        await res.json(solttingList);
    }
});




router.put('/library', async function (req, res, next) {

    let imgIdx = req.body.imgIdx;
    let imgName = req.body.imgName;
    let labelList = req.body.imgObj;

    let updateData = {
        label: labelList,
    }
    let updateResData = await Promise.all(
        [updateElasticeData("my_labal_list", imgName, updateData)]).
        then(data => data).catch((err) => {
            if (!err) {
                res.send({
                    rescode: 400,
                });
                return;
            } else {

            }
        })
    if (updateResData !== "400") {
        res.send({
            rescode: 200,
        });
    }else{
            res.send({
                rescode: 400,
            });

    }

});


async function chackingElasticeIndex(index) {
    return await new Promise(async function (resolve, reject) {
        await Engine.chackingIndex(index)
            .then(result => {
                resolve(result);
                // return res.json(result);
            }, (err) => {
                resolve(err);
                // res.send(err)
            })
    })
}
async function getElasticeData(query) {
    return await new Promise(async function (resolve, reject) {
        await Engine.search(query)
            .then(result => {
                resolve(result);
                // return res.json(result);
            }, (err) => {
                resolve(err);
                // res.send(err)
            })
    })
}
async function getElasticeLogData(query, flag) {
    return await new Promise(async function (resolve, reject) {
        await Engine.searchLog(query, flag)
            .then(result => {
                resolve(result);
                // return res.json(result);
            }, (err) => {
                resolve(err);
                // res.send(err)
            })
    })
}
async function insertElasticeData(index, newData) {
    return await new Promise(async function (resolve, reject) {
        await Engine.createIndex(index, "_doc", newData).then(
            result => {
                // console.log("=")
                // console.log(result)
                // resolve("200")
                resolve(result)
            }, (error) => {
                // console.log("1")
                // console.log(error)
                // resolve("400")
                resolve(error)
            }
        )
    })
}
async function updateElasticeData(index, id, data) {
    return await new Promise(async function (resolve, reject) {
        await Engine.updateByQuery(index, id, data)
            .then(result => {
                resolve(result);
            }, (err) => {
                // res.send(err)
                resolve(err);
            })
    })
}
async function deleteElasticeData(index, id, dataIdx) {
    return await new Promise(async function (resolve, reject) {
        await Engine.deleteByQuery(index, id, dataIdx)
            .then(result => {
                resolve(result)
                // return res.json(result);
            }, (err) => {
                resolve(err);
                // res.send(err)
            })
    })
}

module.exports = router;
