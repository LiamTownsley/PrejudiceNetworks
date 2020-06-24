module.exports = {
    name: 'setslots',
    description: 'Sets the amount of slots for the Voice Channel.',
    usage: '<number>',
    args: true,
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        const userID = message.member.voice.channel.name.match(/[0-9]{18}/g);
        if(userID != message.author.id) {
            return message.channel.send({
                embed: {
                    title: '<:list:722476302615052379> Insufficient Permissions',
                    description: 'You do not own this Voice Channel, you are unable to set the slots for it.',
                },
            });
        }
        if(!args[0].match(/[0-9]/g)) {
            return message.channel.send(`\`${args[0]}\` is not a valid number.`);
        }
        message.member.voice.channel.setUserLimit(parseInt(args[0]), `Setting user limit for Private VC owned by ${message.author.tag}`)
            .then(() => {
                if(args[0] == '0') return message.reply('your Voice Channel now has infinite slots.');
                message.reply(`your Voice Channel now has **${args[0]}** slots.`);
            })
            .catch(() => {
                message.member.voice.channel.setUserLimit(99, `Setting user limit for Private VC owned by ${message.author.tag}`);
                message.reply('your Voice Channel now has **99** slots.');
            });
    },
};