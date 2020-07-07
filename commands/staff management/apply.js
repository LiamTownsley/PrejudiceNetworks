const {
    askQuestion,
} = require('../../modules/functions');

module.exports = {
    name: 'apply',
    description: 'Apply for staff.',
    aliases: ['staffapplication', 'staffapp'],
    async execute(message) {
        if (message.guild.channels.cache.find(channel => channel.parentID === '725497822266392617' && channel.topic == message.author.id)) {
            return message.reply('you already have an open application!');
        }
        message.guild.channels.create((message.author.username || 'staff-app'), {
            type: 'text',
            parent: '725497822266392617',
            topic: message.author.id,
            reason: `Staff Application created for ${message.author.tag}`,
            permissionOverwrites: [{
                id: message.guild.id,
                deny: ['VIEW_CHANNEL'],
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL'],
            },
            ],
        })
            .then(channel => {
                (async () => {
                    channel.send(message.author.toString(), {
                        embed: {
                            title: '<:list:722476302615052379> Staff Application',
                            description: 'You will be asked a series of questions about the server, staffing, etc. You will have 10 minutes to answer each question.\n\nIf you wish to cancel this application reply `exit` to any of the questions.',
                        },
                    });
                    message.reply(`your application has been opened ${channel.toString()}.`);

                    const answers = [];
                    const questions = [
                        'What is your in-game name?',
                        'Why are you applying for staff?',
                        'Why should we pick you for staff over others?',
                        'What is your playtime?',
                    ];

                    let toSend = '';
                    let shouldExit = false;
                    for (const question of questions) {
                        const answer = await askQuestion(question, message, channel, false);
                        if (!answer) {
                            channel.send('**Timeout!** You did not answer the question(s) in the allocated time.');
                            break;
                        }

                        if (answer == 'exit') {
                            shouldExit = true;
                            channel.send({
                                embed: {
                                    title: '<:list:722476302615052379> Application Cancelled',
                                    description: 'This application has been cancelled, it will be deleted in **1 minute**.',
                                },
                            })
                                .then(() => {
                                    setTimeout(() => {
                                        channel.delete();
                                    }, 60000);
                                });
                            break;
                        }
                        answers.push(answer);
                    }
                    if (!shouldExit) {
                        for (const [i, value] of answers.entries()) {
                            toSend = `${toSend}\n**${questions[i]}**\n\`\`\`${value}\`\`\``;
                        }
                        channel.send({
                            embed: {
                                title: '<:list:722476302615052379> Application Opened',
                                description: 'Your application has been opened, please await a response from Staff Management.',
                            },
                        })
                            .then(msg => {
                                channel.updateOverwrite('721281052974252043', { VIEW_CHANNEL: true });
                                channel.updateOverwrite(message.author.id, { SEND_MESSAGES: false });
                                msg.pin();
                            });
                    }
                })();
            });
    },
};