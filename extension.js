'use strict';

module.exports = function (nodecg) {
  console.log('we in here');
  if (!nodecg.bundleConfig) {
      nodecg.log.error('cfg/ss-twitter.json was not found. ' +
          'This file is where the Twitter API keys are set. ' +
          'Without those, the Twitter graphic cannot function.');
      return;
  } else if (typeof nodecg.bundleConfig.consumerKey === 'undefined') {
      nodecg.log.error('consumerKey is not defined in cfg/ss-twitter.json! ' +
          'This key (obtained from your Twitter developer account) ' +
          ' is required for the Twitter graphic to function.');
      return;
  } else if (typeof nodecg.bundleConfig.consumerSecret === 'undefined') {
      nodecg.log.error('consumerSecret is not defined in cfg/ss-twitter.json! ' +
          'This secret (obtained from your Twitter developer account) ' +
          ' is required for the Twitter graphic to function.');
      return;
  } else if (typeof nodecg.bundleConfig.accessTokenKey === 'undefined') {
      nodecg.log.error('accessTokenKey is not defined in cfg/ss-twitter.json! ' +
          'This key (obtained from your Twitter developer account) ' +
          ' is required for the Twitter graphic to function.');
      return;
  } else if (typeof nodecg.bundleConfig.accessTokenSecret === 'undefined') {
      nodecg.log.error('accessTokenSecret is not defined in cfg/ss-twitter.json! ' +
          'This secret (obtained from your Twitter developer account) ' +
          ' is required for the Twitter graphic to function.');
      return;
  }

  var Twitter = require('twitter');
  var twitter = new Twitter({
      consumer_key: nodecg.bundleConfig.consumerKey,
      consumer_secret: nodecg.bundleConfig.consumerSecret,
      access_token_key: nodecg.bundleConfig.accessTokenKey,
      access_token_secret: nodecg.bundleConfig.accessTokenSecret
  });

  var tweetShowing = nodecg.Replicant('tweetShowing', {defaultValue: false, persistent: false});
  var tweetPulsing = nodecg.Replicant('tweetPulsing', {defaultValue: false, persistent: false});
  var tweet = nodecg.Replicant('tweet', {defaultValue: {}});

  nodecg.listenFor('getTweet', function(url) {
      var id = url.split('/').pop();
      twitter.get('statuses/show', {id: id, include_my_retweet: false}, function(error, tw){
          if (error) {
              nodecg.log.error('Couldn\'t get tweet:', error[0].message);
              return;
          }

          tweet.value = tw;
      });
  });

  nodecg.listenFor('pulseTweet', function pulse(duration) {
      // Don't stack pulses
      if (tweetPulsing.value) return;

      tweetShowing.value = true;
      tweetPulsing.value = true;

      // End pulse after "duration" seconds
      setTimeout(function() {
          tweetShowing.value = false;
          tweetPulsing.value = false;
      }, duration * 1000);
  });
};
