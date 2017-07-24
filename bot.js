var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;

//inputs
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
	botRegexHelp = /\!help/i;
	botRegexRoll = /\!roll/i;
	botRegexYesno = /\!yesno/i;
	botRegexQYes = /is kyle gay\?|is erica rich\?|is jayjay cool\?/i;
	botRegexDoggopls = /\!doggopls/i;

  if(request.text && (botRegexRoll.test(request.text) 
		|| botRegexYesno.test(request.text)
		|| botRegexQYes.test(request.text) 
		|| botRegexDoggopls.test(request.text)
		|| botRegexHelp.test(request.text)
		)) {
	this.res.writeHead(200);
    postMessage(request.text);
    this.res.end();
  }else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

//reponse
function postMessage(request) {
	var botResponse, options, body, botReq;
	
	if (/\!help/i.test(request)){
		botResponse = "add a ' ! ' in front of these phrases:\nhelp: shows this message\nroll: generates a number between 1 and 10\nyesno: generates yes, no, or maybe\ndoggopls: shows a random picture of a doggo from a predefined list";
	}else if (/\!roll/i.test(request)){
		var x = Math.floor((Math.random() * 10) + 1);
		botResponse = x.toString();
	}else if (/\!yesno/i.test(request)){
		var x = Math.floor((Math.random() * 3) + 1);
		if (x == 1) {
			botResponse = "yes";
		} else if (x == 2) {
			botResponse = "no";
		} else if (x == 3) {
			botResponse = "maybe";
		}
	}else if (/is kyle gay\?|is erica rich\?|is jayjay cool\?/i.test(request)){
		botResponse = "yes";
	}else if (/\!doggopls/i.test(request)){
		var x = Math.floor(Math.random() * 50);
		var doggos = [
			"http://i.imgur.com/xyPtn4m.jpg",
			"http://i.imgur.com/JR6noxf.jpg",
			"http://i.imgur.com/RZrxsVG.jpg",
			"http://i.imgur.com/93ChdNu.jpg",
			"http://i.imgur.com/kXcZdiS.jpg",
			"http://i.imgur.com/ZWSZGKj.jpg",
			"http://i.imgur.com/YYmI8Uz.jpg",
			"http://i.imgur.com/9KqyVJR.jpg",
			"http://i.imgur.com/b33ARVa.jpg",
			"http://i.imgur.com/rpQdRoY.jpg",
			"http://i.imgur.com/xrVXDQ2.jpg",
			"http://i.imgur.com/Bt6zrhq.jpg",
			"http://i.imgur.com/sNm8hRR.jpg",
			"http://i.imgur.com/TeTwhxN.jpg",
			"http://i.imgur.com/bWioilW.jpg",
			"http://i.imgur.com/e9aTxh7.jpg",
			"http://i.imgur.com/oMm6Zba.jpg",
			"http://i.imgur.com/aA4kvJE.jpg",
			"http://i.imgur.com/FJRTLZR.jpg",
			"http://i.imgur.com/QiudnCT.jpg",
			"http://i.imgur.com/2nYIwTd.jpg",
			"http://i.imgur.com/NnFZVPC.jpg",
			"http://i.imgur.com/uEHtSpB.jpg",
			"http://i.imgur.com/5DPqIi0.jpg",
			"http://i.imgur.com/ZkxnaRE.jpg",
			"http://i.imgur.com/kCWMUgk.jpg",
			"http://i.imgur.com/yKAXiyl.jpg",
			"http://i.imgur.com/A4eVQQF.jpg",
			"http://i.imgur.com/uIX5RVf.jpg",
			"http://i.imgur.com/iebobk1.jpg",
			"http://i.imgur.com/wFrFhdi.jpg",
			"http://i.imgur.com/BFVOBBB.jpg",
			"http://i.imgur.com/49Da81l.jpg",
			"http://i.imgur.com/1CbG6MT.jpg",
			"http://i.imgur.com/nmYZwwO.jpg",
			"http://i.imgur.com/FTWr0ac.jpg",
			"http://i.imgur.com/KPLiS7r.jpg",
			"http://i.imgur.com/e5lG5tB.jpg",
			"http://i.imgur.com/OYBBx0H.png",
			"http://i.imgur.com/t76aUWa.jpg",
			"http://i.imgur.com/eYgjIrT.jpg",
			"http://i.imgur.com/VTEgzXg.jpg",
			"http://i.imgur.com/rFmyIDA.jpg",
			"http://i.imgur.com/h3KVnB8.jpg",
			"http://i.imgur.com/aUbe8ic.jpg",
			"http://i.imgur.com/0JINKgM.jpg",
			"http://i.imgur.com/jmu6xqa.jpg",
			"http://i.imgur.com/Wm4Ilnd.jpg",
			"http://i.imgur.com/EnkGzjd.jpg",
			"http://i.imgur.com/DiEct0t.png",
			"http://i.imgur.com/AeQuyyc.png",
			"http://i.imgur.com/4toW76Z.jpg"
		];
		botResponse = doggos[x];
	}

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;