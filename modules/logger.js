function timeSlice(input) {
    return ("00" + input).slice(-2)
}
module.exports = {
    log(message, level) {
        var timestamp = new Date()
              timestamp = `${timeSlice(timestamp.getHours())}:${timeSlice(timestamp.getMinutes())}:${timeSlice(timestamp.getSeconds())}`
        const logFormat = `\x1b[36m${timestamp}\x1b[0m |`
        if(!level) level = "LOG"
        switch (level) {
            case 'LOG':
                console.log(logFormat, message)
                break;
            case 'WARN':
                console.log(logFormat, "\x1b[1m\x1b[33m" + message + "\x1b[0m")
                break;
            case 'ERROR':
                console.log(logFormat, "\x1b[31m" + message + "\x1b[0m")
                break;
        }
    }
}