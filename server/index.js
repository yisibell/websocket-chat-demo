

  const WebSocket = require('ws'); //引入模块
  const axios = require("axios")

  const wss = new WebSocket.Server({ port: 3000 }); //创建一个WebSocketServer的实例，监听端口3000

  console.log("the server has been started at：" , "localhost:3000");

  wss.on('connection', ws => {

    ws.on('message', message => {

      // 调用图灵接口
      tuling(message , res => {
        ws.send( res );  //当收到消息时，在控制台打印出来，并回复一条信息
      })

    
    });

    ws.on('error' , err => {
      console.log( err );
    })

  })


  //图灵请求
  function tuling ( msg , callback){
    var data = {
      "reqType":0,  //请求类型， 0 文本
        "perception": {
            "inputText": {
                "text": msg  //请求文本内容
            }
        },
        "userInfo": {
            "apiKey": "8f09a3c9d22b4b7ab47d7551f9ad3d7b",  //机器人标识
            "userId": "1024"  //用户唯一id
        }
    }

    data = JSON.stringify(data)

    axios({
      method: "post",
      url: "http://openapi.tuling123.com/openapi/api/v2",
      headers: {"Content-Type" : "application/json;charset=utf-8"},
      data
    })
    .then( res => {
      var result = res.data.results[0];
      var type = result.resultType;
      var con = result.values;
      var data = "";

      console.log( type );

      if ( type == "text" )
      data = con.text;
      else if ( type == "url" )
      data = con.url;

      callback && callback(data)
    })
    .catch( err => {
      console.log( err );
    })
    

  }

