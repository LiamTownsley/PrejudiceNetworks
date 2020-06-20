/*
- get all roles
- get their current level
- remove 1 from their level
- get the id
- remove the old rank
- add the new rank
- if new rank is member remove the staff tag
*/

const ranks = {
    "722489420003016764": 6, // Senior Administrator
    "722489388163924018": 5, // Administrator
    "722489512185561108": 4, // Senior Moderator
    "722489417243295805": 3, // Moderator
    "722489419394842705": 2, // Trial Moderator
    "722489965229113444": 1 // Member
}

module.exports = {
    name: 'demote',
    description: 'Demotes a member of the staff team.',
    usage: "<member>",
    args: true,
    permission: 4,
    disabled: true,
    cooldown: 5,
    guildOnly: true,
    execute(message, args, bot) {
      const member = message.mentions.members.first()
      let curLvl = 0;
      member.roles.cache.array().forEach(role => {
        let rankLvl = ranks[role.id]  
        for(rank in ranks) {
            if(rankLvl > curLvl) curLvl = rankLvl
        }
        if(curLvl == 1) return message.channel.send("You cannot demote this user, they are already a Member.")
        if(curLvl == 2) {
            member.roles.remove(["721281052974252043"])
        }
        for(rank in ranks) {
            if(ranks[rank] == curLvl) member.roles.remove([rank])
            if(ranks[rank] == curLvl-1) member.roles.add([rank]) 
        }
    });
    }
};
/*
for (rank in ranks) {
            if(rankLvl > curLvl) curLvl = rankLvl
        }       



         for (key in bot.permissionGroups) {
                if (bot.permissionGroups[key] == command.permission) data.push(`\n**Permission:** <@&${key}>`)
            }
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
           if(ranks[rank] == curLvl+1) member.roles.add([rank, "721281052974252043"]) 
       }
       
    }
};





            */