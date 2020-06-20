module.exports = {
    name: 'kick',
    description: 'Kicks a member from the guild.',
    usage: "<member> (reason)",
    args: true,
    permission: 3,
    cooldown: 5,
    guildOnly: true,
    execute(message, args, bot) {
        let reason = args.splice(1).join(" ")
        if(!reason) reason = "No reason provided."
        const user = message.mentions.users.first();
        if (!user) return message.channel.send("You did not mention a valid user.")
        const member = message.guild.member(user);
        if (!member) return message.channel.send("This user is not in the guild.");
        user.send({embed: {
            title: "<:list:722476302615052379> You were kicked from Prejudice Networks",
            description: `You were kicked by ${message.author.toString()} for:\`\`\`${reason}\`\`\``
        }})
        .then(() => {
            member.kick(`${reason} - ${message.author.tag} (${message.author.id}`)
            .then(() => {
                message.channel.send({embed: {
                    title: "<:list:722476302615052379> Member Kicked",
                    description: `${member.toString()} was sucesfully kicked from the guild.`
                }})
                bot.channels.cache.get("722845414067535884").send({embed: {
                    title: "<:list:722476302615052379> Member Kicked",
                    description: `${member.toString()} was kicked from the guild by ${message.author.toString()} for:\n\`\`\`${reason}\`\`\``
                }})
            })
            .catch(err => {
                message.channel.send({embed: {
                    title: "<:list:722476302615052379> Error",
                    description: `I cannot ban ${member.toString()}.`
                }})
            })
        })
        .catch(() => {
            member.kick(`${reason} - ${message.author.tag} (${message.author.id})`)
            .then(() => {
                message.channel.send({embed: {
                    title: "<:list:722476302615052379> Member Kicked",
                    description: `${member.toString()} was sucesfully kicked from the guild.`
                }})
                bot.channels.cache.get("722845414067535884").send({embed: {
                    title: "<:list:722476302615052379> Member Kicked",
                    description: `${member.toString()} was kicked from the guild by ${message.author.toString()} for:\n\`\`\`${reason}\`\`\``
                }})
            })
            .catch(err => {
                message.channel.send({embed: {
                    title: "<:list:722476302615052379> Error",
                    description: `I cannot ban ${member.toString()}.`
                }})
            })
        })
    }
};