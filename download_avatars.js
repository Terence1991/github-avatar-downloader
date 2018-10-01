var request = require('request');
var request2 = require('./secret.js')
var myToken = request2.Terence1991;

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
    url:   "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
        'User-Agent': 'request',
        'Authorization': `token ${myToken}`
         
      }
}
   
    request(options, function(err, res, body) {
      cb(err, body);
    });
  }

  getRepoContributors("jquery", "jquery", function(err, result) {
    var output = JSON.parse(result);
    var avatarURL =  output.map(a => a.avatar_url)

    console.log(avatarURL);
  });
  