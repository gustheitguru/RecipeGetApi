const express = require('express');
const exphbs = require('express-handlebars');
const PORT = 3000;
const app = express();
const path = require('path');
//adding requests for API connections
const request = require('request');
const bodyParser = require('body-parser');

//using body parser
app.use(bodyParser.urlencoded({extended: false}));

//dynamic website using handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


function call_api (finishedAPI, ticker) {
//api key request
let url = 'http://www.recipepuppy.com/api/?q=omelet&p=3';

//setting up request to Stock API
request(url, {json: true}, (err, res, body) => {
	if (err) { //return error to console for troubleshooting
		return console.log(err);
	};

	if (res.statusCode === 200) { //returning body to console on a 200 return
		console.log(body); //sending body to console
		finishedAPI(body);
		};
	});
};

app.get('/', (req, res) => {
   call_api((doneAPI) => {
   	let results = doneAPI;

    	res.render('home', {
    		// Recipe: doneAPI // will render [object object] at this point 
    		recipe: results
    	});
    });

});

//static routs and html files under public folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
	console.log('Listenting on localhost:' + PORT);
});