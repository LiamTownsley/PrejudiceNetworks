module.exports = {
	name: 'remove',
	description: 'Removes users to the ticket.',
    guildOnly: true,
    permission: 3,
    args: true,
    essential: true,
	usage: "<@users>",
	execute(message, args, bot) {
        if(!message.channel.name.startsWith("ticket-")) return message.channel.send("This command can only be used in tickets.")
        let membersRemoved = "";
        message.mentions.members.array().forEach(member => {
            message.channel.permissionOverwrites.get(member.id).delete();
            membersRemoved = membersRemoved + member.toString()+"\n"    
        });
        message.channel.send({embed: {
            title: "<:list:722476302615052379> Removed Member(s)",
            description: `The following member(s) have been removed to the ticket:\n${membersRemoved}`,
            timestamp: new Date(),
            footer: {
                text: `Removed by ${message.author.tag} | Removed at`,
                icon_url: message.author.displayAvatarURL()
            }
        }})
	}
};