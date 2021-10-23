const dice = require('../functions').dice;
const config = require('../config');
const storage = require('node-persist');

async function gm(message, params) {
	await storage.init({forgiveParseErrors: true});
	let text = '';
	let threat = await storage.getItem("threat").catch(err => { storage.setItem("threat", 0).catch(err => {console.log("Couldn't get or set threat at beginning.")}); return 0; });
        if (threat == {}) {
	        threat = 0;
	} else {
		threat = parseInt(threat);
	}
	let momentum = await storage.getItem("momentum").catch(err => { storage.setItem("momentum", 0).catch(err => {console.log("Couldn't get or set momentum at beginning.")}); return 0; });
	if (momentum == {}) {
		momentum = 0;
	} else {
		momentum = parseInt(momentum);
	}
	
	params.forEach(unit => {
		let modifier = 0;
		if (unit.toLowerCase() == "tm") {
			text = `Current threat is ${threat}, current momentum is ${momentum}`;
		} else if (unit.startsWith("T") || unit.startsWith("t")) {
			if (unit.includes("+")) {
				threat += parseInt(unit.slice(2,));
				if (text != '') {
					text += ", ";
				}
				text += `Threat increased to ${threat}`;
			} else if (unit.includes("-")) {
				threat -= parseInt(unit.slice(2,));
                                if (text != '') {
					text += ", ";
                                }
				text += `Threat reduced to ${threat}`;
			} else if (unit == "T" || unit == "t") {
                                if (text != '') {
                                	text += ", ";
				}
				text += `Current threat is ${threat}`;
			} else {
				threat = parseInt(unit.slice(1,));
                                if (text != '') {
                                        text += ", ";
                                }
				text += `Threat set to ${threat}`;
			}
		} else if (unit.startsWith("M") || unit.startsWith("m")) {
                        if (unit.includes("+")) {
                                momentum += parseInt(unit.slice(2,));
                                if (text != '') {
                                        text += ", ";
                                }
				text += `Momentum increased to ${momentum}`;
                        } else if (unit.includes("-")) {
                                momentum -= parseInt(unit.slice(2,));
                                if (text != '') {
                                        text += ", ";
                                }
				text += `Momentum reduced to ${momentum}`;
                        } else if (unit == "M" || unit == "m") {
                                if (text != '') {
                                        text += ", ";
                                }
				text += `Current momentum is ${momentum}`;
			} else {
                                momentum = parseInt(unit.slice(1,));
                                if (text != '') {
                                        text += ", ";
                                }
				text += `Momentum set to ${momentum}`;
                        }
                }
	});
	await storage.setItem("threat", threat).catch(err => {console.log("Couldn't set threat at end.")});
	await storage.setItem("momentum", momentum).catch(err => {console.log("Couldn't set momentum at end.")});
	text += ".";
	message.reply(text);
}

module.exports = gm;
