//const dice = require('../functions').dice;
const config = require('../config');

function chooser(message, params) {

	choices = params.join(" ").split(",");
	choices.map(x => x.trim());
	choice = choices[Math.floor(Math.random() * choices.length)];
	text = "Out of [" + params.join(" ") + "] I chose " + choice + ".";
	message.reply(text);

}

module.exports.chooser = chooser;
