module.exports = {
    name: 'add',
    description: 'Adds users to the ticket.',
    guildOnly: true,
    permission: 3,
    args: true,
    essential: true,
    usage: '<@users>',
    execute(message) {
        if(!message.channel.name.startsWith('ticket-')) return message.channel.send('This command can only be used in tickets.');
        let membersAdded = '';
        message.mentions.members.array().forEach(member => {
            message.channel.updateOverwrite(member.id, { VIEW_CHANNEL: true });
            membersAdded = membersAdded + member.toString() + '\n';
        });
        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Added Member(s)',
                description: `The following member(s) have been added to the ticket:\n${membersAdded}`,
                timestamp: new Date(),
                footer: {
                    text: `Added by ${message.author.tag} | Added at`,
                    icon_url: message.author.displayAvatarURL(),
                },
            },
        });
    },
};