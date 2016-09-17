let _ = require('lodash');

let shield = function(caster, target) {
	let name = caster.name;
	let description = name + " casts Shield";
	let protections = ["monster", "missle", "stab"];

	//will run at the proper turn, removing items from protection list
	let timerFunc = function() {target.protection = _.without(target.protection, "monster", "missle", "stab")};

	//adds shield protections to target's existing protection list
	target.protection = _.concat(target.protection, protections);

	//add timer function to target's timer list
	addTimer(target, 1, timerFunc);
	
  	return description;
}

let stab = function(caster, target) {
	let name = caster.name;
	let description = name + " stabs " + target.name + " and does 1 point of damage";

	if(!_.includes(target.protection, "stab")) {
		target.hp -= 1;
	}
}

let dispelMagic = function() {}
let charmPerson = function() {}
let summonElemental = function() {}
let summonOgre = function() {}
let magicMirror = function() {}
let fingerOfDeath = function() {}
let lightningBolt = function() {}
let fireball = function() {}
let confusion = function() {}
let amnesia = function() {}
let missile = function() {}





/*let gestures = {
	
	
	
	"Haste": ["P", "W", "P", "W", "W", "C"],
	"Cure heavy wounds": ["D", "F", "P", "W"],
	
	"Cure light wounds": ["D", "F", "W"],
	"Summon goblin": ["S", "F", "W"],
	
	"Anti spell": ["S", "P", "F"],
	
	"Permanency": ["S", "P", "F", "P", "S", "D", "W"],
	"Disease": ["D", "S", "F", "F", "F", "C"],
	"Time stop": ["S", "P", "P", "C"],
	"Blindness": ["D", "W", "F", "F", "(d"],
	"Resist cold": ["S", "S", "F", "P"],
	"Delayed effect": ["D", "W", "S", "S", "S", "P"],
	"Fear": ["S", "W", "D"],
	"Raise dead": ["D", "W", "W", "F", "W", "C"],
	"Fire storm": ["S", "W", "W", "C"],
	"Poison": ["D", "W", "W", "F", "W", "D"],
	"Lightning-bolt": ["W", "D", "D", "C"],
	"Paralysis": ["F", "F", "F"],
	"Cause light wounds": ["W", "F", "P"],
	"Summon troll": ["F", "P", "S", "F", "W"],
	"Summon giant": ["W", "F", "P", "S", "F", "W"],
	
	"Cause heavy wounds": ["W", "P", "F", "D"],
	
	"Counter spell": ["W", "P", "P"],
	"Surrender": ["P", "!"],
	"Ice storm": ["W", "S", "S", "C"],
	"Remove enchantment": ["P", "D", "W", "P"],
	"Resist heat": ["W", "W", "F", "P"],
	"Invisibility": ["P", "P", "(w", "(s"],
	"Protection from evil": ["W", "W", "P"],
	"Charm monster": ["P", "S", "D", "D"],
	"Counter-spell": ["W", "W", "S"],
	
};*/


let gestures = {
	"Shield": {
		name: "Shield",
		type: ["protection"],
		sequence: ["P"],
		action: shield
	},
	"Dispel magic": {
		name: "Dispel magic",
		type: ["protection"],
		sequence: ["C", "D", "P", "W"],
		action: dispelMagic
	},
	"Charm person": {
		name: "Charm person",
		type: ["enchantment"],
		sequence: ["P", "S", "D", "F"],
		action: charmPerson
	},
	"Summon elemental": {
		name: "Summon elemental",
		type: ["summoning", "monster"],
		sequence: ["C", "S", "W", "W", "S"],
		action: summonElemental
	},
	"Summon ogre": {
		name: "Summon ogre",
		type: ["summoning", "monster"],
		sequence: ["P", "S", "F", "W"],
		action: summonOgre
	},
	"Magic mirror": {
		name: "Magic mirror",
		type: ["protection"],
		sequence: ["C", "(w"],
		action: magicMirror
	},
	"Finger of death": {
		name: "Finger of death",
		type: ["damaging"],
		sequence: ["P", "W", "P", "F", "S", "S", "S", "D"],
		action: fingerOfDeath
	},
	"Lightning bolt": {
		name: "Lightning bolt",
		type: ["damaging"],
		sequence: ["D", "F", "F", "D", "D"],
		action: lightningBolt
	},
	"Fireball": {
		name: "Fireball",
		type: ["damaging"],
		sequence: ["F", "S", "S", "D", "D"],
		action: fireball
	},
	"Confusion": {
		name: "Confusion",
		type: ["enchantment"],
		sequence: ["D", "S", "F"],
		action: confusion
	},
	"Amnesia": {
		name: "Amnesia",
		type: ["enchantment"],
		sequence: ["D", "P", "P"],
		action: amnesia
	},
	"Missile": {
		name: "Missle",
		type: ["damaging", "missle"],
		sequence: ["S", "D"],
		action: missile
	},
	"Stab": {
		name: "Stab",
		type: ["damaging", "stab"],
		sequence: [">"],
		action: stab
	}







};

function addTimer(player, round, func) {
	if (player.timer[round] === undefined) {
		player.timer[round] = [];
		player.timer[round].push(func);
	} else {
		player.timer[round].push(func);
	}
} 




function parse(moves) {
	let spells = [];
	let max = _.takeRight(moves, 8);

	for (let i = max.length; i >= 0; i -= 1) {		
		let current = _.takeRight(max, i);

		_.forEach(gestures, function(value, key) {			
			if (_.isEqual(current, value.sequence)) {
				spells.push(gestures[key]);
			}
		});
	}
	
	return spells;
}

module.exports = parse;


