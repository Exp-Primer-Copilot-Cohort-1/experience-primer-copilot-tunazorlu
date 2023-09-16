// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// Read comment list
var commentList = [];

// Create web server
http.createServer(function(request, response){
    var pathname = url.parse(request.url).pathname;

    // If request is GET, show comment page
    if(pathname === '/comment'){
        showComment(request, response);
    }
    // If request is POST, add comment
    else if(pathname === '/comment/add'){
        addComment(request, response);
    }
    // If request is unknown, show 404 error page
    else{
        response.writeHead(404);
        response.end();
    }
}).listen(8080, function(){
    console.log('Server is running...');
});

// Show comment page
function showComment(request, response){
    fs.readFile('comment.html', function(error, data){
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(data);
    });
}

// Add comment
function addComment(request, response){
    var body = '';

    // Get data from request
    request.on('data', function(data){
        body += data;
    });

    // When data is received
    request.on('end', function(){
        var query = qs.parse(body);

        // Add data to comment list
        commentList.push({'name': query.name, 'comment': query.comment});

        // Redirect to comment page
        response.writeHead(302, {'Location': '/comment'});
        response.end();
    });
}