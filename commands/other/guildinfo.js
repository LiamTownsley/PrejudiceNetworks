module.exports = {
    name: 'guildinfo',
    description: 'Shows information about the current guild.',
    execute(message) {
        const region = {
            'brazil': ':flag_br: Brazil',
            'europe': ':flag_eu: Central Europe',
            'singapore': ':flag_sg: Singapore',
            'us-central': ':flag_us: U.S. Central',
            'sydney': ':flag_au: Sydney',
            'us-east': ':flag_us: U.S. East',
            'us-south': ':flag_us: U.S. South',
            'us-west': ':flag_us: U.S. West',
            'eu-west': ':flag_eu: Western Europe',
            'vip-us-east': ':flag_us: VIP U.S. East',
            'london': ':flag_gb: London',
            'amsterdam': ':flag_nl: Amsterdam',
            'hongkong': ':flag_hk: Hong Kong',
            'russia': ':flag_ru: Russia',
            'southafrica': ':flag_za:  South Africa',
        };
        const cd = new Date(message.guild.createdAt);
        message.channel.send({
            embed: {
                title: `**${message.guild.name}**`,
                thumbnail: {
                    url: message.guild.iconURL(),
                },
                fields: [
                    {
                        name: 'Region',
                        value: region[message.guild.region],
                        inline: true,
                    },
                    {
                        name: 'Verification Level',
                        value: message.guild.verificationLevel,
                        inline: true,
                    },
                    {
                        name: 'Members',
                        value: `${message.guild.memberCount} members`,
                        inline: true,
                    },
                    {
                        name: 'Owner',
                        value: message.guild.owner.toString(),
                        inline: true,
                    },
                    {
                        name: 'Created At',
                        value: `${cd.getDate()}/${cd.getMonth()}/${cd.getFullYear()}`,
                        inline: true,
                    },
                    {
                        name: 'Emoji',
                        value: message.guild.emojis.cache.array().join(' '),
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