module.exports = (bot) => {
    bot.user.setActivity('Predjudice Networks', {
        type: 'WATCHING'
    });

    console.log(`The bot is now \x1b[36mready\x1b[0m. View some information below:\nStatus: \x1b[36mWatching Prejudice Networks\x1b[0m\nTotal Guild Members: \x1b[36m${bot.users.cache.array().length}\x1b[0m`)
    const guild = bot.guilds.cache.get("721112680848556034");
    function updateMembers() {
        var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        var memberCountChannel = bot.channels.cache.get("722650147397566464");
        if (memberCountChannel.name == `Guild Members: ${memberCount}`) return;
        memberCountChannel.setName(`Guild Members: ${memberCount || "..."}`);
    }
    function updateBans() {
        guild.fetchBans()
            .then(bans => {
                var banCount = bans.array().length
                var banCountChannel = bot.channels.cache.get("722650236132130818");
                if (banCountChannel.name == `Guild Bans: ${banCount}`) return;
                banCountChannel.setName(`Guild Bans: ${banCount || "..."}`);
            })
    }

    updateMembers()
    updateBans()
    setInterval(updateMembers, 60000 * 5);
    setInterval(updateBans, 60000 * 5);

}

