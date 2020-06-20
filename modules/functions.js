const { readFileSync, writeFileSync } = require("fs");
const ticket = require("../commands/ticket/ticket");
module.exports = {
    async askQuestion(question, message, channel, callback) {
        let finalAnswer = channel.send({embed: {
            title: "<:list:722476302615052379> Question",
            description: question
        }}).then(msg => {
            const filter = m => message.author.id === m.author.id;

            let answer = channel.awaitMessages(filter, {
                    max: 1,
                    time: 300000,
                    errors: ['time']
                })
                .then(collected => {
                    let collectedAnswer = collected.first().content
                    if(collectedAnswer.toLowerCase() == "exit") return false
                    if (callback) callback(collectedAnswer)
                    collected.first().delete()
                    msg.delete()
                    return collectedAnswer
                })
                .catch(() => {
                    return false;
                })
            return answer
        })
        return finalAnswer;
    },

    getTicketNumber() {
        let ticketNum = parseInt(readFileSync(`./data/ticket.txt`, 'utf8'))
        writeFileSync('./data/ticket.txt', ticketNum+1, 'utf8')
        return ("0000"+ticketNum).slice(-4)
    }
}