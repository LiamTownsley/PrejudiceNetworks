module.exports = {
	name: 'close',
	description: 'Closes a ticket.',
	guildOnly: true,
	essential: true,
	execute(message, args, bot) {
		if (!message.channel.name.startsWith("ticket-")) return message.channel.send("This command can only be used in tickets.")
		if (
			!message.member.roles.cache.has("723921845216215050") ||
			!message.member.roles.cache.has("721281052974252043") ||
			message.channel.topic == message.author.id)
			message.channel.send({
				embed: {
					title: "<:list:722476302615052379> Closing Ticket",
					description: "This ticket is now being closed."
				}
			})
			.then(msg => {
				setTimeout(() => {
					msg.channel.delete();
				}, 10000)
			})
	}
};