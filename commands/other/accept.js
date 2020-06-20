module.exports = {
    name: 'accept',
    description: 'Accept the rules.',
    cooldown: 5,
    guildOnly: true,
    essential: true,
    execute(message, args, bot) {
        message.member.roles.add("722489965229113444");
        message.delete();
    }
};