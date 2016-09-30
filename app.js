var Discordie = require("discordie");
var Events = Discordie.Events;
var request = require('request');
var client = new Discordie();
var numeral = require('numeral');



client.connect({
  token: "MjMxMjc3MTA4NTE5NzYzOTc4.Cs-BKQ.Oy9JzukNhZ6Kc7aJJuj70hGQqYg"
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
  console.log("Connected as: " + client.User.username);
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
  var content = e.message.content.toLowerCase();
  if (content.search(/!(\d*)mbtc/g) !== -1) {
    var value = content.match(/!(\d*)mbtc/g);
    for (var i = 0; i < value.length; i++) {
      var moni = parseInt(value[i].substring(1, value[i].indexOf("mbtc")));
      console.log(moni);
      if (moni > 10000) {
        e.message.channel.sendMessage(e.message.author.username + ", do you even have that much :moni: in VND? :hanz: :hanz:");
      } else {
        (function(tmp) {
          request("https://api.coindesk.com/v1/bpi/currentprice/VND.json", function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var obj = JSON.parse(body);
              var string = numeral(obj.bpi.VND.rate_float * tmp / 1000).format('0,0');
              var string2 = numeral(obj.bpi.USD.rate_float * tmp / 1000).format('0,0');
              if (string !== "NaN") {
                e.message.channel.sendMessage(e.message.author.username + ": " + tmp + " mbtc = " + string2 + " USD = " + string + "đ");
              }
            }
          });
        })(moni);
      }
    };
  }
  if (content.search(/!getbanpick/g) !== -1) {
    var teamName = content.substring(content.search(/!getbanpick(.*)/g) + 11);
    request("https://guarded-escarpment-56551.herokuapp.com/getABC/" + teamName, function(error, response, body) {
       if (!error && response.statusCode == 200) { 
          var obj = JSON.parse(body);
          e.message.channel.sendMessage(teamName.toUpperCase() + "\n" + "Banned \n" + JSON.stringify(obj.banned) + "\n" + "Picked \n" + JSON.stringify(obj.picked));
       }
    });
  }
});
