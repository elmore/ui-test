var http = require('http');
var url = require('url');
var places = require('./data/places.json');

var find = function findF(coll, test) {
	
	var result = [];
	
	for(var i=0; i<coll.length; i++) {
		
		if(test(coll[i].name)) { 
		
			result.push(coll[i]);
		}
	}
	
	return result;
};

var server = http.createServer(function (request, response) {
	
	response.writeHead(200, {"Content-Type": "application/json"});

	var url_parts = url.parse(request.url, true);
	
	if(typeof(url_parts.query.q) != 'string') { response.end(''); return; }
	
	var re = new RegExp('^' + url_parts.query.q.toLowerCase());
	
	var result = find(places, function(val) { return re.test(val.toLowerCase()) });

	response.end(JSON.stringify(result));
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");