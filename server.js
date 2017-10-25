var express = require("express");
var app = express();

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

app.post("/here", function(req, res) {
	res.status(200).json({message: 'Hello World!'});
});
