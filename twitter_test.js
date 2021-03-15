var fs = require("fs");
var unirest = require("unirest");

const Twitter = require('twitter-v2');

require('dotenv').config();

const bearerToken = process.env.TWITTER_BEARER_TOKEN;
const userId = "20357393";

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN
});

var req = unirest("GET", `https://api.twitter.com/2/users/${userId}/following`);

req.headers({
    "User-Agent": "v2FollowingJS",
    "Authorization": `Bearer ${bearerToken}`
});


req.end(function (res) {
    if (res.error) throw new Error(res.error);

  fs.writeFile("twitter_test.json", JSON.stringify(res, null, 2), function(err) {
    if (err) {
      console.log(err);
    }
  })
    console.log(res.body);
});

// // Fetch the users being followed by a specific account, by ID
// // https://developer.twitter.com/en/docs/twitter-api/users/follows/quick-start
//
// // this is the ID for @TwitterDev
// const userId = 2244994945;
// const url = `https://api.twitter.com/2/users/${userId}/following`;
// const bearerToken = process.env.BEARER_TOKEN;
//
// const getFollowing = async () => {
//     let users = [];
//     let params = {
//         "max_results": 1000,
//         "user.fields": "created_at"
//     }
//
//     const options = {
//         headers: {
//             "User-Agent": "v2FollowingJS",
//             "Authorization": `Bearer ${bearerToken}`
//         }
//     }
//
//     let hasNextPage = true;
//     let nextToken = null;
//     console.log("Retrieving users this user is following...");
//     while (hasNextPage) {
//         let resp = await getPage(params, options, nextToken);
//         if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
//             if (resp.data) {
//                 users.push.apply(users, resp.data);
//             }
//             if (resp.meta.next_token) {
//                 nextToken = resp.meta.next_token;
//             } else {
//                 hasNextPage = false;
//             }
//         } else {
//             hasNextPage = false;
//         }
//     }
//
//     console.log(users);
//     console.log(`Got ${users.length} users.`);
//
// }
//
// const getPage = async (params, options, nextToken) => {
//     if (nextToken) {
//         params.next_token = nextToken;
//     }
//
//     try {
//         const resp = await needle('get', url, params, options);
//
//         if (resp.statusCode != 200) {
//             console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
//             return;
//         }
//         return resp.body;
//     } catch (err) {
//         throw new Error(`Request failed: ${err}`);
//     }
// }
//
// getFollowing();
