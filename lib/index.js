var fs     	= require('fs');
var botkit 	= require('botkit');
var eating 	= require('./eating.js');

var slack_token = process.env.token || 'xoxb-120029554882-2jInGKPGYtV3gWhrjWEOgj1d';
var msg_opts = JSON.parse(fs.readFileSync('message_opts.json', 'utf-8'));

var controller = botkit.slackbot({
  debug: false,
  log: false,
  //logLevel: 7 // 0-7
});

// connect the bot to a stream of messages
controller.spawn({
  token: slack_token,
}).startRTM();

// greetings
controller.hears(msg_opts.greetings, ['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'Hello, young one. May the DC be with you!');
});

// Lunch
controller.hears(msg_opts.commands[0], ['direct_message','direct_mention','mention'],function(bot,message) {
	eating.what("http://www.kajaani.fi/sites/default/files/fox_vko_51_linjasto_1_ja_2.pdf", function(err, food_msg) {
		if(err) throw new Error("ERROR: " + err);
		else {
			bot.reply(message, food_msg);
		}
	});
});
