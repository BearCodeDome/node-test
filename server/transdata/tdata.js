var transdata = require("transdata");

module.exports = function(req , res , urlObj){
    var size = 0;
    var chunks = [];
    req.on('data' , function(chunk){
        size += chunk.length;
        chunks.push(chunk);
    }).on("end" , function(){
        var data = JSON.parse(Buffer.concat(chunks , size).toString());

        if(data.method == "get"){
            transdata.get({
                res:res,
                url:data.requrl
            })
        }else {
            transdata.post({
                req:data.reqdata,
                res:res,
                url:data.requrl
            })
        }
    })
}