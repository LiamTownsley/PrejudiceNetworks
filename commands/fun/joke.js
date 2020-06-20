const https = require("https");

module.exports = {
    name: 'joke',
    description: 'Tells a joke',
    essential: false,
    permission: 1,
    guildOnly: false,
    execute(message, args) {
        https.get(`https://sv443.net/jokeapi/v2/joke/Dark`, res => {
            res.on("data", chunk => {
                let randomJoke = JSON.parse(chunk.toString());
                if(randomJoke.type == "single") {
                    message.reply(randomJoke.joke);
                } else {
                  message.reply(randomJoke.setup);
                    setTimeout(() => {
                        message.channel.send(randomJoke.delivery);
                    }, 3000);
                }
            });
        });
}
}