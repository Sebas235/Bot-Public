const Discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require("discord.js");
const Enmap = require('enmap');

module.exports = {
  name: "setmembercount",
  category: "Moderation",
  description: "Set channel membercount",
  usage: "+setmembercount <total> or <humans> or <bots> and <channel ID>",
  run: async (client, message, args) => {
    
    if(!args.length || !["total", "humans", "bots"].includes(args[0])) return message.reply(`Please select what method do you want to use!\nMethods: \`total\`, \`humans\`, \`bots\`\nAnd say the channel ID.`);
        if(args[0] == "total"){
            let channel = message.guild.channels.cache.get(args[1]);
            if(!channel) return message.reply(`The Channel you specified doesn't exist in this Server!\nRemember that you must the channel ID.`);
            client.setups.set(message.guild.id, channel.id, "total");
            return message.reply(`✅ Succesfully set the **Total** Member Count to <#${channel.id}>\nPlease wait **5 minutes**`)
        }

        if(args[0] == "humans"){
            let channel = message.guild.channels.cache.get(args[1]);
            if(!channel) return message.reply(`The Channel you specified doesn't exist in this Server!\nRemember that you must the channel ID.`);
            client.setups.set(message.guild.id, channel.id, "humans");
            return message.reply(`✅ Succesfully set the **Humans** Member Count to <#${channel.id}>\nPlease wait **5 minutes**`)
        }

        if(args[0] == "bots"){
            let channel = message.guild.channels.cache.get(args[1]);
            if(!channel) return message.reply(`The Channel you specified doesn't exist in this Server!\nRemember that you must the channel ID.`);
            client.setups.set(message.guild.id, channel.id, "bots");
            return message.reply(`✅ Succesfully set the **Bots** Member Count to <#${channel.id}>\nPlease wait **5 minutes**`)
        }
}};