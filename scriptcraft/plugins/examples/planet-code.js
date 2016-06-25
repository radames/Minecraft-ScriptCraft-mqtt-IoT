var mqtt = require('sc-mqtt'),
  foreach = require('utils').foreach,
  client = mqtt.client(),
  JavaString = java.lang.String;
         

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
            server.dispatchCommand(player, 'jsp planet ' + planetName);
		});                 
    }
});


var posY = 0; //middle of the sky
var posZ = 175;

var scaleBlock = 150; // 200 block diameter for the Sun
var Sun = 1391900
var distFactor = 400; //make the distances smaller
var scaleFactor = scaleBlock/Sun;

var planets ={
  'mercury':[4866, 57950000, blocks.wool.gray, false],
  'venus':[12106, 108110000, blocks.wool.white, false],
  'earth':[12742, 149570000, blocks.wool.blue, false],
  'mars':[6760, 227840000, blocks.wool.red, false],
  'jupiter':[142984,778140000, blocks.wool.yellow, false],
  'saturn':[116438, 1427000000, blocks.wool.lightgray, false],
  'uranus':[46940, 2870300000, blocks.wool.lightblue, false],
  'neptune':[45432, 4499900000, blocks.wool.purple, false],
  'pluto':[2274,5913000000, blocks.wool.pink, false]
};


command( 'Sun', function( parameters, player ) {



    var posX = 0.0;
    var radius = scaleBlock/2;
    var bkLocation = org.bukkit.Location;
    var loc =  new bkLocation( player.world, posX, posY, posZ, 0, 0);

  	teleport(player, loc);

  	if(parameters[0] == 'create'){

    	var d = new Drone(player.location);
    	d.sphere0(blocks.glowstone, radius);
	  	echo(player, 'Creating the Sun');
	}
});

command( 'planet', function( parameters, player ) {
  	var planet = String(parameters[0]);
    planet = planet.replace(/ /g,'').toLowerCase(); //remove whitespaces make it lowercase
  	if(planet in planets){

	  var posX = scaleFactor * planets[planet][1]/ distFactor;
	  var radius = Math.round(scaleFactor * planets[planet][0]/2);

	  var block = planets[planet][2];
	  var bkLocation = org.bukkit.Location;
	  var loc =  new bkLocation( player.world, posX, posY + scaleBlock/2, posZ, Math.random()*45, Math.random()*90.0-45);

	  teleport(player, loc);
        
      //check if the planet is not already there
      if(planets[planet][3] === false){
          planets[planet][3] = true;
          var d = new Drone(player.location);
          d.fwd(2);
          d.sphere0(block, radius);
          if(planet === 'saturn'){
            d.up(5).back(4).left(4);
            d.arc({blockType: blocks.iron,
               meta: 0,
               radius: Math.round(radius*2),
               strokeWidth: 2,
               quadrants: {topleft:true,topright:true,bottomleft:true,bottomright:true},
               orientation: 'horizontal',
               stack: 1,
               fill: false
               });
          }
      }
	}else{
	  echo(player,'ERROR: the only valid planets:\nMercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto');
	}
});


command( 'atom', function( parameters, player ) {
  	var type = String(parameters[0]);
    type = type.replace(/ /g,'').toLowerCase(); //remove whitespaces make it lowercase
    var atoms = {'proton':[7,blocks.iron],
				 'neutron':[8,blocks.wool.orange],
				 'electron':[5,blocks.wool.blue]
				};
  	if(type in atoms){



	  teleport(player, player.location);

	  var d = new Drone(player.location);
	  d.sphere0(atoms[type][1], atoms[type][0]);
	  echo(player, 'Creating ' + type);

	}else{
	  echo(player,'ERROR the only valid particles:\n Proton, Neutron, Electron');
	}
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

