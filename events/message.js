const prefix = process.env.PREFIX
const {
    Discord
} = require('../bot')

module.exports = (bot, message) => { 
    Discord.Structures.extend('GuildMember', GuildMember => {
        class CustomPermissions extends GuildMember {
            constructor(bot, data, ) {
                super(bot, data);
                this.permissionLevel = 0;
            }
        }
        return CustomPermissions;
    });

    if(message.author.bot) return;
    if (!message.content.startsWith(prefix)) return bot.channels.cache.get("722811357715759114").send({embed: {
        title: "<:list:722476302615052379> Message Log",
        thumbnail: {
            url: message.author.displayAvatarURL() 
        },
        fields: [
            {
                name: 'Author',
                value: message.author.toString(),
                inline: true
            },
            {
                name: 'Channel',
                value: message.channel.toString(),
                inline: true
            },
            {
                name: 'Timestamp',
                value: message.createdAt
            },
            {
                name: 'Content',
                value: `\`\`\`${message.cleanContent.replace(/`/g, "'")}\`\`\``
            } 
        ]
    }});

    bot.channels.cache.get("722813963401953302").send({embed: {
        title: "<:list:722476302615052379> Command Log",
        thumbnail: {
            url: message.author.displayAvatarURL()
        },
        fields: [
            {
                name: 'Author',
                value: message.author.toString(),
                inline: true
            },
            {
                name: 'Channel',
                value: message.channel.toString(),
                inline: true
            },
            {
                name: 'Timestamp',
                value: message.createdAt
            },
            {
                name: 'Content',
                value: `\`\`\`${message.cleanContent.replace(/`/g, "'")}\`\`\``
            }
        ]
    }})
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) ||
        bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    if (command.devOnly && message.author.id != "471749017907494912") {
        return message.reply(`You have insufficient permission to run \`${command.name}\`.`)
    }

    if (message.channel.type == "dm") {
        if (message.author.id != "471749017907494912") {
            return message.reply("You have insufficient permission to run commands here.")
        }
    } else {
        if (bot.permissionGroups[message.member.roles.highest.id] > message.member.permissionLevel) {
            return message.reply(`You have insufficient permission to run \`${command.name}\`.`)
        }
    }

    if(command.disabled) return message.channel.send("This command is disabled.")

    if (!command.essential && 
        message.channel.name != "bot-commands" && 
        message.channel.type != "dm" && 
        !message.channel.name.startsWith("staff-") && 
        message.channel.id !=="722824343222091796" && 
        !message.channel.id !== "722824400767942716")     
    return message.channel.send(`Use the <#722819935549784104> for non-essential commands such as \`${command.name}\`.`)

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;
        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.channel.send(reply);
    }

    if (!bot.cooldowns.has(command.name)) {
        bot.cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = bot.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args, bot);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
}