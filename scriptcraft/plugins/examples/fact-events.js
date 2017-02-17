var mqtt = require('sc-mqtt');
var foreach = require('utils').foreach;
var client = mqtt.client();
var JavaString = java.lang.String;


var Drone = require('drone'),
	blocks = require('blocks'),
    teleport = require('teleport'),
    utils = require('utils'),
	slash = require('slash');


client.connect();
client.subscribe('PLANET');

client.onMessageArrived( function(topic,message){
    var msgText = '' + new JavaString(message.payload);
    console.log(msgText);
    if (topic == 'PLANET'){
	  	var playerName = msgText.split(':')[0];
	    var planetName = msgText.split(':')[1];
        foreach( server.worlds, function(world){
		    var player = utils.player(playerName);
    //        server.dispatchCommand(player, 'jsp planet ' + planetName);
		});
    }
});


events.blockPlace( function( event ) {event
    var location = event.block.location;

    echo( event.player, 'You place a block!');
    client.publish('minecraft/place',  // topic
                   utils.locationToString(location), // payload
                   1,            // QoS (1 is send at least once)
                   true );       // broker should retain message
});




events.blockBreak( function( event ) {event
    var location = event.block.location;

    echo( event.player, 'You broke a block!');
    client.publish('minecraft/break',  // topic
                   utils.locationToString(location), // payload
                   1,            // QoS (1 is send at least once)
                   true );       // broker should retain message
});



command( 'light', function( parameters, player ) {
	player.location.world.setTime(1000);


	slash([
	  'time set 6000',
	  'weather clear 1000000'
	], player);

});

command( 'pos', function( parameters, player ) {
	echo(player, player.location);
});
