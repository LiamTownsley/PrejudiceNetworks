module.exports = {
    name: 'flip',
    description: 'Flips a coin',
    aliases: ['cf'],
    usage: '(number of coins to flip)',
    essential: false,
    permission: 1,
    guildOnly: false,
    execute(message, args) {
        function coinFlip() {
            return(Math.random() < 0.5) ? 'Heads' : 'Tails';
        }

        const howManyTimes = args[0];
        let countHeads = 0;

        for (let i = 0; i < howManyTimes; i++) {
            if (coinFlip() === 'Heads') {
                countHeads++;
            }
        }
        message.channel.send(`You got ${countHeads} heads and ${howManyTimes - countHeads} tails.`);
    },
};