var fs     = require('fs');
var Botkit = require('botkit');

var slack_token = process.env.token || 'xoxb-120029554882-jd4wxJZ9la49g1YVbZ19TE93';
var msg_opts = JSON.parse(fs.readFileSync('message_opts.json', 'utf-8'));

var controller = Botkit.slackbot({
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

// Commands
controller.hears(msg_opts.commands, ['direct_message','direct_mention','mention'],function(bot,message) {
	bot.reply(message,'Hello, young one. May the DC be with you!');
});

// Lunch idea - parser
