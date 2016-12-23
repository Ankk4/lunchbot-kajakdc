var textract = require('textract');
var filePath = 'files/fox_51.pdf';

/*
textract.fromFileWithPath(filePath, function( error, text ) {
	if(error)
		console.log(error);
	else
		console.log(text);
});
*/

var url = "http://www.kajaani.fi/sites/default/files/fox_vko_51_linjasto_1_ja_2.pdf";
textract.fromUrl(url, function( error, text ) {
	if(error)
		console.log(error);
	else {
		
		var reqEx = //;
		text = text.split(' ');
		console.log(text.toString());
		//text = removeMatching(text, /[]/)

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