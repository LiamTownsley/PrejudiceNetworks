const {
    askQuestion,
} = require('../../modules/functions');

module.exports = {
    name: 'restartserver',
    description: 'Restarts the server.',
    permission: 5,
    async execute(message) {
        const node = require('nodeactyl');
        const Client = node.Client;

        Client.login('https://panel.kryptonnetworks.co.uk', process.env.GAMEPANEL_TOKEN, (logged_in) => {
            console.log(logged_in);
        });
        const restartConfirm = await askQuestion('Are you sure you want to restart the server?', message, message.channel, true);
        if(restartConfirm.toLowerCase() == 'yes') {
            Client.restartServer('19e749df')
                .then(() => {
                    message.reply('the server has been restarted.');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            message.channel.send('Your reply was not `yes`, restart aborted.');
        }

    },
};