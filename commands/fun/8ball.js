const responses = [
    'As I see it, yes.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don’t count on it.',
    'It is certain.',
    'It is decidedly so.',
    'Most likely.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Outlook good.',
    'Reply hazy, try again.',
    'Signs point to yes.',
    'Very doubtful.',
    'Without a doubt.',
    'Yes.',
    'Yes – definitely.',
    'You may rely on it.',
];
module.exports = {
    name: '8ball',
    description: 'Predicts the future.',
    usage: '<question>',
    args: true,
    essential: false,
    permission: 1,
    cooldown: 5,
    guildOnly: false,
    execute(message) {
        const randomNum = Math.floor(Math.random() * responses.length);
        message.reply(responses[randomNum]);
    },
};