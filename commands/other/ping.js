const bot = require("../../bot");

module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(message, args, bot) {
        const m = await message.channel.send("Ping?");
        m.edit(`**Pong!** Latency is ${m.createdTimestamp - message.createdTimestamp}ms.\nWebSocket Latency is ${Math.round(message.client.ws.ping)}ms`);
    },
};