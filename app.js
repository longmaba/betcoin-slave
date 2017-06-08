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
        (function(tmp) {
          request("https://api.coindesk.com/v1/bpi/currentprice/VND.json", function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var obj = JSON.parse(body);
              var string = numeral(obj.bpi.VND.rate_float * tmp / 1000).format('0,0');
              var string2 = numeral(obj.bpi.USD.rate_float * tmp / 1000).format('0,0');
              if (string !== "NaN") {
                if (e.message.author.username == 'longmaba') {
                e.message.channel.sendMessage("bẩm cụ Long ạ: " + tmp + " mbtc = " + string2 + " USD = " + string + "đ");
                } else {
                  if (tmp <= 50) {
                e.message.channel.sendMessage(e.message.author.username + "<:cwl:251556903182663681>" + ": " + tmp + " mbtc = " + string2 + " USD = " + string + "đ");
                  } else if (tmp > 50 || tmp < 1000) {
                e.message.channel.sendMessage(e.message.author.username + "<:obama:250834454359048192>" + ": " + tmp + " mbtc = " + string2 + " USD = " + string + "đ");}
                  else {
                e.message.channel.sendMessage(e.message.author.username + "<:ruserious:258905874293194752>" + ": " + tmp + " mbtc = " + string2 + " USD = " + string + "đ");
                  }
                }
              }
            }
          });
        })(moni);
    };
  }

  if (content.search(/!(\d*)usd/g) !== -1) {
    var value = content.match(/!(\d*)usd/g);
    for (var i = 0; i < value.length; i++) {
      var moni = parseInt(value[i].substring(1, value[i].indexOf("usd")));
      console.log(moni);
        (function(tmp) {
          request("https://api.coindesk.com/v1/bpi/currentprice/VND.json", function(error, response, body) {
            if (!error && response.statusCode == 200) {
              var obj = JSON.parse(body);
              var string = numeral(obj.bpi.VND.rate_float * ((1 / obj.bpi.USD.rate_float) * tmp * 1000) / 1000).format('0,0');
              var string2 = numeral((1 / obj.bpi.USD.rate_float) * tmp * 1000).format('0,0');
              if (string !== "NaN") {
                e.message.channel.sendMessage(e.message.author.username + ": " + tmp + " usd = " + string2 + " mbtc = " + string + "đ");
              }
            }
          });
        })(moni);
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

  if (content.search(/!covu/g) !== -1) {
    e.message.channel.sendMessage("mặc dù em đéo biết là ai nhưng các anh cố lên <:energy:258084491937972224> <:energy:258084491937972224> <:energy:258084491937972224>");
    e.message.channel.sendMessage("Make us proud <:cwl:251556903182663681> <:cwl:251556903182663681> <:cwl:251556903182663681>");
    e.message.channel.sendMessage("ỉa vào mồm chúng nó <:sparta:281284109299482625> <:sparta:281284109299482625> <:sparta:281284109299482625>");
  }

   if (content.search(/!bettattayhayko/g) !== -1) {
    e.message.channel.sendMessage("Thôi em xin anh đừng <:energy:258084491937972224> <:energy:258084491937972224> <:energy:258084491937972224>");}
});