module.exports = (bot, member) => {
    bot.recentJoins++;
    if(bot.recentJoins >= 5) {
        bot.raid = true;
        bot.channels.fetch('725335023212953681')
            .then(chan => {
                chan.send({
                    embed: {
                        title: '<:list:722476302615052379> Raid Mode',
                        description: 'Raid mode has been activated automatically',
                    },
                });
            });
        setTimeout(() => {
            bot.raid = false;
            bot.channels.fetch('725335023212953681')
                .then(chan => {
                    chan.send({
                        embed: {
                            title: '<:list:722476302615052379> Raid Mode',
                            description: 'Raid mode has been disabled automatically',
                        },
                    });
                });
        }, 60000 * 10);
    }
    setTimeout(() => {
        bot.recentJoins = 0;
    }, 60000);
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