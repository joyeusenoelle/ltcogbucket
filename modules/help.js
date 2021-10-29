const config = require('../config');

function help(message, topic) {
	switch (topic) {
		case 'coin':
			message.channel.send(`\`\`\`prolog
${config.prefix}Coin: displays the current coin pool

\`\`\``);
			break;
		case 'roll':
		case 'poly':
			message.channel.send(`\`\`\`prolog
${config.prefix}Poly or ${config.prefix}Roll: rolls any combination of polyhedral dice with modifier, or rolls SFA challenge dice
Examples:
    ${config.prefix}poly 1d4 2d6+1 1d100-60 
    ${config.prefix}roll 4C
\`\`\``);
			break;
		case 'gm':
			message.channel.send(`\`\`\`prolog
${config.prefix}gm: exposes GM tools, currently including threat and momentum trackers
Examples:
    To display current threat/momentum:
      ${config.prefix}gm t   |  ${config.prefix}gm m  |  ${config.prefix}gm tm
    To set threat/momentum to 5:
      ${config.prefix}gm t5  |  ${config.prefix}gm m5
    To increase threat/momentum by 2:
      ${config.prefix}gm t+2 |  ${config.prefix}gm m+2
    To reduce threat/momentum by 1:
      ${config.prefix}gm t-1 |  ${config.prefix}gm m-1
\`\`\``);
			break;
		case 'choose':
			message.channel.send(`\`\`\`prolog
${config.prefix}choose: chooses from among a comma-separated list
Examples:
    ${config.prefix}choose Rock, Paper, Scissors
\`\`\``);
			break;
		case 'sta':
			message.channel.send(`\`\`\`prolog
${config.prefix}sta: rolls Star Trek Adventures dice
Examples:
    You're rolling normally, your target number is 15, and you don't have a helpful Focus:
	  ${config.prefix}sta 2 15
    You've bought one die, your target number is 12, you DO have a helpful focus, and your Discipline is 3:
	  ${config.prefix}sta 3 12 3
\`\`\``);
			break;
		case 'd5stats':
		case 'd5stat':
			message.channel.send(`\`\`\`prolog
${config.prefix}d5stats: generates ability scores for D&D 5th edition
This generates ability scores with the following common method, which generates scores slightly higher than average: 
Roll 4d6. If any die comes up 1, re-roll it. Continue until no dice have rolled 1. Drop the lowest die and add the rest together.
Example:
		${config.prefix}d5stats
\`\`\``);
			break;
		default:
			message.channel.send(`\`\`\`prolog
type '${config.prefix}Help [topic]' for further information
${config.prefix}Poly or ${config.prefix}Roll: rolls any combination of polyhedral dice
${config.prefix}Gm: tracks Threat and Momentum
${config.prefix}Ver: displays bot version
${config.prefix}Help: displays help for topics
\`\`\`

Star Trek Adventures by Modiphius Entertainment
<https://www.modiphius.net/collections/star-trek-adventures>
<https://www.drivethrurpg.com/product/214552/Star-Trek-Adventures-Core-Rulebook>

`);
			break;
	}
}

exports.help = help;
