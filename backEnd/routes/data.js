const express = require('express');
const elasticsearch = require('elasticsearch');

const router = express.Router();
var SetFakeData = module.exports = {}
const Engine = require('./elasticSearch');
const Youtube = require('youtube-node');
const request = require('request');
var http = require('http'),
    Stream = require('stream').Transform,
    fs = require('fs');


let handleResolvePropoty = {}


SetFakeData.createFakeData = async function (index, type, data) {
    let list = [
        {
            "imgId": "gVr0HvtE6Y4",
            "imgIdx": "0",
            "url": "https://img.youtube.com/vi/gVr0HvtE6Y4/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/gVr0HvtE6Y4.jpg?dummy=5917f17c-e95f-4327-a0ae-115b60143b23"
        },
        {
            "imgId": "cy2PpnkA_kk",
            "imgIdx": "1",
            "url": "https://img.youtube.com/vi/cy2PpnkA_kk/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/cy2PpnkA_kk.jpg?dummy=937497e9-a143-4869-aa33-0339805b5cf9"
        },
        {
            "imgId": "9iQV5fS-z9g",
            "imgIdx": "2",
            "url": "https://img.youtube.com/vi/9iQV5fS-z9g/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/9iQV5fS-z9g.jpg?dummy=bfdb6f7b-28b5-4b45-81c8-9e5a06278cf4"
        },
        {
            "imgId": "I9hp8u2-rDI",
            "imgIdx": "3",
            "url": "https://img.youtube.com/vi/I9hp8u2-rDI/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/I9hp8u2-rDI.jpg?dummy=1dc39502-d543-413e-942a-3dd0afd5044f"
        },
        {
            "imgId": "UfgJIDTyo_U",
            "imgIdx": "4",
            "url": "https://img.youtube.com/vi/UfgJIDTyo_U/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/UfgJIDTyo_U.jpg?dummy=0f581930-8400-4c52-8493-79493e1d679a"
        },
        {
            "imgId": "jBFQE-KkaZs",
            "imgIdx": "5",
            "url": "https://img.youtube.com/vi/jBFQE-KkaZs/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/jBFQE-KkaZs.jpg?dummy=250b09d2-e5d3-44e3-b158-2a8038b3b374"
        },
        {
            "imgId": "-FmPNomFC7Y",
            "imgIdx": "6",
            "url": "https://img.youtube.com/vi/-FmPNomFC7Y/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/-FmPNomFC7Y.jpg?dummy=bc0c5035-b93a-4309-a332-a8684d380990"
        },
        {
            "imgId": "d4KQy82txBA",
            "imgIdx": "7",
            "url": "https://img.youtube.com/vi/d4KQy82txBA/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/d4KQy82txBA.jpg?dummy=81ccd36f-8450-4a09-9341-d71123738997"
        },
        {
            "imgId": "S4BNhNTA0_o",
            "imgIdx": "8",
            "url": "https://img.youtube.com/vi/S4BNhNTA0_o/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/S4BNhNTA0_o.jpg?dummy=6236fa84-e083-4108-afe2-68188c179e7d"
        },
        {
            "imgId": "Lf5MZuVB-oQ",
            "imgIdx": "9",
            "url": "https://img.youtube.com/vi/Lf5MZuVB-oQ/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/Lf5MZuVB-oQ.jpg?dummy=45104128-7ca5-462d-8570-d365e55b06a2"
        },
        {
            "imgId": "c-s2QJnUe1k",
            "imgIdx": "10",
            "url": "https://img.youtube.com/vi/c-s2QJnUe1k/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/c-s2QJnUe1k.jpg?dummy=b09b4adb-f65c-4604-9c18-6c80e3032088"
        },
        {
            "imgId": "-E1MiJAlML8",
            "imgIdx": "11",
            "url": "https://img.youtube.com/vi/-E1MiJAlML8/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/-E1MiJAlML8.jpg?dummy=64d33540-b648-4c31-9959-e9aa8188b97b"
        },
        {
            "imgId": "zgW7gZzT6us",
            "imgIdx": "12",
            "url": "https://img.youtube.com/vi/zgW7gZzT6us/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/zgW7gZzT6us.jpg?dummy=6d28eca1-d88f-471b-bc76-ea46d82e9bc5"
        },
        {
            "imgId": "PGRlBtFk7zM",
            "imgIdx": "13",
            "url": "https://img.youtube.com/vi/PGRlBtFk7zM/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/PGRlBtFk7zM.jpg?dummy=50d60289-c37e-4c6c-a7d3-57e0eaafd6d8"
        },
        {
            "imgId": "jZzZVUWKku4",
            "imgIdx": "14",
            "url": "https://img.youtube.com/vi/jZzZVUWKku4/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/jZzZVUWKku4.jpg?dummy=217b42a3-0489-46d1-804e-241a5f112019"
        },
        {
            "imgId": "RhnSbn-TigM",
            "imgIdx": "15",
            "url": "https://img.youtube.com/vi/RhnSbn-TigM/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/RhnSbn-TigM.jpg?dummy=4131e94a-e951-44c0-bbac-39f272a82f4e"
        },
        {
            "imgId": "D6QfylCOHq4",
            "imgIdx": "16",
            "url": "https://img.youtube.com/vi/D6QfylCOHq4/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/D6QfylCOHq4.jpg?dummy=11e2aa87-684d-42fa-80ce-87237c7b87a4"
        },
        {
            "imgId": "NCFMLuvd5Ko",
            "imgIdx": "17",
            "url": "https://img.youtube.com/vi/NCFMLuvd5Ko/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/NCFMLuvd5Ko.jpg?dummy=00a27c46-703c-4c3d-b54a-804bc1ea6dcf"
        },
        {
            "imgId": "UpV21VfzZ80",
            "imgIdx": "18",
            "url": "https://img.youtube.com/vi/UpV21VfzZ80/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/UpV21VfzZ80.jpg?dummy=8da31ff6-752c-45d9-8be7-38467f6fe64f"
        },
        {
            "imgId": "OPwH18ZGrJo",
            "imgIdx": "19",
            "url": "https://img.youtube.com/vi/OPwH18ZGrJo/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/OPwH18ZGrJo.jpg?dummy=df1c776f-d22c-49bd-a4ea-ec39be43e0f7"
        },
        {
            "imgId": "FwcxMOtijew",
            "imgIdx": "20",
            "url": "https://img.youtube.com/vi/FwcxMOtijew/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/FwcxMOtijew.jpg?dummy=1084d9bd-5f50-4c0a-8cf6-6177ada04105"
        },
        {
            "imgId": "8E8c10r8u5I",
            "imgIdx": "21",
            "url": "https://img.youtube.com/vi/8E8c10r8u5I/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/8E8c10r8u5I.jpg?dummy=1e8265a5-408c-47b5-a879-0b5f7432790f"
        },
        {
            "imgId": "SOZVI3JpkBg",
            "imgIdx": "22",
            "url": "https://img.youtube.com/vi/SOZVI3JpkBg/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/SOZVI3JpkBg.jpg?dummy=ae24b319-9c71-43bb-8f9c-aa500b7194c0"
        },
        {
            "imgId": "XfTRLXwt4Hw",
            "imgIdx": "23",
            "url": "https://img.youtube.com/vi/XfTRLXwt4Hw/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/XfTRLXwt4Hw.jpg?dummy=93cfe719-f586-4612-a2fc-83def3585f4d"
        },
        {
            "imgId": "GIPGzmnB27c",
            "imgIdx": "24",
            "url": "https://img.youtube.com/vi/GIPGzmnB27c/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/GIPGzmnB27c.jpg?dummy=d8566fca-8034-4d38-9d75-62b51d7c58cf"
        },
        {
            "imgId": "U_dQs_NDFMk",
            "imgIdx": "25",
            "url": "https://img.youtube.com/vi/U_dQs_NDFMk/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/U_dQs_NDFMk.jpg?dummy=6ebf5bfd-4d0b-4406-8f6b-874ac392b445"
        },
        {
            "imgId": "BxyY2oPopAw",
            "imgIdx": "26",
            "url": "https://img.youtube.com/vi/BxyY2oPopAw/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/BxyY2oPopAw.jpg?dummy=d1e3e027-3fed-4a7c-a578-6637ec51a685"
        },
        {
            "imgId": "Mr5g9gYlyss",
            "imgIdx": "27",
            "url": "https://img.youtube.com/vi/Mr5g9gYlyss/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/Mr5g9gYlyss.jpg?dummy=9b00f9ac-c16b-4de2-94ba-ca7452f032e0"
        },
        {
            "imgId": "Pb7_nnjatNA",
            "imgIdx": "28",
            "url": "https://img.youtube.com/vi/Pb7_nnjatNA/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/Pb7_nnjatNA.jpg?dummy=0193e633-1ab4-45ad-b9c9-1db54f6cd134"
        },
        {
            "imgId": "dfyEDxWY8ZY",
            "imgIdx": "29",
            "url": "https://img.youtube.com/vi/dfyEDxWY8ZY/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/dfyEDxWY8ZY.jpg?dummy=b6f6fec0-160d-44c8-8bae-f789d52c5a8b"
        },
        {
            "imgId": "cefp3ieV0Yc",
            "imgIdx": "30",
            "url": "https://img.youtube.com/vi/cefp3ieV0Yc/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/cefp3ieV0Yc.jpg?dummy=e4883084-5aa5-4cb1-b275-ff43f085f27b"
        },
        {
            "imgId": "GhByBg-soek",
            "imgIdx": "31",
            "url": "https://img.youtube.com/vi/GhByBg-soek/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/GhByBg-soek.jpg?dummy=365ab99b-f1e7-41ff-b414-8c8cc4c33b05"
        },
        {
            "imgId": "N2ZARnmvJfM",
            "imgIdx": "32",
            "url": "https://img.youtube.com/vi/N2ZARnmvJfM/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/N2ZARnmvJfM.jpg?dummy=204fea84-a537-4a73-bc28-fa83bc3c782d"
        },
        {
            "imgId": "ByOcnTPoSbw",
            "imgIdx": "33",
            "url": "https://img.youtube.com/vi/ByOcnTPoSbw/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/ByOcnTPoSbw.jpg?dummy=e010ab27-aa37-4197-a9eb-23563d22bc12"
        },
        {
            "imgId": "_c4_c8ZrEPw",
            "imgIdx": "34",
            "url": "https://img.youtube.com/vi/_c4_c8ZrEPw/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/_c4_c8ZrEPw.jpg?dummy=5316b8b7-2c6a-4f5c-bdaf-a43bec2a1759"
        },
        {
            "imgId": "yzwyvnbgEA8",
            "imgIdx": "35",
            "url": "https://img.youtube.com/vi/yzwyvnbgEA8/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/yzwyvnbgEA8.jpg?dummy=640f2cce-5775-4f9e-b58f-d041dadb1a05"
        },
        {
            "imgId": "0KrC2DrD0QQ",
            "imgIdx": "36",
            "url": "https://img.youtube.com/vi/0KrC2DrD0QQ/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/0KrC2DrD0QQ.jpg?dummy=9748035e-4b6d-4cf6-9443-cafc8f408d3e"
        },
        {
            "imgId": "jjysw4EZJIw",
            "imgIdx": "37",
            "url": "https://img.youtube.com/vi/jjysw4EZJIw/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/jjysw4EZJIw.jpg?dummy=2f6b917e-7106-4792-ad9e-de4849eb6689"
        },
        {
            "imgId": "Oc_Fv0jEmII",
            "imgIdx": "38",
            "url": "https://img.youtube.com/vi/Oc_Fv0jEmII/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/Oc_Fv0jEmII.jpg?dummy=372c2730-74df-4aa4-9f67-166e724ad9fa"
        },
        {
            "imgId": "J2MsSEkI58E",
            "imgIdx": "39",
            "url": "https://img.youtube.com/vi/J2MsSEkI58E/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/J2MsSEkI58E.jpg?dummy=87d05aab-3150-48ab-8fda-4b4f1c128174"
        },
        {
            "imgId": "jJOBnuW2BPI",
            "imgIdx": "40",
            "url": "https://img.youtube.com/vi/jJOBnuW2BPI/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/jJOBnuW2BPI.jpg?dummy=68458ced-04f6-4fba-8411-61f05941b906"
        },
        {
            "imgId": "N8Z_qqWOEAQ",
            "imgIdx": "41",
            "url": "https://img.youtube.com/vi/N8Z_qqWOEAQ/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/N8Z_qqWOEAQ.jpg?dummy=a0046ee0-54fe-485b-be44-737909202e7e"
        },
        {
            "imgId": "ag6flQVcXeg",
            "imgIdx": "42",
            "url": "https://img.youtube.com/vi/ag6flQVcXeg/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/ag6flQVcXeg.jpg?dummy=22a6d304-42d1-422f-a07f-263e6c44f030"
        },
        {
            "imgId": "klTMUCqtxwg",
            "imgIdx": "43",
            "url": "https://img.youtube.com/vi/klTMUCqtxwg/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/klTMUCqtxwg.jpg?dummy=c46392db-f3e9-426a-adcd-ec9a6de02be4"
        },
        {
            "imgId": "JMvPauV94yI",
            "imgIdx": "44",
            "url": "https://img.youtube.com/vi/JMvPauV94yI/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/JMvPauV94yI.jpg?dummy=7d9e9ec2-9338-4840-8f92-9986a1a636b1"
        },
        {
            "imgId": "BFoTmruNWXg",
            "imgIdx": "45",
            "url": "https://img.youtube.com/vi/BFoTmruNWXg/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/BFoTmruNWXg.jpg?dummy=b755f481-5240-4ecc-9884-054d66b681e0"
        },
        {
            "imgId": "3AI7ZfK-8h4",
            "imgIdx": "46",
            "url": "https://img.youtube.com/vi/3AI7ZfK-8h4/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/3AI7ZfK-8h4.jpg?dummy=1ad714a4-148e-4da3-ba3c-5795863e7297"
        },
        {
            "imgId": "_NxjZE-7B6c",
            "imgIdx": "47",
            "url": "https://img.youtube.com/vi/_NxjZE-7B6c/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/_NxjZE-7B6c.jpg?dummy=12477c0a-a3d9-4f15-a341-846d55197385"
        },
        {
            "imgId": "HrgmDjCaOTc",
            "imgIdx": "48",
            "url": "https://img.youtube.com/vi/HrgmDjCaOTc/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/HrgmDjCaOTc.jpg?dummy=19331f9f-4da9-4e8d-ac5f-2c737eb8c9b9"
        },
        {
            "imgId": "8gxvrvSzaQk",
            "imgIdx": "49",
            "url": "https://img.youtube.com/vi/8gxvrvSzaQk/hqdefault.jpg",
            "dir": "http://127.0.0.1:8002/8gxvrvSzaQk.jpg?dummy=cdd62176-d2f6-4175-87ab-49ce1a670950"
        }
    ];
    for (var i = 0; i < list.length; i++) {
        // var base64str = base64_encode('salvarDocumento.png');
        var x = list[i].dir.split("?dummy");
        var y = x[0].split("8002/");
        var z = base64_encode("./views/" + y[1]);
        list[i].base64str = "data:image/jpeg;base64," + z;
    }
    for (var i = 0; i < list.length; i++) {
        let insetInitialData = [
            {
                "name": list[i].imgId,
                "imgIdx": parseInt(list[i].imgIdx),
                "url": list[i].url,
                "dir": list[i].dir,
                "base64str": list[i].base64str,
                "labelList": [],
                "viewFlag": false
            }
        ]
        // if (res) {
        let [insertResData] = await Promise.all([insertElasticeData("my_labal_list", insetInitialData)]).then(data => data).catch((err) => {
            if (err) {
                res.send({
                    rescode: 400,
                });
                return;
            }
        })
        // }
    }
}
async function insertElasticeData(index, newData) {
    return await new Promise(async function (resolve, reject) {
        await Engine.createIndex(index, "_doc", newData).then(
            result => {
                resolve(result)
            }, (error) => {
                resolve(error)
            }
        )
    })
}
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}


 // var youtube = new Youtube();
    // console.log("=============axios.defaults.withCredentials = true;axios.defaults.withCredentials = true;axios.defaults.withCredentials = true;")
    // var word = '사람'; // 검색어 지정
    // var limit = 1000;  
    // let youtubeKey = "AIzaSyCCWZrgo9rtL3_7C_7SAT6kV-egTzv-4_U";
    // youtube.setKey(youtubeKey); 

    // //// 검색 옵션 시작
    // youtube.addParam('order', 'rating'); 
    // youtube.addParam('type', 'video');  
    // youtube.addParam('videoLicense', 'creativeCommon'); 
    // //// 검색 옵션 끝

    // youtube.search(word, limit, async function (err, result) {
    //     if (err) { console.log(err); return; } 

    //     // console.log(JSON.stringify(result, null, 2)); 
    //     var items = result["items"]; 
    //     for (var i in items) {
    //         var it = items[i];
    //         var title = it["snippet"]["title"];
    //         var video_id = it["id"]["videoId"];
    //         var url = "https://img.youtube.com/vi/" + video_id + "/hqdefault.jpg";
    //         var dir = "http://127.0.0.1:8002/" + video_id + ".jpg?dummy="+guid_create();
    //         list.push({
    //             imgId: video_id,
    //             imgIdx: i,
    //             url: url,
    //             dir: dir
    //         })
    //         // console.log("-----------");
    //         const path = './views/' + video_id + ".jpg"
    //         downloadYoutubeImage(url, path, async function (res) {
    //             // console.log(res)
    //             console.log('✅ Done!')
    //         })
    //     }


    // function downloadYoutubeImage(url, path, callback) {
    //     request.head(url, (err, res, body) => {
    //         request(url)
    //             .pipe(fs.createWriteStream(path))
    //             .on('close', function () {
    //                 callback("close")
    //             }
    //             )
    //     })
    // }
    