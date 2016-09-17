let check = require('./lib/parser.js');
let _ = require('lodash');
round = 0;
let numOfPlayers = 0;
let players = [];
let leftHand = ["W", "W", "S", "W", "P", "P", "F", "P", "P", "P", "D", "S", "S", "S", "F", "P", "W", "P", "F", "D"];
let rightHand = ["D", "S"];

let playerTemplate = {
	name: '',
	currentGame: '',
	skinColor: '',
	leftHand: [],
	rightHand: [],
	hp: 15,
	protection: ["fart"],
	enchantment: [],
	resistance: [],
	monsters: [],
	timer: {}
};



// START GAME

//round 0, initialization
let player1 = _.cloneDeep(playerTemplate);
players.push(player1);
player1.name = "Korath";
player1.rightHand = rightHand;
player1.leftHand = leftHand;

//round 1
round++;
takeTurn(player1, "F", ">");
let spellList = getSpells(player1);
console.log(spellList);


//let first_rh_spell = right_hand_spells[0].action(player1);
//console.log(right_hand_spells[0].name);
//console.log(first_rh_spell);
//console.log(player1);


//run timer functions at end of round. forEach through instead of first index
runTimer(player1, round);

// END GAME

//executes all the functions stored for the specified player's round
function runTimer(player, round) {
	if (player.timer[round] !== undefined) {
		_.forEach(player.timer, function(value, key) {
			_.forEach(value, function(v, k) {
				v();
			})
		})
	}
}

function takeTurn(player, right, left) {
	player.rightHand.push(right);
	player.leftHand.push(left);
}

function getSpells(player) {
	let spells = [];
	let right_hand_spells = check(player1.rightHand);
	let left_hand_spells = check(player1.leftHand);

	if (right_hand_spells !== undefined) {
		spells = _.concat(spells, right_hand_spells);
	}

	if (left_hand_spells !== undefined) {
		spells = _.concat(spells, left_hand_spells)
	}

	return spells;
}







