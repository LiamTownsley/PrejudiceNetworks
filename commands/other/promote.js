const ranks = {
    "722489420003016764": 6, // Senior Administrator
    "722489388163924018": 5, // Administrator
    "722489512185561108": 4, // Senior Moderator
    "722489417243295805": 3, // Moderator
    "722489419394842705": 2, // Trial Moderator
    "722489965229113444": 1 // Member
}

module.exports = {
    name: 'promote',
    description: 'Promotes a member of the staff team.',
    usage: "<member>",
    args: true,
    disabled: true,
    permission: 4,
    cooldown: 5,
    guildOnly: true,
    execute(message, args, bot) {
       const member = message.mentions.members.first()
       let curLvl = 0
       member.roles.cache.array().forEach(role => {
        let rankLvl = ranks[role.id]
        for (rank in ranks) {
            if(rankLvl > curLvl) curLvl = rankLvl
        }       
       });
       if (curLvl==6) return message.channel.send(`This user is already a Senior Administrator, they cannot be promoted.`)
       console.log(curLvl+1)
       for(rank in ranks) {
           if(ranks[rank] == curLvl) member.roles.remove(rank) 
           if(ranks[rank] == curLvl+1) member.roles.add([rank, "721281052974252043"]) 
       }
       
    }
};