const express = require('express');
const cache = require('memory-cache');
const FB = require('fb');

var router = express.Router();

/* GET home page. */
router.get('/search/:term', function(req, res, next) {
  const accessToken = res.locals.accessToken;
  const term = req.params.term;
  const cached = cache.get(term);

  FB.setAccessToken(accessToken);

  if(!cached){
    FB.api('', 'post', {
      batch: [
        { method: 'get', relative_url: `search/?q=${term}&type=event`},
        // { method: 'get', relative_url: `search/?q=${term} poa&type=event`},
      ]
    }, (fbRes) => {
      console.log(fbRes);
      if(fbRes){
        let events = {};
        let arrEvents = [];

        fbRes.map((r) => {
          const body = JSON.parse(r.body);
          body.data.map((ev) => {
            events[ev.name] = ev;
          });
        });

        Object.keys(events).forEach((ev) => {
          const event = events[ev];
          arrEvents.push(event);
        }, arrEvents)

        res.send(arrEvents);
      }

    });
  }else{
    res.send(cached);
  }

});

module.exports = router;
