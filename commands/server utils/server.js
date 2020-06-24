module.exports = {
    name: 'server',
    aliases: ['connect'],
    essential: true,
    description: 'Gives a link to join the server.',
    execute(message) {
        message.channel.send('<steam://connect/109.230.215.216:27087>');
    },
};