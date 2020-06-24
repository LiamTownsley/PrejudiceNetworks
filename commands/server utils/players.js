module.exports = {
    name: 'players',
    aliases: ['serverinfo'],
    description: 'Shows information about the server.',
    execute(message) {
        message.channel.send({
            embed: {
                title: '<:list:722476302615052379> Players',
                fields: [
                    {
                        name: 'Server Name',
                        value: '`[NEW] Prejudice Networks - ArabRP`',
                        inline: true,
                    },
                    {
                        name: 'Map',
                        value: 'rp_locality',
                        inline: true,
                    },
                    {
                        name: 'Players',
                        value: 'N/A',
                        inline: true,
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: `Requested by ${message.author.tag}`,
                    icon_url: message.author.displayAvatarURL(),
                },
            },
        });
    },
};