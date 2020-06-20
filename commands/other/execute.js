const {
    exec
} = require("child_process");

module.exports = {
    name: 'execute',
    description: 'Developer Only Command',
    aliases: ["eval", "exec"],
    guildOnly: false,
    devOnly: true,
    usage: '<os/js> <execution code>',
    args: true,
    execute(message, args, bot) {
        let code = args.slice(1).join(" ")

        if (args[0] == "os") exec(code, (err, stdout, stderr) => {
            if (err) return console.log(err);

            console.log(stdout)
            message.channel.send("**Code Executed!** Output will be sent to your DMs.")
            message.author.send(`OS execution output from command \`${code}\`:`)
            message.author.send(stdout, {
                code: "x1"
            })
            console.log(stderr)
        })

        if (args[0] == "js") {
            try {
                message.channel.send("**Code Executed!** Output will be sent to your DMs.")
                message.author.send(`JS execution output from command \`${code}\`:`)
                message.author.send(eval(code), {
                    code: "x1"
                })
            } catch (err) {
                message.channel.send("**Error!** The error message has been DM'd to you.")
                message.author.send(err, {
                    code: "x1"
                })
            }
        }
    },
};