module.exports = {
    name: 'roll',
    description: 'Rolls a number between the range.',
    usage: "(number one) (number two)",
    essential: false,
    permission: 1,
    guildOnly: false,
    execute(message, args) {
        if(!args[0]) return message.channel.send(`You have rolled: **${Math.floor(Math.random() * 10)}**`)
        if(!args[1]) return message.channel.send(`You have rolled: **${Math.floor(Math.random() * parseInt(args[0]))}**`)
        message.channel.send(`You have rolled: **${Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0])}**`)
    }
};