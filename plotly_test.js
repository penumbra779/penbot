var fs = require("fs");
var plotly = require("plotly");//("penbot9541", "VczHVy8Hz5eN6sP6UOkc");
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

function generateOne(format) {
  var imageOptions = { format: format, imageDataOnly: true };
  var outPath = BASE_FILENAME + '.' + format;
  var div = document.createElement('div');

  fs.readFile(MOCK, 'utf-8', function(err, raw) {
    if(err) throw err;

    var fig = JSON.parse(raw);

    Plotly.plot(div, fig)
      .then(toImage)
      .then(decodeImage)
      .then(saveToFile)
      .then(quit);
  });

  function toImage(gd) {
    return Plotly.toImage(gd, imageOptions);
  }

  function decodeImage(img) {
    return new Promise(function(resolve) {

      switch(imageOptions.format) {
        case 'png':
        case 'jpeg':
          img = new Buffer(img, 'base64');
          break;
        case 'svg':
          break;
      }

      resolve(img);
    });
  }

  function saveToFile(img) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(outPath, img, function(err) {
        if(err) reject(err);
        resolve(outPath);
      });
    });
  }

  function quit() {
    log('generated ' + outPath)
    gui.App.quit();
  }
}

generateOne('png');
