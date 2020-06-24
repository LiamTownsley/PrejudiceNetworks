module.exports = {
    name: 'ticketunban',
    description: 'Unbans a member from tickets.',
    guildOnly: true,
    aliases: ['unbanticket'],
    permission: 3,
    args: true,
    essential: true,
    usage: '<@users>',
    execute(message) {
        let membersAdded = '';
        message.mentions.members.array().forEach(member => {
            member.roles.remove('723922449590386809', `Unbanned by ${message.author.tag} (${message.author.id})`);
            membersAdded = membersAdded + member.toString() + '\n';
        });
        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Ticked Unbanned',
                description: `The following users have been unbanned from tickets:\n${membersAdded}`,
            },
        });
    },
};