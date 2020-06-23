module.exports = {
    name: 'raid',
    description: 'Toggles raid status.',
    permission: 4,
    cooldown: 0.01,
    guildOnly: true,
    execute(message, args, bot) {
        bot.raid = !bot.raid;
        message.channel.send(`Raid mode was **${(bot.raid ? 'enabled' : 'disabled')}**.`);
    },
};