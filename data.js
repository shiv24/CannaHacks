
const express = require('express')
const app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'hack.ctnvvcva88sx.ca-central-1.rds.amazonaws.com',
  user     : 'hack2',
  password : '436067832276',
  database : 'hack2'
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);

});

var qString = "select total_yield/COUNT(*) as num, COUNT(*), total_yield, harvest_weight.harvest_batch_id from plant inner join plant_harvest_batch on plant_harvest_batch.plant_id = plant.id \
inner join harvest_batch on harvest_batch.id = plant_harvest_batch.harvest_batch_id \
inner join harvest_weight on harvest_weight.harvest_batch_id = plant_harvest_batch.harvest_batch_id \
where harvest_weight.type LIKE 'Trim Harvest' \
group by harvest_batch_id \
order by num DESC";

connection.query(qString, function (error, results, fields) {
    if (error) throw error;
    // connected!
    console.log(results);
})




// app.listen(1337);
