module.exports = {
    name: 'forums',
    essential: true,
    description: 'Gives a link to the forums.',
    execute(message) {
        message.channel.send('<https://forums.com>');
    },
};