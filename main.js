const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '.'

client.once('ready', ()=> {
    console.log('penbot is online');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping'){
        message.channel.send('pong');
    } else if (command == 'ding'){
        message.channel.send('dong');
    } else if (command == 'nig'){
        message.channel.send('nog');
    }
});





client.login('ODE4OTgyMzI4OTU2MDkyNDg2.YEf-uw.dpBKxDKStCYA0kkqv84vg_CpnnM');