module.exports = {
	name: 'ticketban',
	description: 'Bans a member.',
    guildOnly: true,
    permission: 3,
    args: true,
    essential: true,
	usage: "<@users>",
	execute(message, args, bot) {
        let membersAdded = "";
        message.mentions.members.array().forEach(member => {
                member.roles.add("723922449590386809", `Banned by ${message.author.tag} (${message.author.id})`)
                membersAdded = membersAdded + member.toString() + "\n"
        });
        message.channel.send({embed: {
            title: "<:list:722476302615052379> Ticked Banned",
            description: `The following users have been ticket banned:\n${membersAdded}`
        }})
	}
};