const { readFileSync, writeFileSync } = require('fs');

module.exports = {
    async askQuestion(question, message, channel, cleanup, callback) {
        const finalAnswer = channel.send({
            embed: {
                title: '<:list:722476302615052379> Question',
                description: question,
            },
        })
            .then(msg => {
                const filter = m => message.author.id === m.author.id;
                const answer = channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000,
                    errors: ['time'],
                })
                    .then(collected => {
                        const collectedAnswer = collected.first().content;
                        // if(collectedAnswer.toLowerCase() == 'exit') return false;
                        if (cleanup) {
                            collected.first().delete();
                            msg.delete();
                        }
                        if (callback) callback(collectedAnswer);
                        return collectedAnswer;
                    })
                    .catch(() => {
                        return false;
                    });
                return answer;
            });
        return finalAnswer;
    },

    getTicketNumber() {
        const ticketNum = parseInt(readFileSync('./data/ticket.txt', 'utf8'));
        writeFileSync('./data/ticket.txt', ticketNum + 1, 'utf8');
        return ('0000' + ticketNum).slice(-4);
    },
};