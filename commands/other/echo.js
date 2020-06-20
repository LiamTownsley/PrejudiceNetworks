const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'echo',
    description: 'Echos whatever the arguments are.',
    aliases: ['say'],
    usage: '[message]',
    permission: 3,
    args: true,
    cooldown: 5,
    execute(message, args) {
        message.channel.send(args.join(" "))
        message.delete()
    }
};