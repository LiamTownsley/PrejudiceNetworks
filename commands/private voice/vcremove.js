module.exports = {
    name: 'vcremove',
    description: 'Removes member(s) from your VC.',
    usage: '<@members>',
    args: true,
    cooldown: 5,
    guildOnly: true,
    execute(message) {
        const userID = message.member.voice.channel.name.match(/[0-9]{18}/g);
        let membersRemoved = '';

        if(userID != message.author.id) {
            return message.channel.send({
                embed: {
                    title: '<:list:722476302615052379> Insufficient Permissions',
                    description: 'You do not own this Voice Channel, you are unable to remove access from it.',
                },
            });
        }
        message.mentions.members.array().forEach(member => {
            message.member.voice.channel.permissionOverwrites.get(member.id).delete();
            membersRemoved = membersRemoved + member.toString() + '\n';
        });

        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Removed from Voice Chat',
                description: 'The following members have been removed from the Voice Channel\n' + membersRemoved,
            },
        });
    },
};