require('dotenv').config();

const Discord = require('discord.js');

const { success } = require('log-symbols');
const { log } = require('./modules/logger');
const fs = require('fs');
const { titleCase } = require('./modules/functions');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.cooldowns = new Discord.Collection();
bot.permissionGroups = {
    '722489965229113444': 1,
    '722489912171036784': 2,
    '721281052974252043': 3,
    '722489210711572670': 4,
    '722458984690221078': 5,
};
bot.log = log;
bot.raid = false;
bot.recentJoins = 0;
bot.loadingStarted = new Date();

fs.readdirSync('./commands/').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        bot.log(`${success} Loading Command \x1b[36m${file.split('.')[0]}\x1b[0m in module \x1b[36m${titleCase(dirs)}\x1b[0m`);
        const command = require(`./commands/${dirs}/${file}`);
        bot.commands.set(command.name, command);
    }
});

fs.readdir('./events/', (err, files) => {
    console.log('');
    if (err) return console.error(err);
    files.forEach(file => {
        bot.log(`${success} Loading Event: \x1b[36m${file.split('.')[0]}\x1b[0m`);
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        bot.on(eventName, event.bind(null, bot));
    });
    console.log('');
});

fs.readdir('./process/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        bot.log(`${success} Loading Process Event: \x1b[36m${file.split('.')[0]}\x1b[0m`);
        const processFile = require(`./process/${file}`);
        const processName = file.split('.')[0];
        process.on(processName, processFile);
    });
    console.log('');
});

/*
process.on('SIGINT', function() {
    process.exit();
});*/

bot.login();

module.exports = { Discord };
