function formatDate(date)  {
    let toReturn = ""
    if(date.getDate() != new Date().getDate()) toReturn = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} `
    toReturn = toReturn + `${date.getHours()}:${("00"+date.getMinutes()).slice(-2)}`
    return toReturn
}

module.exports = {
    name: 'whois',
    description: 'Shows information on a specific user',
    execute(message, args, bot) {
        let member = message.mentions.members.first()
        if(!member) return message.reply(" this is not a valid member.")
        let roles = ""
        member.roles.cache.array().forEach(role => {
            roles = roles + " " + role.toString()
        })
        let perms = member.permissions.toArray().join(", ")
        if((perms.indexOf("ADMINISTRATOR") !=-1 ? true:false)) perms = "ADMINISTRATOR"
        message.channel.send({embed: {
            title: `Information for ${member.user.tag}`,
            thumbnail: {
                url: member.user.displayAvatarURL()
            },
            color: member.displayHexColor,
            fields: [
                {
                    name: "User",
                    value: member.toString(),
                    inline: true
                },
                {
                    name: "Bot",
                    value: (member.user.bot ? '🟩' : '🟥'),
                    inline: true
                },
                {
                    name: "Last Message",
                    value: (member.lastMessage ? `[${formatDate(new Date(member.lastMessage.createdTimestamp))}](${member.lastMessage.url})` : 'N/A'),
                    inline: true
                },
                {
                    name: "Joined",
                    value: formatDate(member.joinedAt),
                    inline: true
                },
                {
                    name: "Created At",
                    value: formatDate(member.user.createdAt),
                    inline: true
                },
                {
                    name: "Roles",
                    value: roles,
                    inline: true
                },
                {
                    name: "Permissions",
                    value: `\`\`\`brainfuck\n${perms}\`\`\``,
                    inline: true
                }
            ],
            timestamp: new Date(),
            footer: {
                text: `Requested by ${message.author.tag}`,
                icon_url: message.author.displayAvatarURL()
            }
        }})
    }
};