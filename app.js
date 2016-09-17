let check = require('./lib/parser.js');
let _ = require('lodash');
let round = 0;
let numOfPlayers = 0;

let playerTemplate = {
	name: '',
	currentGame: '',
	skinColor: '',
	leftHand: [],
	rightHand: [],
	hp: 15,
	protection: [],
	enchantment: [],
	resistance: [],
	monsters: [],
	timer: []
};

// START GAME
let player1 = _.cloneDeep(playerTemplate);
player1.name = "Korath";
console.log(player1.name);
// END GAME

let leftHand = ["W", "W", "S", "W", "P", "P", "F", "P", "P", "P", "D", "S", "S", "S", "F", "P", "W", "P", "F", "D"];
let rightHand = ["P", "S", "F", "W", "P", "S", "D", "F"];

console.log(check(rightHand));

