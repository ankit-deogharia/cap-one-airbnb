var express = require("express");
var insights = require("./InsightsFunctions.js")
var cors = require("cors");
var app = express()

app.use(cors());

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

//API endpoint for estimating weekly average income and ideal price per night given lat and long
app.get("/getInsights", function(req, res) {
	var lat = parseFloat(req.query.lat);
	var long = parseFloat(req.query.long);
	var neighbors = parseInt(req.query.neighbors);
	console.log("Get Insights request processing with lat = " + lat + " and long = " + long);

	if (!lat || !long) {
		handleError(res, "Invalid user input", "User must provide both latitude and longitude", 400);
	}

	insights(lat, long, neighbors).then(
		(resolve) => res.json(resolve), 
		(reject) => res.status(500).send('Something broke!'));
	// res.json([{ distance: 5, price: 4, latitude: 3, longitude: 2 }, { distance: 5, price: 4, latitude: 3, longitude: 2 }])
});