// setup app and other stuff
const express = require('express');

const app = express();
const url = require('url');
const request = require('request');
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// use port set in the environment variable, or 9001 if its not set
app.set('port', (process.env.PORT || 9001));

// public API key no need to hide it https://www.bart.gov/schedules/developers/api
const apikey = 'MW9S-E7SL-26DU-VV8V';


// number of results to return in response
const numResults = 4;

// bart station names and their abbreviations in JSON file.
const stations = require('./bart_stations.json');

// for testing that the app is running
app.get('/', (_req, res) => {
  res.send('Running!! It works!');
});

// app.post is triggered when a POST request is sent to the URL ‘/post’
app.post('/post', (req, res) => {
  // take a message from Slack slash command split the body into origin and destination
  const query = req.body.text.toLowerCase().split(' ');

  // set URL to hit bart API (docs: http://api.bart.gov/docs/sched/depart.aspx)
  // example: http://api.bart.gov/api/sched.aspx?cmd=depart&orig=ASHB&dest=CIVC&date=now&key=MW9S-E7SL-26DU-VV8V&b=2&a=2&l=1&json=y
  const parsedUrl = url.format({
    host: 'https://api.bart.gov',
    pathname: '/api/sched.aspx',
    search: `?cmd=depart&orig=${query[0]}&dest=${query[1]}&date=now&key=${apikey}&b=0&a=${numResults}&l=0&json=y`,
  });

  // stuff for debugging.
  // console.log(parsedUrl);

  // call Bart API.
  request(parsedUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const data = JSON.parse(body);

      // we are only interested in trips
      const trips = data.root.schedule.request.trip;

      // get scheduled trains
      let schedule = 'Departure      Arrival\n';
      trips.forEach((trip) => {
        // have to use
        schedule += `${trip['@origTimeMin']}        ${trip['@destTimeMin']}\n`;
      });

      // generate in channel response message with attachment
      const successResponse = {
        response_type: 'in_channel',
        text: `Next *${numResults}* trains from *${stations[query[0]]}* to *${stations[query[1]]}*\nTrip Fare: *$${trips[0]['@fare']}*     Trip Time: *${trips[0]['@tripTime']}* minutes     CO₂ emissions saved: *${trips[0]['@co2']}* pounds\n`,
        attachments: [
          {
            text: schedule,
          },
        ],
      };
      res.send(successResponse);
    }
  });
});

// tells Node which port to listen on
app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
