const dice = require('../functions').dice;
const config = require('../config');

function d5stats(message) {
	let text = 'rolled:';
    for (step = 0; step < 5; step++) {
		let modifier = 0;
		let reBasic = /(\d+)d(\d+)$/i;
		let reMod = /(\d+)d(\d+)([\+\-]?\d*)$/i;
		let reAdv = /(\d+)d(\d+)([kl]{1,2})(\d+)([\+\-]?\d*)$/i;
		let reTgt = /(\d+)d(\d+)([\+\-]?\d*)([><=]{1,2})(\d*)$/i;
		let reChal = /(\d+)c$/i;
		let mtch;
		let rolls = [];
		let total = 0;

		text += `  \`${unit}\` (`;

		if ((mtch = reBasic.exec(unit)) != null) {
			// form: xdy
			let dieAmount, dieType;
			[, dieAmount, dieType] = mtch;
			if (dieAmount > config.maxRollsPerDie) {
				message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
				return;
			}
			for (let j = 0; j < dieAmount; j++) {
				rolls.push(dice(dieType));
			}
			rolls.forEach(roll => {
				text += `${roll} + `;
				total += roll;
			});
			text = `${text.slice(0, -3)})`;
			if (text.length < 1500) {
				text += ` = ${total}.`;
			} else text = `Too many dice to display.  Total roll is ${total}.`;
		} else if ((mtch = reMod.exec(unit)) != null) {
			// form: xdy+/-z
			let dieAmount, dieType, modifier;
			[, dieAmount, dieType, modifier] = mtch;
			if (dieAmount > config.maxRollsPerDie) {
				message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
				return;
			}
			for (let j = 0; j < dieAmount; j++) {
				rolls.push(dice(dieType));
			}
			rolls.forEach(roll => {
				text += `${roll} + `;
				total += roll;
			});
			text = `${text.slice(0, -3)})`;
			text += `${modifier}`;
			total += parseInt(modifier);
			if (text.length < 1500) {
				text += ` = ${total}.`;
			} else text = `Too many dice to display.  Total roll is ${total}.`;
		} else if ((mtch = reAdv.exec(unit)) != null) {
			// form: xdyk(l)a+/-z
			let dieAmount, dieType, keep, keepNum, modifier;
			[, dieAmount, dieType, keep, keepNum, modifier] = mtch;
			// console.log(`modifier is "${modifier}"`);
			if (dieAmount > config.maxRollsPerDie) {
				message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
				return;
			}
			for (let j = 0; j < dieAmount; j++) {
				rolls.push(dice(dieType));
			}
			let sortedRolls = [...rolls];
			sortedRolls.sort((a, b) => { return a - b; });
			let toss = [];
			let keepers = [];
			if (keep == "k") {
				sortedRolls.reverse();
				while (sortedRolls.length > parseInt(keepNum)) {
					toss.push(sortedRolls.pop());
				}
			} else {
				while (sortedRolls.length > parseInt(keepNum)) {
					toss.push(sortedRolls.pop());
				}
			}
			rolls.forEach(roll => {
				let ti;
				if ((ti = toss.indexOf(roll)) != -1) {
					text += `~~${roll}~~ + `;
					toss.splice(ti, 1);
				} else {
					text += `${roll} + `;
					total += roll;
				}
				// console.log(`${rolls} - ${sortedRolls} - ${toss} - ${total}`);
			});
			text = `${text.slice(0, -3)})`;
			if (modifier != "") {
				text += `${modifier}`;
				total += parseInt(modifier);
			}
			if (text.length < 1500) {
				text += ` = ${total}.`;
			} else text = `Too many dice to display.  Total roll is ${total}.`;
		} else if ((mtch = reTgt.exec(unit)) != null) {
			// form: xdy+/-z(<>=)a
			let dieAmount, dieType, modifier, eqDir, sTgtNum;
			[, dieAmount, dieType, modifier, eqDir, sTgtNum] = mtch;
			let tgtNum = parseInt(sTgtNum);
			// console.log(`modifier is "${modifier}"`);
			if (dieAmount > config.maxRollsPerDie) {
				message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
				return;
			}
			for (let j = 0; j < dieAmount; j++) {
				rolls.push(dice(dieType));
			}
			rolls.forEach(roll => {
				if ((eqDir == ">" && roll <= tgtNum) 
					|| (eqDir == ">=" && roll < tgtNum) 
					|| (eqDir == "<" && roll >= tgtNum) 
					|| (eqDir == "<=" && roll > tgtNum)) {
					text += `~~${roll}~~, `;
				} else {
					text += `${roll}, `;
					total += 1;
				}
				// console.log(`${rolls} - ${sortedRolls} - ${toss} - ${total}`);
			});
			text = `${text.slice(0, -2)})`;
			if (modifier != "") {
				text += `${modifier}`;
				total += parseInt(modifier);
			}
			if (text.length < 1500) {
				text += ` = ${total} successes.`;
			} else text = `Too many dice to display.  Total roll is ${total}.`;
		} else if ((mtch = reChal.exec(unit)) != null) {
			// form: xc
			let dieAmount;
			[, dieAmount] = mtch;
			if (!dieAmount) dieAmount = 1;
			let dieType = 6;
			let total = 0;
			let fx = 0;
			let rolls = [];
			let results = [];
			let effects = [];
			if (dieAmount > config.maxRollsPerDie) {
				message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
				return;
			}
			for (let j = 0; j < dieAmount; j++) {
				let r = dice(dieType);
				switch(r) {
					case 1:
					case 2: 
						rolls.push(r);
						results.push(r);
						break;
					case 3:
					case 4:
						rolls.push(r);
						results.push(0);
						break;
					case 5:
					case 6:
						rolls.push(`${r}\\*`);
						results.push(1);
						effects.push(1);
						break;
				}
			}
	                rolls.forEach(roll => {
	                        text += `${roll}, `;
	                });
			text = `${text.slice(0,-2)}) (`;
			results.forEach(result => {
				total += result;
				text += `${result} + `;
			});
			effects.forEach(effect => {
				fx += effect;
			});

	        text = `${text.slice(0, -3)})`;
		    if (text.length < 1500) {
	            text += ` = ${total}`;
				if (fx > 0) {
					text += ` with ${fx} Effect`;
					if (fx > 1) {
						text += `s`;
					}
				}
				text += `.`;
			} else {
				text = `Too many dice to display.  Total roll is ${total}`;
				if (fx > 0) {
					text += ` with ${fx} Effect`;
					if (fx > 1) {
						text += `s`;
					}
				}
				text += `.`;
            }

		} else {
			// put this in once the rest of the branches are coded
			text += "Dice not recognized."
		}

	});
	message.reply(text);
}

module.exports = poly;
