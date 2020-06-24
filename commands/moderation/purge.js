module.exports = {
    name: 'purge',
    description: 'Purges chat.',
    usage: '<number>',
    args: true,
    essential: true,
    devOnly: true,
    permission: 3,
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        message.channel.bulkDelete(parseInt(args[0]) + 1, true);
        message.channel.send(`**Chat purged!** ${args[0]} messages have been deleted.`)
            .then(msg => {
                msg.delete({
                    timeout: 5000,
                    reason: 'Purging chat.',
                });
            })
            .catch(err => {
                console.log(err);
            });
    },
};