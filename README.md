# Lt. Cogbucket
Based heavily on [SkyJedi's STA Discord Dice Roller](https://github.com/SkyJedi/STA-Discord-Dice-Roller).

A Discord dice roller, originally built to roll dice for the *Star Trek Adventures* RPG but substantially expanded since then.

## Usage

In this section we'll be assuming that "!" is your command prefix. You can change that in [Configuration](#configuration).

`!sta [number of dice] [target number] [(optional) discipline]` - Roll *Star Trek Adventures* dice.

* You're rolling normally, your target number is 15, and you don't have a helpful Focus:
    * `!sta 2 15`
* You've bought one die, your target number is 12, you DO have a helpful focus, and your Discipline is 3:
    * `!sta 3 12 3`

`!gm [command]` - Provides GM tools for *Star Trek Adventures*.

* To display current threat/momentum:
    * `!gm t`   |  `!gm m`  |  `!gm tm`
* To set threat/momentum to 5:
    * `!gm t5`  |  `!gm m5`
* To increase threat/momentum by 2:
    * `!gm t+2` |  `!gm m+2`
* To reduce threat/momentum by 1:
    * `!gm t-1` |  `!gm m-1`

## Installation and Setup

1. First you will need to have NodeJS installed on your machine. You can find the latest version [here](https://nodejs.org/en/).
2. Next create a discord account for your bot. You can do this [here](https://discordapp.com/developers/applications/me).
  a. Click "New App".
  b. Provide a **Name** (this is the name people will see when the bot joins a channel) and **Description**.
  c. Click "Create App".
  d. On the new screen click "Create a Bot User".
  e. Open your text editor of choice.
  f. Under the heading "App Bot User" you will see "Token:click to reveal" Click to reveal it and copy the resulting text and paste it in notepad. Be sure to keep this token private.
  g. Under the heading "App Details" Copy the number after "Client ID:" and paste this in notepad as well.
  h. Replace "CLIENT_ID_GOES_HERE" in the following link with the Client ID you copied in the above step https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_GOES_HERE&scope=bot&permissions=0
  i. Paste the edited link into a web browser, select the discord server you wish to add the bot to, and click "Authorize".
3. Click the green "Code" button near the top of this page. You can either clone this repository using git, or download and extract a zip file.
4. Open `config-example.js` with a text editor program of your choice.
5. Set the `token` property to your bot token you copied in step 2f.
6. If you want to change the command prefix or the maximum rolls (see **Configuration** below), you can do that too.
7. Save the edited file as `config.js`.
8. Your bot is now configured and ready to launch.

## Running the bot

To start the bot, simply run `node index.js` from a terminal window.

I recommend running this bot in a terminal multiplexer like [tmux](https://linuxize.com/post/getting-started-with-tmux/), which will allow you to keep it running in the background even after you've closed the terminal window.

## Configuration

Use `config.js` to configure your bot. A sample has been provided; rename it to `config.js` to make it work!

You'll need to set three properties:

  * `token`: This is the Discord login token for your bot, which you collected above in step **2f**. Remember, if you fork this repository, *make sure not to upload your own `config.js` to your fork!*
  * `prefix`: This is the symbol that the bot uses to recognize commands. This is set to "!" by default. (I use "?" because my server has another bot that looks for "!".)
  * `maxRollsPerDie`: This is the maximum number of dice that the bot will roll per command. This is set to 100 by default. If you try to roll more than this, you'll get an error message.

## License

I prefer the MIT license, but SkyJedi went with the GPL, so here we are. Use of the GPL on this project does not imply support for GNU or Richard Stallman.

*Star Trek Adventures* is produced by [Modiphius Entertainment](https://www.modiphius.net/collections/star-trek-adventures).