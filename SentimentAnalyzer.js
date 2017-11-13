var sentiment = require('sentiment');
var csv = require('fast-csv');

var neighborhoodRatings = new Map();
var neighborhoodCounts = new Map();
var listingNeighborhoods = new Map();

console.log('Started program');
new Promise((resolve, reject) => {
	console.log('Started parsing listings');
	csv.fromPath('data/listings.csv', {headers: true})
		.on('data', (data) => {
			if (!neighborhoodRatings.has(data.neighbourhood) || data.neighbourhood.length < 50) {
				neighborhoodRatings.set(data.neighbourhood, 0);
				neighborhoodCounts.set(data.neighbourhood, 0);
			}
			listingNeighborhoods.set(parseInt(data.id), data.neighbourhood);
		})
		.on('end', () => {console.log('Finished parsing listings'); resolve();})
		.on('error', () => reject);
	})
.then((ratings) => {
	new Promise((resolve, reject) => {
		console.log('Started parsing');
		csv.fromPath('data/reviews.csv', {headers: true})
			.on('data', (data) => {
				var score = sentiment(data.comments).score;
				var neighborhood = listingNeighborhoods.get(parseInt(data.listing_id));
				var currentRating = neighborhoodRatings.get(neighborhood);
				currentRating += score;
				neighborhoodRatings.set(neighborhood, currentRating);

				var currentCount = neighborhoodCounts.get(neighborhood);
				currentCount = currentCount + 1;
				neighborhoodCounts.set(neighborhood, currentCount);
			})
			.on('end', () => {
				for (var pair of neighborhoodCounts.entries()) {
					if (pair[1] > 0) {
						neighborhoodRatings.set(pair[0], neighborhoodRatings.get(pair[0])/pair[1]);
					}
				}
				var neighborhoodPair = Array.from(neighborhoodRatings).reduce((max, next) => { return max[1] > next[1] ? max : next });
				console.log(neighborhoodRatings);
				console.log(neighborhoodCounts);
				
				console.log('Finished parsing: ' + neighborhoodPair[0] + " won with " + neighborhoodPair[1] + " ratings!");
				resolve(neighborhoodPair);
			})
			.on('error', () => reject);
	});
}, (error) => console.error(error))
.then(console.log, console.error);


