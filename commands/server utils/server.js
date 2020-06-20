module.exports = {
    name: 'server',
    aliases: ["connect"],
    essential: true,
    description: 'Gives a link to join the server.',
    execute(message, args, bot) {
        message.channel.send("<https://steam://127.0.0.1>")
    }   
};