var fs = require("fs");
var unirest = require("unirest");

var req = unirest("GET", "https://www.alphavantage.co/query");

req.query({
  "function": "TIME_SERIES_INTRADAY",
	"symbol": "IBM",
	"interval": "5min",
  "apikey": "demo",
});

console.log(JSON.stringify(req,null,2));
fs.writeFile("av_req_test.json", JSON.stringify(req, null, 2), function(err) {
  if (err) {
    console.log(err);
  }
})


req.end(function (res) {
	if (res.error) throw new Error(res.error);

  fs.writeFile("av_test.json", JSON.stringify(res, null, 2), function(err) {
    if (err) {
      console.log(err);
    }
  })
	console.log(res.body);
});
