module.exports = {
    name: 'flip',
    description: 'Flips a coin',
    aliases: ["cf"],
    usage: "(number of coins to flip)",
    essential: false,
    permission: 1,
    guildOnly: false,
    execute(message, args) {
        function coinFlip() {
            return(Math.random() < 0.5) ? 'Heads' : 'Tails'; //ofc 0.3 is 30% (3/10)
        }
    
        var howManyTimes=args[0];
        var countHeads=0; 
        
        for (var i=0; i<howManyTimes;i++){
            if (coinFlip()==='Heads'){
                countHeads++;
        }
   }
   message.channel.send(`You got ${countHeads} heads and ${howManyTimes-countHeads} tails.`)
    }
};