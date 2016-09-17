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
	currentSpell: '',
	timer: {}
};

// START GAME

// ROUND 0
init();

// ROUND 1
fakeRoundOne();

// ROUND 2
fakeRoundTwo();

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
	//console.log("take turn: ", player);
}

function getSpells(player) {
	let spells = [];
	let right_hand_spells = check(player.rightHand);
	let left_hand_spells = check(player.leftHand);

	if (right_hand_spells !== undefined) {
		spells = _.concat(spells, right_hand_spells);
	}

	if (left_hand_spells !== undefined) {
		spells = _.concat(spells, left_hand_spells)
	}

	return spells;
}

function castSpell(player, target, spellListNumber) {
	let spellList = getSpells(player);

	spellList[spellListNumber].action(player, target);
}

// fake user input 
function init() {
	player1 = _.cloneDeep(playerTemplate);
	players.push(player1);
	player1.name = "Korath";
	player1.rightHand = [];
	player1.leftHand = [];

	player2 = _.cloneDeep(playerTemplate);
	players.push(player2);
	player2.name = "Molina";
	player2.rightHand = [];
	player2.leftHand = [];
}

function fakeRoundOne() {
	round++;
	takeTurn(player1, "F", ">");
	takeTurn(player2, "W", "W");
	//console.log(player2);
	let spellList1 = getSpells(player1);
	//console.log(spellList1);
	let spellList2 = getSpells(player2);
	//console.log(spellList2);
	if (spellList2.length > 0) {
		castSpell(player2, player2, 0);
	}
	if (spellList1.length > 0) {
		castSpell(player1, player2, 0);
	}
	//console.log(player2);
	//run timer functions at end of round. forEach through instead of first index
	runTimer(player1, round);
	runTimer(player2, round);
}

function fakeRoundTwo() {
	round++;
	takeTurn(player1, "F", ">");
	takeTurn(player2, "W", "P");
	spellList1 = getSpells(player1);
	//console.log(spellList1);
	spellList2 = getSpells(player2);
	//console.log(spellList2);	

	if (spellList2.length > 0) {
		castSpell(player2, player2, 0);
	}
	
	if (spellList1.length > 0) {
		castSpell(player1, player2, 0);
	}


	//console.log(player2);
}

//returns an array of the correct player order based on spell priority
function orderPlayers(players) {
	let playerOrder = [];	
	let playerSet = [];
	let priority = ['Dispel magic', 'Counter-spell', 'Counter spell', 'Magic mirror', 'Summon goblin', 'Summon ogre', 'Summon troll', 'Summon giant', 'Summon elemental', 'Raise dead', 'Haste', 'Time stop', 'Protection from evil', 'Resist heat', 'Resist cold', 'Paralysis', 'Amnesia', 'Fear', 'Confusion', 'Charm monster', 'Disease', 'Poison', 'Cure light wounds', 'Cure heavy wounds', 'Anti Spell', 'Blindness', 'Invisibility', 'Permanency', 'Delayed effect', 'Remove Enchantment', 'Shield', 'Missile', 'Cause light wounds', 'Cause heavy wounds', 'Lightning bolt', 'Fireball', 'Finger of death', 'Fire storm', 'Ice Storm', 'Stab'];
	let result = [];

	_.forEach(players, function (value, key) {
		playerSet = [];

		if (value.currentSpell !== '') {
			playerSet.push(value.name, value.currentSpell);
			playerOrder.push(playerSet);		
		}		
	});

	for (let i = 0; i < priority.length; i += 1) {
		_.forEach(players, function(value, key) {
			if (value.currentSpell === priority[i]) {
				result.push(value.name);
			}
		})
	}

	return result;
}

console.log(orderPlayers(players));





