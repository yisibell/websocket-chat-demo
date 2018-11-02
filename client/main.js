
var app = document.querySelector("#app"),
    list = document.querySelector("#app .list"),
    msg = document.querySelector(".msg"),
    launch = document.querySelector(".launch");

var ws = new WebSocket("ws://localhost:3000");


ws.onopen = function(e){
  console.log( "连接打开..." );
}

ws.onmessage = function(e){
 
  var msg = e.data
  insert(msg , "left")

}


ws.onclose = function(e){
  console.log( e );
}

ws.onerror = function(err){
  console.log( err );
}

launch.onclick = function(e){

  e.preventDefault();
  send();
}

document.addEventListener("keyup" , function(e){
 
  var keyCode = e.keyCode;
  if ( keyCode === 13 )
  send();
})


// 插入聊天池
function insert (msg , pos){
  var li = document.createElement("li")
  li.innerHTML = msg;
  li.className = pos;
  list.appendChild(li)

  var li_top = li.offsetTop;

  list.scrollTo( 0, li_top)
}

// 发送数据
function send() {
  var m = msg.value;
  insert(m , "right")
  msg.value = "";
  ws.send(m)
}
