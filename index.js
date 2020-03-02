console.log("hi");
const express = require('express');
const app = express();

const PORT = 4000;

function handleListening(){
    console.log('Listening on: http://localhost:4000');
}

function handleHome(request, response){ //express에서는 기본적으로 함수를 request, response로 다룬다.
    // console.log(request);
    response.send("Hello from home")
}

function handleProfile(request, response){
    response.send("This is profile page") //단순한 문장이 아닌, HTML,CSS등으로 마크업이 끝난 문서를 보내면 그것이 페이지가 된다.
                                          //또한 잘 짜여진 database까지 포함해서 보내면, 하나의 정적인 홈페이지가 완성되는 것이다.
    
}

app.get("/", handleHome)
app.get("/profile", handleProfile)
app.listen(PORT, handleListening);