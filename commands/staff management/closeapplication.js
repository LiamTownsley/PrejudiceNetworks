module.exports = {
    name: 'closeapplication',
    aliases: ['closeapp', 'exitapp', 'close'],
    description: 'Closes a ticket.',
    guildOnly: true,
    essential: true,
    execute(message) {
        if (!message.channel.parentID == '725497822266392617') return message.channel.send('This command can only be used in Staff Applications.');
        if (
            message.member.roles.cache.has('722489210711572670') ||
			message.channel.topic == message.author.id) {
            message.channel.send({
                embed: {
                    title: '<:list:722476302615052379> Closing Application',
                    description: 'This application is now being closed. It will be deleted in **1 minute**.',
                },
            })
                .then(msg => {
                    setTimeout(() => {
                        msg.channel.delete();
                    }, 60000);
                });
        }
    },
};