module.exports = {
    name: 'vcadd',
    description: 'Adds member(s) to your VC.',
    usage: '<@members>',
    args: true,
    cooldown: 5,
    guildOnly: true,
    execute(message) {
        const userID = message.member.voice.channel.name.match(/[0-9]{18}/g);
        let membersAdded = '';

        if(userID != message.author.id) {
            return message.channel.send({
                embed: {
                    title: '<:list:722476302615052379> Insufficient Permissions',
                    description: 'You do not own this Voice Channel, you are unable to give access from it.',
                },
            });
        }
        message.mentions.members.array().forEach(member => {
            message.member.voice.channel.updateOverwrite(member.id, { VIEW_CHANNEL: true });
            membersAdded = membersAdded + member.toString() + '\n';
        });

        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Added to Voice Chat',
                description: 'The following members have been added to the Voice Channel\n' + membersAdded,
            },
        });
    },
};