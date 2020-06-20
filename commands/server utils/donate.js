module.exports = {
    name: 'donate',
    aliases: ["store"],
    essential: true,
    description: 'Gives a link to the store.',
    execute(message, args, bot) {
        message.channel.send("<https://store.com>")
    }   
};