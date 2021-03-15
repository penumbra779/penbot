var fs = require("fs");
var plotly = require("plotly")("penbot9541", "VczHVy8Hz5eN6sP6UOkc");
var moment = require("moment");
var gui = require('nw.gui');

let rawdata = fs.readFileSync("av_test_full.json"); // synchronous as opposed to readFile
let json = JSON.parse(rawdata);

let prices = [];
let dates = [];

let tskey = 'Time Series (5min)';
let c = 0
for (var date in json[tskey]) {
  if (json[tskey].hasOwnProperty(date)) {
    prices.push(parseFloat(json[tskey][date]['4. close']));
    dates.push(c);
    c = c+1;
  }
}
// console.log(prices);
// console.log(dates);

var data = [
  {
    x: dates.reverse(),
    y: prices,
    type: 'scatter'
  }
];

var layout = {fileopt : "overwrite", filename : "simple-node-example"};

plotly.plot(data, layout, function (err, msg) {
	if (err) return console.log(err);
	console.log(msg);
});
