require('dotenv').config()
const prefix = process.env.prefix

const Discord = require('discord.js');

const { success } = require('log-symbols');
const { log } = require('./modules/logger')
const fs = require('fs');
const bot = new Discord.Client();
      bot.commands = new Discord.Collection();
      bot.cooldowns = new Discord.Collection();
      bot.permissionGroups = {
          "722489965229113444": 1, // Member
          "722489912171036784": 2, // VIP
          "721281052974252043": 3, // Staff
          "722489210711572670": 4, // Leadership
          "722458984690221078": 5, // Discord Permissions
        }
      bot.log = log
      

fs.readdirSync('./commands/').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith(".js"));
    for (const file of commands) {
        bot.log(`${success} Loading Command: \x1b[36m${dirs}/${file}\x1b[0m`)
        const command = require(`./commands/${dirs}/${file}`);
        bot.commands.set(command.name, command);
    }
});

fs.readdir(`./events/`, (err, files) => {
    console.log("")
    if (err) return console.error(err);
    files.forEach(file => {
        bot.log(`${success} Loading Event: \x1b[36m${file}\x1b[0m`)
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
    console.log("")
});

bot.login()

module.exports = { Discord }