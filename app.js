let check = require('./lib/parser.js');
let _ = require('lodash');
round = 0;
let numOfPlayers = 0;
let players = [];
let leftHand = ["W", "W", "S", "W", "P", "P", "F", "P", "P", "P", "D", "S", "S", "S", "F", "P", "W", "P", "F", "D"];
let rightHand = ["P", "S", "F", "W", "P", "S", "D", "F", "P"];

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

//round 1

let right_hand_spells = check(player1.rightHand);
var first_rh_spell = right_hand_spells[0].action(player1);
console.log(right_hand_spells[0].name);
console.log(first_rh_spell);
console.log(player1);


//run timer functions at end of round. forEach through instead of first index
runTimer(player1, 3);


console.log(player1);


// END GAME

//executes all the functions stored for the specified player's round
function runTimer(player, round) {
	if (player.timer[round].length > 0) {
		_.forEach(player.timer, function(value, key) {
			_.forEach(value, function(v, k) {
				v();
			})
		})
	}
}







