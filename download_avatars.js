var request = require('request');
var request2 = require('./secret.js')
var fs = require('fs');
var myToken = request2.Terence1991;
var process1 = process.argv.slice(2);


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

  getRepoContributors(process1[0], process1[1], function(err, result) {
    var output = JSON.parse(result);
    // var avatarURLS =  output.map(a => a.avatar_url)
    // var userName = output.map(a => a.login);
    if(output.message === 'Not Found') {
        console.log('incorect input')
    } else { 
     for(var contributor of output) {
         downloadImageByURL(contributor.avatar_url, `./avatars/${contributor.login}.jgp`)
    }
     } 
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

