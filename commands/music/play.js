const music = require("../../modules/music");

module.exports = {
	name: 'play',
	description: 'Plays music.',
	aliases: ['p'],
    usage: '[song]',
    guildOnly: true,
	cooldown: 10,
	execute(message, args, bot) {
        music.execute(message, message.guild.id)
    }
};