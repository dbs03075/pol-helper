var http = require('http');
var fs = require('fs'); 
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;


    console.log(queryData.id); // 여기에 커리스트링이 반영
    // console.log(url.parse(_url, true).pathname);

    if(_url == '/'){
      title = '/movie-app.html';
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }

    response.writeHead(200);
    response.end(queryData.id);

    

    }); 



app.listen(3000);