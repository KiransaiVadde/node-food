var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
           return res.send(err);
        }

        res.json(foods); // return all foods in JSON format
    });
}
;

function getTotal(res) {
	Food.find(function (err, foods) {
	
  var subtotal = 0 ;
  var total = 0;
  var json=JSON.stringify(foods);
  var jsonData = JSON.parse(json);  // converts food objects into json to parse through
  for (var i = 0; i < jsonData.length; i++) {
    var price = jsonData[i].price;   // parse through all foods to sum all prices
    subtotal = subtotal + price;
   }
  
  total = subtotal + (subtotal * 0.075); 
 
   res.json(total); // return all foods in JSON format
    }); 
  };


module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all foods in the database
        getFoods(res);
    });
	
	// api ---------------------------------------------------------------------
    // get all foods
    app.get('/api/total', function (req, res) {
        // use mongoose to get all foods in the database
        getTotal(res);
    });

    // create food and send back all foods after creation
    app.post('/api/foods', function (req, res) {

        // create a food, information comes from AJAX request from Angular
        Food.create({
            name: req.body.name,
			price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the foods after you create another
            getFoods(res);
        });

    });

    // delete a food
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};