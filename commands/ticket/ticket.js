const {
    askQuestion,
    getTicketNumber,
} = require('../../modules/functions');

module.exports = {
    name: 'ticket',
    description: 'Creates a ticket.',
    aliases: ['new'],
    guildOnly: true,
    usage: '(reason)',
    async execute(message) {
        if (message.member.roles.cache.has('723922449590386809')) return message.channel.send('You are blacklisted from making tickets.');
        if (message.guild.channels.cache.find(channel => channel.parentID === '723910099436830781' && channel.topic == message.author.id)) {
            return message.reply('you already have an open ticket!');
        }
        const ticketNumber = await getTicketNumber();
        message.guild.channels.create(`ticket-${ticketNumber}`, {
            type: 'text',
            parent: '723910099436830781',
            topic: message.author.id,
            reason: `Ticket created for ${message.author.tag}`,
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
                            title: '<:list:722476302615052379> New Ticket',
                            description: `Welcome to the ticket system for **${message.guild.name}**, please answer the questions as they are asked below to ensure that you are given support as quick as possible!`,
                        },
                    });
                    message.reply(`your ticket has been created ${channel.toString()}.`);

                    const answers = [];
                    const questions = [
                        'What is your name?',
                        'Why do you require support?',
                    ];

                    let toSend = '';
                    for (const question of questions) {
                        const answer = await askQuestion(question, message, channel);
                        if (!answer) {
                            channel.send('**Timeout!** You did not answer the question(s) in the allocated time.');
                            break;
                        }

                        if (answer == 'exit') break;
                        answers.push(answer);
                    }

                    for (const [i, value] of answers.entries()) {
                        toSend = `${toSend}\n**${questions[i]}**\n\`\`\`${value}\`\`\``;
                    }
                    channel.send({
                        embed: {
                            title: '<:list:722476302615052379> Ticket Opened',
                            description: toSend,
                            timestamp: new Date(),
                            footer: {
                                text: `Opened by ${message.author.tag}`,
                                icon_url: message.author.displayAvatarURL(),
                            },
                        },
                    })
                        .then(msg => {
                            msg.channel.updateOverwrite('723921845216215050', { VIEW_CHANNEL: true })
                                .then(chan => {
                                    chan.send('<@&723921845216215050>');
                                    msg.pin();
                                });
                        });

                })();
            });
    },
};