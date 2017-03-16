const mongoXlsx = require('mongo-xlsx');
const model = require("Analysis.schema");

mongoXlsx.xlsx2MongoData("./file.xlsx", model, function(err, mongoData) {
  console.log('Mongo data:', mongoData); 
});