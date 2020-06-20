const { stop } = require('../modules/music')

module.exports = (bot, oldState, newState) => {
   if (newState.channelID == "723944089632112670") {
		newState.guild.channels.create(`Private VC [${newState.id}]`, {
			type: 'voice',
			parent: '723943996556181554',
			reason: `Private Channel creation for ${newState.id}`,
			permissionOverwrites: [{
					id: newState.guild.id,
					deny: ['VIEW_CHANNEL']
				},
				{
					id: newState.id,
					allow: ['VIEW_CHANNEL']
				}
			],
      })
      .then(channel => {
         newState.member.voice.setChannel(channel.id)
      })
   }

   if(oldState.channelID) {
      if(oldState.channel.members.size == 0) {
         if(oldState.channel.name.match(/[0-9]{18}/g) && oldState.channel.parentID == "723943996556181554") {
            oldState.channel.delete()
         }
      }
      
   }

}