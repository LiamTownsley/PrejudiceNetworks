const music = require("../../modules/music");

module.exports = {
	name: 'stop',
	description: 'Stops all music.',
    aliases: ['fuckoff'],
    guildOnly: true,
	cooldown: 10,
	execute(message, args, bot) {
        music.stop(message, message.guild.id)
        message.channel.send("This music has been stopped & the bot has disconnected.")
    }
};