const fs = require('fs');
const path = require('path');
const https = require('https');
const app = require('express')();
const bodyParser = require('body-parser');
const config = require('./config');

const route = '/api/:testName';

const options = {
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert),
};

app.use(bodyParser.json());

const server = https.createServer(options, app)
  .listen(config.port, function(){
    console.log('Listening route: \'%s\' at port: %d', route, config.port);
});
// app.listen(config.port);
// console.log('Listening route: \'%s\' at port: %d', route, config.port);

app.get(route, function(req, res) {
  res.send('Use POST method.');
});

app.post(route, function(req, res) {
  console.log(req.body);

  const fullName = path.join(config.outFolder, `${req.params.testName}.json`);

  let jsonDb = [];
  if (fs.existsSync(fullName)) {
    jsonDb = JSON.parse(fs.readFileSync(fullName));
  }

  console.log(JSON.stringify(req.body, null, 2));

  let isNewQuestion = true;
  let correctAnswers = [];
  if (jsonDb.length > 0) {
    for (let qKey in jsonDb) {
      if (req.body.questionText === jsonDb[qKey].questionText) {
        isNewQuestion = false;
        console.log('This question already exists:');
        for (let aKey in jsonDb[qKey].answers) {
          if (jsonDb[qKey].answers[aKey].isCorrect) {
            correctAnswers.push(jsonDb[qKey].answers[aKey].text);
          }
        }
        break;
      }
    }
  }

  if (isNewQuestion) {
    console.log('New question:');
    jsonDb.push(req.body);
  }

  console.log(JSON.stringify(req.body, null, 2));
  console.log(JSON.stringify(correctAnswers, null, 2));

  fs.writeFileSync(fullName, JSON.stringify(jsonDb, null, 2));

  console.log('Ok');
  res.json({ answers: correctAnswers });
});

