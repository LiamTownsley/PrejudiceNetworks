const { execute } = require('../../modules/music');

module.exports = {
    name: 'play',
    description: 'Plays music.',
    aliases: ['p'],
    usage: '[song]',
    guildOnly: true,
    cooldown: 10,
    execute(message) {
        execute(message, message.guild.id);
    },
};