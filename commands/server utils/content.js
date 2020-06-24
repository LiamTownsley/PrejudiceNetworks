module.exports = {
    name: 'content',
    aliases: ['contentpack', 'cp'],
    essential: true,
    description: 'Gives a link to the Content Pack.',
    execute(message) {
        message.channel.send('<https://steam.com/content>');
    },
};