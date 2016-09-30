var Discordie = require("discordie");
var Events = Discordie.Events;
var request = require('request');
var client = new Discordie();
var numeral = require('numeral');



client.connect({ token: "MjMxMjc3MTA4NTE5NzYzOTc4.Cs-BKQ.Oy9JzukNhZ6Kc7aJJuj70hGQqYg" });

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
	var content = e.message.content.toLowerCase();
    if (content.indexOf("mbtc = vnd") !== -1) {
        var moni = parseInt(e.message.content.substring(0, content.indexOf("mbtc = vnd")));
        request("https://api.coindesk.com/v1/bpi/currentprice/VND.json", function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                var string = numeral(obj.bpi.VND.rate_float * moni / 1000).format('0,0');
                if (string !== "NaN") {
                    e.message.channel.sendMessage(string + "đ");
                }
            }
        });
    }
});
