var fs = require("fs");
var unirest = require("unirest");

var req = unirest("GET", "https://quandl1.p.rapidapi.com/datasets/WIKI/FB/data.json");

req.headers({
	"x-rapidapi-key": "f4cab2666cmshe38db34a385b800p1f5848jsn180c63f03618",
	"x-rapidapi-host": "quandl1.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

  fs.writeFile("quandl_test.json", JSON.stringify(res, null, 2), function(err) {
    if (err) {
      console.log(err);
    }
  })

	console.log(res.body);
});
