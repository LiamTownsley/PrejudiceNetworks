module.exports = (bot, member) => {
    bot.channels.cache.get('722814773301084230').send({
        embed: {
            title: '<:list:722476302615052379> Welcome to Prejudice Networks',
            thumbnail: {
                url: member.user.displayAvatarURL(),
            },
            description: `Hello, ${member.toString()}! Welcome to Prejudice Networks, if you need any assistance contact a member of staff or create a ticket in the bot commands channel.\n\nYou are in join position ${member.guild.members.cache.array().length}.`,
            footer: {
                text: 'Account was created at',
            },
            timestamp: member.user.createdAt,
        },
    });

    member.user.send({
        embed: {
            title: '<:list:722476302615052379> Welcome to Prejudice Networks',
            thumbnail: {
                url: member.user.displayAvatarURL(),
            },
            description: `Hello, ${member.toString()}! Welcome to Prejudice Networks, if you need any assistance contact a member of staff or create a ticket in the bot commands channel.\n\nYou are in join position ${member.guild.members.cache.array().length}.`,
        },
    });

    if(!bot.raid) return member.roles.add('722489965229113444', 'Automatically adding new member role.');
    bot.channels.fetch('723999527740112949')
        .then(chan => {
            chan.send(member.toString())
                .then(msg => {
                    msg.delete();
                });
        });
};