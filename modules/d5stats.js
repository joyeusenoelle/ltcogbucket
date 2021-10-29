const dice = require('../functions').dice;
const config = require('../config');

function d5stats(message) {
	let text = 'rolled: ';
	let rolls = [];
    for (step = 0; step < 6; step++) {
		let localrolls = [];
		for (let j = 0; j < 4; j++) {
			let croll = dice(6);
			while (croll == 1) {
				croll = dice(6);
			}
			localrolls.push(croll);
		}
		localrolls.sort((a,b) => parseInt(b) - parseInt(a));
		localrolls.pop();
		rolls.push(localrolls.reduce((p,c) => p+c));
	}
	rolls.forEach((roll) => {
		text += `${roll}, `;
	});
	text = `${text.slice(0, -2)}.`;
	message.reply(text);
}

module.exports = d5stats;
