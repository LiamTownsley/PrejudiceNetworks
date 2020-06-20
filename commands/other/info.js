function msToTime(s)  {
    var toReturn = "";
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    if(hrs>0) toReturn = hrs + " hours "
    if(mins>0) toReturn = toReturn + mins + " minutes "
    if(secs>0) toReturn = toReturn + secs + " seconds"

    return toReturn;
  }

module.exports = {
    name: 'info',
    description: 'List information about the bot.',
    execute(message, args, bot) {
        message.channel.send("Pinging.")
        .then(msg => { 
            bot.fetchApplication()
            .then(applicationInfo => {
                
                msg.delete()
                message.channel.send({embed: {
                title: `${bot.user.username} Bot Information`,
                thumbnail: {
                    url: bot.user.displayAvatarURL()
                },
                fields: [
                    {
                      name: "🖥️ Language",
                      value: "discord.js",
                      inline: true  
                    },
                    {
                        name: "⚙️ Developer",
                        value: applicationInfo.owner.toString(),
                        inline: true 
                    },
                    {
                        name: "🕐 Uptime",
                        value: msToTime(bot.uptime),
                        inline: true
                    },
                    {
                        name: "📚 Prefix",
                        value: `\`${process.env.PREFIX}\``,
                        inline: true
                    },
                    {
                        name: "⌛ Bot Ping",
                        value: msg.createdTimestamp - message.createdTimestamp+"ms",
                        inline: true
                    },
                    {
                        name: "⌛ Discord Ping",
                        value: Math.round(message.client.ws.ping)+"ms",
                        inline: true
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: `Requested by ${message.author.tag}`,
                    icon_url: message.author.displayAvatarURL()
                }
            }})
            })

            
        })
        
    }
};