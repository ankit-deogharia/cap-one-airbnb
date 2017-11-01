var express = require("express");
var bodyParser = require("body-parser")
var app = express();

app.use(bodyParser.json());

//Link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

//Base API endpoint
app.get("/", function(req, res) {
	res.send("Hello World");
});

//API endpoint for estimating weekly average income given lat and long
app.post("/average", function(req, res) {
	var lat = req.body.lat;
	var long = req.body.long;

	if (!lat || !long) {
		handleError(res, "Invalid user input", "User must provide both latitude and longitude", 400);
	}

	//Data processing logic goes here
});

//API endpoint for estimating ideal price per night given lat and long
app.post("/average", function(req, res) {
	var lat = req.body.lat;
	var long = req.body.long;

	if (!lat || !long) {
		handleError(res, "Invalid user input", "User must provide both latitude and longitude", 400);
	}

	//Data processing logic goes here
});