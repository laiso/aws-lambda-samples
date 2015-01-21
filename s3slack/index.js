const SLACK_TOKEN = "xxx...xxx";

var req = require('request');

exports.handler = function(event, context) {
    var filename = event.Records[0].s3.object.key;
    req.post('https://slack.com/api/chat.postMessage')
        .form({
            token: SLACK_TOKEN,
            channel: "#s3",
            text: "Put: "+filename
        })
        .on('response', function (response) {
          response.on('data', function(data) {
            context.done(null, data);
          });
        })
        .on('error', function (err) {
            cotext.done(err, 'Failed post the chat');
        });
};
