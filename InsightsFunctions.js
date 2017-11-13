var csv = require('fast-csv');
var PriorityQueue = require('fastpriorityqueue');

module.exports = function(lat, long, neighbors) {
	var q = new PriorityQueue(function(a, b) { return a.distance < b.distance });
	return new Promise((resolve, reject) => {
		csv.fromPath('data/listings.csv', {headers: true})
			.on("data", (data) => {
				if (parseInt(data.number_of_reviews) >= 10) {
					var distance = Math.sqrt(Math.pow((parseFloat(data.latitude) - lat), 2) + Math.pow((parseFloat(data.longitude) - long), 2), 2);
					q.add({"distance":distance, 
						"price":parseFloat(data.price.substring(1)), 
						"latitude":parseFloat(data.latitude), 
						"longitude":parseFloat(data.longitude) });
				}
			})
			.on("end", () => {
				var data = [];
				for (var i = 0; i < neighbors; i++) {
					data.push(q.poll());
				}
				q.trim();
				resolve(data);
			})
			.on("error", () => reject);
		});
}
