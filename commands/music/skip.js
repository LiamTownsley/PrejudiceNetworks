const music = require("../../modules/music");

module.exports = {
	name: 'skip',
	description: 'Skips the current song.',
	aliases: ['s'],
    guildOnly: true,
	cooldown: 10,
	execute(message, args, bot) {
        music.skip(message, message.guild.id)
    }
};