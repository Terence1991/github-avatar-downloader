var request = require('request');
var request2 = require('./secret.js')
var fs = require('fs');
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

  
  function downloadImageByURL(url, filePath) {
    // ...
    request.get(url)
    .on('error', function(err) {
        throw err;
    })
    .on('response', function(response) {
        console.log('Response status code:', response.statusCode);
    })
    .on("end", function() {
        console.log('downloading image...')
    })
    .pipe(fs.createWriteStream(filePath))
    .on('finish', function() {
     console.log("Download complete");
    });
  }

  downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")