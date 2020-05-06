const express = require('express');

var pg = require('pg');

var bodyParser = require('body-parser');

var recombee = require('recombee-api-client');

const moment = require('moment');


// Connect to elasticsearch Server
const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

// Connect to PostgreSQL server
var conString = "pg://postgres:root@127.0.0.1:5432/chicago_divvy_stations_status";

var pgClient = new pg.Client(conString);
pgClient.connect();


var recombeeClient = new recombee.ApiClient('iit-category-dev', 'gmrAcVlO6PilhvsMqrXuglzfMdEqpYfv372d3w7b6HNyYajKR0mLP6Evd59AltqK');
var rqs = recombee.requests;

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

router.all('*', function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

user_details = [];

router.route('/get_user_details').post((req, res) => {
	const query = {
        // give the query a unique name
        name: 'fetch-divvy',
        text: 'INSERT INTO register(firstname, lastname, address, zipcode, username, password, sportsinterested)VALUES ($1, $2, $3, $4, $5, $6, $7)',
        values: [req.body.firstname,req.body.lastname,req.body.address,req.body.zipcode,req.body.username,req.body.password,req.body.sportsinterested]
    }
    get_user_detail_1(query).then(function (response) {
        var hits = response;
        res.json({'details_entered': 'Successfully Retrieved'});
    });

});

// Push rating to recombee
router.route('/send_old_data_to_recombee').post((req, res) => {
	var username = req.body.username;
	var eventname = req.body.eventname;
	var rating = req.body.ratings;
	
	if(rating == 1 || rating == 2){
		rating = -1;
	}
	else if(rating == 3){
		rating = 0;
	}
	else if(rating == 4 || rating == 5){
		rating = 1;
	}
	send_recommendations(username, eventname, rating).then((body) => console.log("success", body));
	
});


// Push rating to recombee
router.route('/send_data_to_recombee').post((req, res) => {
	var username = req.body.username;
	var eventname = req.body.eventname;
	var rating = req.body.ratings;
	
	if(rating == 1 || rating == 2){
		rating = -1;
	}
	else if(rating == 3){
		rating = 0;
	}
	else if(rating == 4 || rating == 5){
		rating = 1;
	}
	send_recommendations(username, eventname, rating).then((body) => console.log("success", body));
	
});

async function send_recommendations(username, eventname, rating){
	
	return await recombeeClient.send(new rqs.AddRating(username, eventname, rating, { 'cascadeCreate': true
	}));
}

//get recommendation from recombee
router.route('/get_recommendation').post((req, res) => {
	get_recommendations(req.body.username).then(function (response) {
        res.json(response);
    });

});


async function get_recommendations(username){
	
	return await recombeeClient.send(new rqs.RecommendItemsToUser(username, 10));
}


async function get_user_detail_1(query) {
	const response = await pgClient.query(query);
}

router.route('/validateUserDetails').post((req, res) => {
	const query = {
		name: 'fetch-validate',
		text: 'select username,password from register where username=$1 and password=$2',
		values: [req.body.username, req.body.password]
	}
	validateDetails(query).then(function (response) {
		var hits = response;
        res.json(response);
    });
});

async function validateDetails(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/get_user_reviewrating').post((req, res) => {
	const query = {
		name: 'UML',
		text: 'Select eventname, reviews, ratings from reviews where username=$1',
		values: [req.body.username]
	}
	fetchReviewRating(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function fetchReviewRating(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/update_user_review_rating').post((req, res) => {
	const query = {
		name: 'update-review-rating',
		text: 'UPDATE reviews SET reviews=$1, ratings=$2 WHERE username=$3 and eventname=$4',
		values: [req.body.reviews, req.body.ratings, req.body.username, req.body.eventname]
	}
	updateReviewRating(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function updateReviewRating(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/draw_charts').get((req, res) => {
	const query = {
		name: 'bar-charts',
		text: 'SELECT DISTINCT eventname, CAST(AVG(ratings) AS DECIMAL(10,2)) FROM public.reviews GROUP BY eventname',
		values: []
	}
	view_chart(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

router.route('/draw_charts_reviews').get((req, res) => {
	const query = {
		name: 'bar-charts_reviews-count',
		text: 'SELECT DISTINCT eventname, count(reviews) FROM public.reviews GROUP BY eventname',
		values: []
	}
	view_chart(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function view_chart(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/view_event_details').post((req, res) => {
	const query = {
		name: 'view_event_details-1',
		text: 'SELECT username, eventname, reviews, ratings FROM reviews where eventname=$1',
		values: [req.body.eventname]
	}
	view_details_hhh(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function view_details_hhh(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/store_categories').post((req, res) => {
	const query = {
		name: 'store-category',
		text: 'SELECT username, eventname, reviews, ratings FROM reviews where eventname=$1',
		values: [req.body.eventname]
	}
	view_details_hhh(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});


router.route('/delete_user_review_rating').post((req, res) => {
	const query = {
		name: 'delete-review-rating',
		text: 'DELETE FROM reviews WHERE username=$1 and eventname=$2',
		values: [req.body.username, req.body.eventname]
	}
	deleteReviewRating(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function deleteReviewRating(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/delete_apiDetails').delete((req, res) => {
	const query = {
		name: 'delete-event-details-********',
		text: 'DELETE FROM apidetails',
		values: []
	}
	deleteAllEventDetails(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function deleteAllEventDetails(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/insert_apiDetails').post((req, res) => {
	var count = Object.keys(req.body).length
	
	for(var i=0; i < count; i++){
		const query = {
		name: 'insert-new-event-details-********',
		text: 'INSERT INTO apidetails(eventname, date, venue, city, category, zipcode) VALUES ($1, $2, $3, $4, $5, $6)',
		values: [req.body[i]['name'], req.body[i]['date'], req.body[i]['venue'], req.body[i]['city'], req.body[i]['category'], req.body[i]['postalCode']]
	}
	insertAllEventDetails(query).then(function (response) {
        var hits = response;
        res.json(response);
    })
	}
	;
});

async function insertAllEventDetails(query) {
	const response = await pgClient.query(query);
	return response;
}

router.route('/get_reviewrating').post((req, res) => {
	const query = {
		name: 'insert-reviewrating',
		text: 'INSERT INTO reviews(username, eventname, reviews, ratings, categories)VALUES ($1, $2, $3, $4, $5)',
		values: [req.body.username, req.body.eventname, req.body.reviews, req.body.ratings, req.body.categories]
	}
	submitReviewRating(query).then(function (response) {
        var hits = response;
        res.json(response);
    });
});

async function submitReviewRating(query) {
	console.log(query);
	const response = await pgClient.query(query);
}

//registraion details
router.route('/register_post').get((req, res) => {
  const query = {
      // give the query a unique name
      name: 'fetch-count-',
      text:'INSERT INTO register(firstname, lastname, address, zipcode, username, password, sportsinterested) VALUES ($1,$2,$3,$4,$5,$6,$7)',
	  values: [req.body.firstname,req.body.lastname,req.body.address,req.body.zipcode,req.body.username,req.body.password,req.body.sportsinterested]
  }
  saveRegistraion(query).then(function (response) {
        var hits = response;
        res.json({'SATURDAY': 'Successfully Retrieved'});
    });
});

async function saveRegistraion(query) {

	const response = await pgClient.query(query);
}

app.use('/', router);

app.listen(4000, () => {

            console.log('Make sure you execute following command before you start the Angular client');

            console.log('');            
            console.log('--------------------------------------------------------');

            console.log('curl -H "Content-Type: application/json" -XPUT "http://localhost:9200/divvy_station_logs/_settings"  -d "{\"index\":{\"max_result_window\":10000000}}"');

            console.log('--------------------------------------------------------');
            console.log('');

            console.log('Express server running on port 4000')
});
