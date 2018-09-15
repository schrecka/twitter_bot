var TwitterPackage = require('twitter');

// importing twitter app keys from secret.json file
var secret = require("./secret");

// my secret.json file looks like this:
// {
//   "consumer_key": "...",
//   "consumer_secret": "...",
//   "access_token_key": "...",
//   "access_token_secret": "..."
// }

//make a new Twitter object
var Twitter = new TwitterPackage(secret);

console.log("CalculateMyTip Bot Activated");

/*Twitter.stream('statuses/filter', {track: '#testingtweettests'}, function(stream) {
	stream.on('data', function(tweet) {
		console.log(tweet.text);
		console.log(tweet.user.screen_name);
		var mentionString = "Goodday @" + tweet.user.screen_name;
		reply(mentionString);
  	});

  	stream.on('error', function(error) {
    	console.log(error);
  	});
});

function reply(text) {
	Twitter.post('statuses/update', {status: text},  function(error){
		if(error){
			console.log(error);
			console.log("mission failed");
		}
		else {
			console.log("great success")
		}
	});
} */

Twitter.stream('statuses/filter', {track: '#calculatemytip'}, function(stream) {
	//When tweet is recieved 
	stream.on('data', function(tweet) {
		//console output
		console.log("Tweet recieved from " + tweet.user.screen_name);
		console.log("Tweet = " + tweet.text);

		//calculate total amount
		var input_tweet = tweet.text;
		var tweet_array = input_tweet.split(" ");
		raw_price = tweet_array[0];
		
		if (isNaN(raw_price)) {
			//tweet error message
			console.log("not in correct form mission failed");

			//build reply object
			var statusObj = {status: "@" + tweet.user.screen_name 
							+ " Please use this format: [price w/o $] #calculatemytip"}
		}
		else {
			price = (+raw_price).toFixed(2);
			//15% tip
			var total_cost_15 = (price * 1.15).toFixed(2);

			//20% tip
			var total_cost_20 = (price * 1.2).toFixed(2);

			//25% tip
			var total_cost_25 = (price * 1.25).toFixed(2);
			
			//build reply object
    		var statusObj = {status: "@" + tweet.user.screen_name 
    						+ "\n Price: $" + price 
    						+ "\n add 15% Tip: $" + total_cost_15 
    						+ "\n add 20% Tip: $" + total_cost_20
    						+ "\n add 25% Tip: $" + total_cost_25};
    	}
	    //call the post function to tweet reply
		Twitter.post('statuses/update', statusObj,  function(error, tweetReply, response){
			//if we get an error print it out
		    if(error){
		        console.log(error);
		    }

		    //print the text of the tweet sent out
		    console.log(tweetReply.text);
		});
  	});

  	//When error is recieved
	stream.on('error', function(error) {
    	console.log(error);
  	});
  });

