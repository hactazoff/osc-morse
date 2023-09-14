const { Client, Server } = require('node-osc');

const client = new Client('127.0.0.1', 9000);
const SPECIAL_CHARS = {
    MessageRestarted: '\r',
    MessageFinished: '\n',
    RepeatLastChar: '\t',
}
const CONSTANTS = {
    MIN: 0,
    MAX: 100,
    DELAY: 250,
    LIST: 6,
    CHARS: [
        undefined,
        ...Object.values(SPECIAL_CHARS),
        ...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(''),
        ...' .,?\'!/()&:;=+-_\"$@[]{}'.split(''),
    ]
};

var server = new Server(9001, '0.0.0.0');

server.on('listening', async () => {
    console.log('OSC Server is listening.');
    console.dir(serialised('Hello World!'));
    // await send('du:FQUZNnVRlCZW');
    //await send('y:dQw4w9WgXcQ');
    //await send('p:ooo');
    // await send('tw:aypierre');
    // await send('u:vzQgS');
})
var timeout = null;
var list = '0'.repeat(CONSTANTS.LIST).split('').map((v) => false);
server.on('message', (msg) => {
    if (msg[0].startsWith('/avatar/parameters/Hact/Morse/')) {
        index = parseInt(msg[0].split('/').slice(-1)[0]);
        if (index >= 0 && index <= CONSTANTS.LIST) {
            list[index] = msg[1] == true;
            if (!timeout) timeout = setTimeout(() => {
                timeout = null;
                const number = Number('0b' + list.map(e => Number(e)).sort(e => -1).join('')) + 1;
                console.log('IN ', JSON.stringify(CONSTANTS.CHARS[number]), number);
                if (CONSTANTS.CHARS[number])
                    receive(number, CONSTANTS.CHARS[number])
            }, 10);
        }

    }
});

function format(message) {
    var trusted = false;
    if (message.startsWith('p:')) {
        trusted = true;
        message = `https://pastebin.com/raw/${message.slice(2)}`;
    } else if (message.startsWith('y:')) {
        trusted = true;
        message = `https://youtu.be/${message.slice(2)}`;
    } else if (message.startsWith('t:')) {
        trusted = true;
        message = `https://twitter.com/${message.slice(2)}`;
    } else if (message.startsWith('dg:')) {
        trusted = true;
        message = `https://discord.gg/${message.slice(3)}`;
    } else if (message.startsWith('du:')) {
        trusted = true;
        message = `https://discord.com/users/${Buffer.from(message.slice(3), 'base64').toString('hex')}`;
    } else if (message.startsWith('tw:')) {
        trusted = true;
        message = `https://twitch.tv/${message.slice(3)}`;
    } else if (message.startsWith('u:')) {
        trusted = true;
        message = `https://urlr.me/${message.slice(2)}`;
    }else if (message.startsWith('h:')) {
        trusted = true;
        message = `https://url.hactazia.fr/${message.slice(2)}`;
    }
    try {
        var url = new URL(message);
        url.hash = "";
        url.search = "";
        if (trusted)
            require('child_process').exec(`start ${url.href}`);
        console.log(url.href);
    } catch {
        console.log(message);
    }
}

var message = '';
function receive(number, char) {
    switch (char) {
        case SPECIAL_CHARS.MessageFinished:
            console.log('Message finished', `« ${message} »`);
            format(message);
            break;
        case SPECIAL_CHARS.MessageRestarted:
            message = '';
            console.log('Message restarted');
            break;
        case SPECIAL_CHARS.RepeatLastChar:
            message += message[message.length - 1];
            break;
        default:
            message += char;
    }
}

function serialised(msg) {
    var s = '';
    for (const char of (SPECIAL_CHARS.MessageRestarted + msg + SPECIAL_CHARS.MessageFinished)) {
        if (s[s.length - 1] === char) {
            s += SPECIAL_CHARS.RepeatLastChar;
        } else s += char;
    }
    return s;
}

async function send(msg) {
    for (const char of serialised(msg)) {
        if (CONSTANTS.CHARS.indexOf(char) !== -1) {
            console.log('OUT', JSON.stringify(char), CONSTANTS.CHARS.indexOf(char));
            const success = await new Promise((resolve) => {
                client.send('/avatar/parameters/Hact/Morse', { value: CONSTANTS.CHARS.indexOf(char) / CONSTANTS.MAX, type: 'FLOAT' }, (err) => {
                    if (err) console.error(err);
                    resolve(!err);
                });
            });
            if (!success) return false;
            await new Promise((resolve) => setTimeout(resolve, CONSTANTS.DELAY));
        }
    }
    return true;
}