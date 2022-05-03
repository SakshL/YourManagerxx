var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var {
  databasing
} = require(`${process.cwd()}/handlers/functions`);
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  name: "setup-commands",
  category: "💪 Setup",
  aliases: ["setupcommands", "setup-command", "setupcommand"],
  cooldown: 5,
  usage: "setup-commands  -->  Follow the Steps",
  description: "Enable/Disable specific Commands",
  memberpermissions: ["ADMINISTRATOR"],
  type: "info",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      function getMenuOptions() {
        return [
          {
            label: "ECONOMY",
            value: "ECONOMY",
            emoji: "💸",
            description: `${client.settings.get(message.guild.id, "ECONOMY") ? "❌ Disable ECONOMY Commands" : "✅ Enable ECONOMY Commands"}`
          },
          {
            label: "SCHOOL",
            value: "SCHOOL",
            emoji: "🏫",
            description: `${client.settings.get(message.guild.id, "SCHOOL") ? "❌ Disable SCHOOL Commands" : "✅ Enable SCHOOL Commands"}`
          },
          {
            label: "MUSIC",
            value: "MUSIC",
            emoji: "🎶",
            description: `${client.settings.get(message.guild.id, "MUSIC") ? "❌ Disable Music Commands" : "✅ Enable Music Commands"}`
          },
          {
            label: "FILTER",
            value: "FILTER",
            emoji: "👀",
            description: `${client.settings.get(message.guild.id, "FILTER") ? "❌ Disable FILTER Commands" : "✅ Enable FILTER Commands"}`
          },
          {
            label: "CUSTOMQUEUE",
            value: "CUSTOMQUEUE",
            emoji: "⚜️",
            description: `${client.settings.get(message.guild.id, "CUSTOMQUEUE") ? "❌ Disable CUSTOM-QUEUE Commands" : "✅ Enable CUSTOM-QUEUE Commands"}`
          },
          {
            label: "PROGRAMMING",
            value: "PROGRAMMING",
            emoji: "⌨️",
            description: `${client.settings.get(message.guild.id, "PROGRAMMING") ? "❌ Disable PROGRAMMING Commands" : "✅ Enable PROGRAMMING Commands"}`
          },
          {
            label: "RANKING",
            value: "RANKING",
            emoji: "📈",
            description: `${client.settings.get(message.guild.id, "RANKING") ? "❌ Disable RANKING Commands" : "✅ Enable RANKING Commands"}`
          },
          {
            label: "SOUNDBOARD",
            value: "SOUNDBOARD",
            emoji: "🔊",
            description: `${client.settings.get(message.guild.id, "SOUNDBOARD") ? "❌ Disable SOUNDBOARD Commands" : "✅ Enable SOUNDBOARD Commands"}`
          },
          {
            label: "VOICE",
            value: "VOICE",
            emoji: "🎤",
            description: `${client.settings.get(message.guild.id, "VOICE") ? "❌ Disable VOICE Commands" : "✅ Enable VOICE Commands"}`
          },
          {
            label: "FUN",
            value: "FUN",
            emoji: "🕹️",
            description: `${client.settings.get(message.guild.id, "FUN") ? "❌ Disable FUN Commands" : "✅ Enable FUN Commands"}`
          },
          {
            label: "MINIGAMES",
            value: "MINIGAMES",
            emoji: "🎮",
            description: `${client.settings.get(message.guild.id, "MINIGAMES") ? "❌ Disable MINIGAMES Commands" : "✅ Enable MINIGAMES Commands"}`
          },
          {
            label: "ANIME",
            value: "ANIME",
            emoji: "😳",
            description: `${client.settings.get(message.guild.id, "ANIME") ? "❌ Disable ANIME Commands" : "✅ Enable ANIME Commands"}`
          },
          {
            label: "NSFW",
            value: "NSFW",
            emoji: "🔞",
            description: `${client.settings.get(message.guild.id, "NSFW") ? "❌ Disable NSFW Commands" : "✅ Enable NSFW Commands"}`
          },
        ];
      }
      function getMenuRowComponent() { 
        let menuOptions = getMenuOptions();
        let menuSelection = new MessageSelectMenu()
          .setCustomId("MenuSelection")
          .setPlaceholder("Click: enable/disable Command-Categories")
          .setMinValues(1)
          .setMaxValues(menuOptions.length)
          .addOptions(menuOptions.filter(Boolean))
        return [new MessageActionRow().addComponents(menuSelection)]
      }


      let embed = new Discord.MessageEmbed()
        .setTitle(`Setup the allowed/not-allowed Command-Categories of this Server`)
        .setColor(es.color)
        .setDescription(`**In the selection down below all Categories are listed**\n\n**Select it to either disable/enable it!**\n\n**You can select all (*at least 1*) Command-Categories if you want to disable/enable all of them at once!**`)

       //Send message with buttons
      let msg = await message.reply({   
        embeds: [embed], 
        components: getMenuRowComponent()
      });
      const collector = msg.createMessageComponentCollector({filter: (i) => i?.isSelectMenu() && i?.user && i?.message.author.id == client.user.id, time: 180e3, max: 1 });
      collector.on("collect", async b => {
        if(b?.user.id !== message.author.id)
        return b?.reply({content: ":x: Only the one who typed the Command is allowed to select Things!", ephemeral: true});
     
        let enabled = 0, disabled = 0;
        for(const value of b?.values) {
          let oldstate = client.settings.get(message.guild.id, `${value.toUpperCase()}`);
          if(!oldstate) enabled++;
          else disabled++;
          client.settings.set(message.guild.id, !oldstate, `${value.toUpperCase()}`)
        }
        b?.reply(`<a:yes:933239140718358558> **\`Enabled ${enabled} Command-Categories\` and \`Disabled ${disabled} Command-Categories\` out of \`${b?.values.length} selected Command-Categories\`**`)
      })
      collector.on('end', collected => {
        msg.edit({content: ":x: Time ran out/Input finished! Cancelled", embeds: [
          msg.embeds[0]
            .setDescription(`${getMenuOptions().map(option => `> ${option.emoji} **${option.value}-Commands**: ${option.description.split(" ")[0] != "❌" ? `\`Are now disabled [❌]\`` : `\`Are now enabled [✅]\``}`).join("\n\n")}`)
        ], components: []}).catch((e)=>{})
      });
    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-commands"]["variable5"]))
      ]});
    }
  },
};
/**
 * @INFO
 * Bot Coded by NotSaksh#6969 | https://discord.gg/notsaksh
 * @INFO
 * Work for Nexus Development | https://milrato.eu
 * @INFO
 * Please mention him / Nexus Development, when using this Code!
 * @INFO
 */
function getNumberEmojis() {
  return [
    "<:Number_0:971128456534454302>",
    "<:Number_1:971128484497883137>",
    "<:Number_2:971128524633169950>",
    "<:Number_3:971128566366494750>",
    "<:Number_4:971128592681549884>",
    "<:Number_5:971128615590854716>",
    "<:Number_6:971128680996806686>",
    "<:Number_7:971128705982279720>",
    "<:Number_8:971128725833932880>",
    "<:Number_9:971128746209869825>",
    "<:Number_10:971128764073394196>",
    "<:Number_11:971128791810322483>",
    "<:Number_12:971128812727308339>",
    "<:Number_13:971128839495372830>",
    "<:Number_14:971128874048049172>",
    "<:Number_15:971128892742041702>",
    "<:Number_16:971128918138585209>",
    "<:Number_17:971128935180042282>",
    "<:Number_18:893173642307977258>",
    "<:Number_19:971128998656618506>",
    "<:Number_20:971129018529239082>",
    "<:Number_21:971129040868110427>",
    "<:Number_22:971129068902834266>",
    "<:Number_23:971129099617705985>",
    "<:Number_24:971129119448367124>",
    "<:Number_25:971129142613508146>"
  ]
}
