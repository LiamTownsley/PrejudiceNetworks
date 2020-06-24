const prefix = process.env.PREFIX;

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args, bot) {
        const data = [];
        const {
            commands,
        } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:\n```');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\`\`\`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.channel.send({
                embed: {
                    title: `<:list:722476302615052379> Command Help (${commands.size} commands)`,
                    description: data.join(''),
                },
            })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('It seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('That\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`\n**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`\n**Description:** ${command.description}`);
        if (command.permission) {
            for (const key in bot.permissionGroups) {
                if (bot.permissionGroups[key] == command.permission) data.push(`\n**Permission:** <@&${key}>`);
            }
        }
        if (command.usage) data.push(`\n**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`\n**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Command Help',
                description: data.join(''),
            },
        });
    },
};