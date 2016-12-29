// http://altitudelabs.com/blog/create-a-slackbot-using-botkit/
// https://github.com/howdyai/botkit
// https://github.com/dbashford/textract

(function(){

	var textract = require('textract');
	var filePath = 'files/fox_51.pdf';
	var config = {
		preserveLineBreaks: true,
		pdftotextOptions: {
			layout: 'layout'
		}
	}

	var url = "http://www.kajaani.fi/sites/default/files/fox_vko_WEEKNO_linjasto_1_ja_2.pdf";
	var weekNo = getWeekNumber(new Date());
	url.replace(/\WEEKNO\b/, weekNo);


	var FOOD_MSG = "Tänään turo tarjoaa: ";

	module.exports = function (url) {
		textract.fromUrl(url,config,  function( error, text ) {
			if(error)
				return error;
			else {		
				text = text.split('\n');

				// remove all the unnecessary markings on each line
				text.forEach(function(item, index, object) {
					object[index] = object[index].replace(/[0-9,]/g, '');
		 			object[index] = object[index].replace(/\LA GL\b/, '');
		 			object[index] = object[index].replace(/\LA\b/, '');
		 			object[index] = object[index].replace(/\ S\b/, '');
		 			object[index] = object[index].replace(/\MA\b/, '');
		 			object[index] = object[index].replace(/\GL\b/, '');
		 			object[index] = object[index].replace(/\ V\b/, '');
		 			object[index] = object[index].trim();
				});

				// Get current day and push 
				var day = getCurrentDayText();
				text.forEach(function(item, index, object) {
		 			if (item.indexOf(day) == 0) { return (FOOD_MSG + object[index+2] + " sekä " + object[index+3]); }
				});
			}
		});
	}

	function getCurrentDayText() {
		var d = new Date();
		var n = d.getDay();

		if(n == 1) return 'Maanantai';
		else if(n == 2) return 'Tiistai';
		else if(n == 3) return 'keskiviikko';
		else if(n == 4) return 'Torstai';
		else if (n == 5) return 'perjantai';
	}

	function getWeekNumber(d) {
	    // Copy date so don't modify original
	    d = new Date(+d);
	    d.setHours(0,0,0,0);
	    // Set to nearest Thursday: current date + 4 - current day number
	    // Make Sunday's day number 7
	    d.setDate(d.getDate() + 4 - (d.getDay()||7));
	    // Get first day of year
	    var yearStart = new Date(d.getFullYear(),0,1);
	    // Calculate full weeks to nearest Thursday
	    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
	    // Return array of year and week number
	    return weekNo;
	}

})();
