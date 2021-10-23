const dice = require('../functions').dice;
const config = require('../config');

function sta(message, params) {
    //Format: ?sta <# of dice> <target number>
    let numDice, tgtNum, focusNum;
    let total = 0;
    let complications = 0;
    let rolls = [];
    let text = "(";
    [numDice, tgtNum, focusNum, ...rest] = params.map((el) => parseInt(el));
    if (focusNum == undefined) focusNum = 1;
    if (tgtNum == undefined) {
        tgtNum = 10;
        text = "No target number set, using default of 10. (";        
    }
    if (numDice > config.maxRollsPerDie) {
        message.reply(`Roll exceeds max roll per die limit of ${config.maxRollsPerDie}. Please try again.`);
        return;
    }
    for (let j = 0; j < numDice; j++) {
        rolls.push(dice(20));
    }
    rolls.forEach(roll => {
        if (roll == 20) {
            text += `**${roll}**, `;
            complications += 1;
        } else if (roll <= focusNum) {
            text += `*${roll}*, `;
            total += 2;
        } else if (roll <= tgtNum) {
            text += `${roll}, `;
            total += 1;
        } else {
            text += `~~${roll}~~, `;
        }
    });
    text = `${text.slice(0, -2)})`;
    if (text.length < 1500) {
        if (total == 0) {
            text += `: Failure`;
            if (complications > 0) {
                text += `, ${complications} complication`;
                if (complications == 1) {
                    text += ".";
                } else {
                    text += "s.";
                }
            } else {
                text += ".";
            }
        } else {
            text += `: ${total} success`;
            if (total > 1) {
                text += "es";
            }
            if (complications > 0) {
                text += `, ${complications} complication`;
                if (complications == 1) {
                    text += ".";
                } else {
                    text += "s.";
                }
            } else {
                text += ".";
            }
        }
    } else text = `Too many dice to display.  Total roll is ${total}.`;

    message.reply(text);
}

module.exports = sta;