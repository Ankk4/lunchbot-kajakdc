// http://altitudelabs.com/blog/create-a-slackbot-using-botkit/
// https://github.com/howdyai/botkit
// https://github.com/dbashford/textract

var textract = require('textract');
var filePath = 'files/fox_51.pdf';

var url = "http://www.kajaani.fi/sites/default/files/fox_vko_49_linjasto_1_ja_2.pdf";
var config = {
	preserveLineBreaks: true,
	pdftotextOptions: {
		layout: 'raw'
	}
}

/*
textract.fromFileWithPath(filePath, function( error, text ) {
	if(error)
		console.log(error);
	else
		console.log(text);
});
*/

textract.fromUrl(url,config,  function( error, text ) {
	if(error)
		console.log(error);
	else {
		
		//var reqEx = //;
		text = text.split('\n');
		//text = text.slice().pop();
		text = removeMatching(text, /[0-9]/gi); // tästä se lähtee...

		//for(index in text)
		//	console.log(text[index]);

		console.log(text);
		console.log(typeof(text));
	}
});


function removeMatching(originalArray, regex) {
    var j = 0;
    while (j < originalArray.length) {
        if (regex.test(originalArray[j]))
            originalArray.splice(j, 1);
        else
            j++;
    }
    return originalArray;
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