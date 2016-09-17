let _ = require('lodash');

let gestures = {
	"Dispel magic": ["C", "D", "P", "W"],
	"Charm person": ["P", "S", "D", "F"],
	"Summon elemental": ["C", "S", "W", "W", "S"],
	"Summon ogre": ["P", "S", "F", "W"],
	"Magic mirror": ["C", "(w"],
	"Finger of death": ["P", "W", "P", "F", "S", "S", "S", "D"],
	"Lightning bolt": ["D", "F", "F", "D", "D"],
	"Haste": ["P", "W", "P", "W", "W", "C"],
	"Cure heavy wounds": ["D", "F", "P", "W"],
	"Missile": ["S", "D"],
	"Cure light wounds": ["D", "F", "W"],
	"Summon goblin": ["S", "F", "W"],
	"Amnesia": ["D", "P", "P"],
	"Anti spell": ["S", "P", "F"],
	"Confusion": ["D", "S", "F"],
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
	"Fireball": ["F", "S", "S", "D", "D"],
	"Cause heavy wounds": ["W", "P", "F", "D"],
	"Shield": ["P"],
	"Counter spell": ["W", "P", "P"],
	"Surrender": ["P", "!"],
	"Ice storm": ["W", "S", "S", "C"],
	"Remove enchantment": ["P", "D", "W", "P"],
	"Resist heat": ["W", "W", "F", "P"],
	"Invisibility": ["P", "P", "(w", "(s"],
	"Protection from evil": ["W", "W", "P"],
	"Charm monster": ["P", "S", "D", "D"],
	"Counter-spell": ["W", "W", "S"]
};

function parse(moves) {
	let spells = [];
	let max = _.takeRight(moves, 8);
	console.log(max);

	for (let i = max.length - 1; i >= 0; i -= 1) {
		let current = _.takeRight(max, i);

		_.forEach(gestures, function(value, key) {			
			if (_.isEqual(current, value)) {
				spells.push(key);
			}
		});
	}
	
	return spells;
}

module.exports = parse;


