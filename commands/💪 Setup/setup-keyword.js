var {
  MessageEmbed
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var ee = require(`${process.cwd()}/botconfig/embed.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var {
  databasing,
  edit_msg,
  send_roster
} = require(`${process.cwd()}/handlers/functions`);
const { MessageButton, MessageActionRow, MessageSelectMenu } = require('discord.js')
module.exports = {
  name: "setup-keyword",
  category: "💪 Setup",
  aliases: ["setupkeyword", "keyword-setup", "setup-keyword"],
  cooldown: 5,
  usage: "setup-keyword  --> Follow the Steps",
  description: "Define Key Word messages, so that if someone sends a Message containing that Keyword, the Bot will responde with your defined MESSAGE",
  memberpermissions: ["ADMINISTRATOR"],
  type: "system",
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    try {
      var originalowner = message.author.id;
      let timeouterror;
      let NumberEmojiIds = getNumberEmojis().map(emoji => emoji?.replace(">", "").split(":")[2])
      first_layer()
      async function first_layer(){
        let menuoptions = [{
            value: "Create Keyword",
            description: `Create a Keyword of your Choice`,
            emoji: "✅"
          },
          {
            value: "Delete Keyword",
            description: `Delete one of the Keyword(s)`,
            emoji: "❌"
          },
          {
            value: "Show Settings",
            description: `Show all Keywords!`,
            emoji: "📑"
          }
        ]
        //define the selection
        let Selection = new MessageSelectMenu()
          .setCustomId('MenuSelection') 
          .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
          .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
          .setPlaceholder('Click me to setup the Automated Embed System!') 
          .addOptions(
          menuoptions.map(option => {
            let Obj = {
              label: option.label ? option.label.substring(0, 50) : option.value.substring(0, 50),
              value: option.value.substring(0, 50),
              description: option.description.substring(0, 50),
            }
          if(option.emoji) Obj.emoji = option.emoji;
          return Obj;
         }))
        
        //define the embed
        let MenuEmbed = new Discord.MessageEmbed()
        .setColor(es.color)
        .setAuthor('Keyword Setup', 'https://images-ext-1.discordapp.net/external/HF-XNy3iUP4D95zv2fuTUy1csYWuNa5IZj2HSCSkvhs/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/flexed-biceps_1f4aa.png', 'https://discord.gg/notsaksh')
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-ticket"]["variable2"]))
        //send the menu msg
        let menumsg = await message.reply({embeds: [MenuEmbed], components: [new MessageActionRow().addComponents(Selection)]})

        //Create the collector
        const collector = menumsg.createMessageComponentCollector({ 
          filter: i => i?.isSelectMenu() && i?.message.author.id == client.user.id && i?.user,
          time: 90000
        })
        //Menu Collections
        collector.on('collect', menu => {
          if (menu?.user.id === cmduser.id) {
            collector.stop();
            let menuoptiondata = menuoptions.find(v=>v.value == menu?.values[0])
            if(menu?.values[0] == "Cancel") return menu?.reply(eval(client.la[ls]["cmds"]["setup"]["setup-ticket"]["variable3"]))
            menu?.deferUpdate();
            used1 = true;
            handle_the_picks(menu?.values[0], menuoptiondata)
          }
          else menu?.reply({content: `<:no:933239221836206131> You are not allowed to do that! Only: <@${cmduser.id}>`, ephemeral: true});
        });
        //Once the Collections ended edit the menu message
        collector.on('end', collected => {
          menumsg.edit({embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)], components: [], content: `${collected && collected.first() && collected.first().values ? `<a:yes:933239140718358558> **Selected: \`${collected ? collected.first().values[0] : "Nothing"}\`**` : "❌ **NOTHING SELECTED - CANCELLED**" }`})
        });
      }
      async function handle_the_picks(optionhandletype, menuoptiondata) {
        switch (optionhandletype){ // return message.reply
          case "Create Keyword": {
            if (client.keyword.get(message.guild.id, "commands").length > 24)
          return message.reply({embeds: [new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable5"]))
            .setColor(es.wrongcolor)
            .setDescription(`You cannot have more then **24** Key Words`.substring(0, 2000))
            .setFooter(client.getFooter(es))
          ]});
        var tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable6"]))
          .setColor(es.color)
          .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable7"]))
          .setFooter(client.getFooter(es))]
        })
        await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
            max: 1,
            time: 120000,
            errors: ["time"]
          })
          .then(async collected => {
            var msg = collected.first().content.split(" ")[0];
            if (msg) {
              var thekeyword = {
                name: msg,
                output: "ye",
                embeds: false,
                channels: [],
                aliases: []
              }
              tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable8"]))
                .setColor(es.color)
                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable9"]))
                .setFooter(client.getFooter(es))
              ]})
              await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
                  max: 1,
                  time: 120000,
                  errors: ["time"]
                })
                .then(async collected => {
                  var msg = collected.first().content;
                  if (msg) {
                    thekeyword.output = msg;
                    tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable10"]))
                      .setColor(es.color)
                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable11"]))
                      .setFooter(client.getFooter(es))
                    ]})
                    await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
                        max: 1,
                        time: 120000,
                        errors: ["time"]
                      })
                      .then(async collected => {
                        var channel = collected.first().mentions.channels.filter(ch=>ch.guild.id==message.guild.id).first();
                        if (channel) {
                          for (const ch of collected.first().mentions.channels.map(this_Code_is_by_Tomato_6966 => this_Code_is_by_Tomato_6966)) {
                            
                            thekeyword.channels.push(ch.id)
                          }
                          tempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable12"]))
                            .setColor(es.color)
                            .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable13"]))
                            .setFooter(client.getFooter(es))
                          ]})
                          await tempmsg.channel.awaitMessages({filter: m => m.author.id === message.author.id,
                              max: 1,
                              time: 120000,
                              errors: ["time"]
                            })
                            .then(async collected => {
                              if (collected.first().content.toLowerCase() == "noalias") {

                              } else {
                                var args = collected.first().content.split(" ")
                                if (args) {
                                  for (const m of args) {
                                    thekeyword.aliases.push(m.toLowerCase())
                                  }
                                } else {
                                  timeouterror = {
                                    message: "YOU DID NOT SEND ANY ALIAS"
                                  }
                                }
                              }
                              var ttempmsg = await message.reply({embeds: [new Discord.MessageEmbed()
                                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable14"]))
                                .setColor(es.color)
                                .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable15"]))
                                .setFooter(client.getFooter(es))
                              ]})
                              try {
                                ttempmsg.react("✅")
                                ttempmsg.react("❌")
                              } catch {

                              }
                              await ttempmsg.awaitReactions({filter: (reaction, user) => user == originalowner, 
                                  max: 1,
                                  time: 90000,
                                  errors: ["time"]
                                })
                                .then(collected => {
                                  var reaction = collected.first();
                                  if (reaction) {
                                    if (reaction.emoji?.name == "✅") {
                                      thekeyword.embed = true;
                                    } else {
                                      thekeyword.embed = false;
                                    }

                                    client.keyword.push(message.guild.id, thekeyword, "commands")

                                    message.reply({embeds: [new Discord.MessageEmbed()
                                      .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable16"]))
                                      .setColor(es.color)
                                      .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable17"]))
                                      .setFooter(client.getFooter(es))
                                    ]})

                                    if (reaction.emoji?.name == "✅") {
                                      message.reply({embeds: [new Discord.MessageEmbed()
                                        .setColor(es.color)
                                        .setDescription(thekeyword.output.replace("{member}", `<@${message.author.id}>`))
                                        .setFooter(client.getFooter(es))
                                      ]})
                                    } else {
                                      message.reply(thekeyword.output.replace("{member}", `<@${message.author.id}>`))
                                    }


                                  } else {
                                    return message.reply( "you didn't ping a valid Channel")
                                  }
                                })
                                .catch(e => {
                                  console.log(e.stack ? String(e.stack).grey : String(e).grey)
                                  return message.reply({embeds: [new Discord.MessageEmbed()
                                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable18"]))
                                    .setColor(es.wrongcolor)
                                    .setDescription(`Cancelled the Operation!`.substring(0, 2000))
                                    .setFooter(client.getFooter(es))
                                  ]});
                                })

                            })
                            .catch(e => {
                              console.log(e.stack ? String(e.stack).grey : String(e).grey)
                              return message.reply({embeds: [new Discord.MessageEmbed()
                                .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable19"]))
                                .setColor(es.wrongcolor)
                                .setDescription(`Cancelled the Operation!`.substring(0, 2000))
                                .setFooter(client.getFooter(es))
                              ]});
                            })
                        } else {
                          return message.reply({embeds: [new Discord.MessageEmbed()
                            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable20"]))
                            .setColor(es.wrongcolor)
                            .setDescription(`Cancelled the Operation!`.substring(0, 2000))
                            .setFooter(client.getFooter(es))
                          ]});
                        }
                      })
                      .catch(e => {
                        console.log(e.stack ? String(e.stack).grey : String(e).grey)
                        return message.reply({embeds: [new Discord.MessageEmbed()
                          .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable20"]))
                          .setColor(es.wrongcolor)
                          .setDescription(`Cancelled the Operation!`.substring(0, 2000))
                          .setFooter(client.getFooter(es))
                        ]});
                      })


                  } else {
                    return message.reply("you didn't ping a valid Channel")
                  }
                })
                .catch(e => {
                  console.log(e.stack ? String(e.stack).grey : String(e).grey)
                  return message.reply({embeds: [new Discord.MessageEmbed()
                    .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable21"]))
                    .setColor(es.wrongcolor)
                    .setDescription(`Cancelled the Operation!`.substring(0, 2000))
                    .setFooter(client.getFooter(es))
                  ]});
                })


            } else {
              return message.reply( "you didn't ping a valid Channel")
            }
          })
          .catch(e => {
            timeouterror = e;
          })
        if (timeouterror)
          return message.reply({embeds: [new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable22"]))
            .setColor(es.wrongcolor)
            .setDescription(`Cancelled the Operation!`.substring(0, 2000))
            .setFooter(client.getFooter(es))
          ]});

          }break;
          case "Delete Keyword": {
            let cuc = client.keyword.get(message.guild.id, "commands");
            if(!cuc || cuc.length < 1) return message.reply(":x: There are no Custom Commands")
            let menuoptions = [
            ]
            cuc.forEach((cc, index)=>{
              menuoptions.push({
                value: `${cc.name}`.substring(0, 25),
                description: `Delete ${cc.name} ${cc.embed ? "[✅ Embed]" : "[❌ Embed]"}`.substring(0, 50),
                emoji: NumberEmojiIds[index + 1]
              })
            })
            //define the selection
            let Selection = new MessageSelectMenu()
              .setCustomId('MenuSelection') 
              .setMaxValues(cuc.length) //OPTIONAL, this is how many values you can have at each selection
              .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
              .setPlaceholder('Select all Custom Commands which should get deleted') 
              .addOptions(
              menuoptions.map(option => {
                let Obj = {
                  label: option.label ? option.label.substring(0, 50) : option.value.substring(0, 50),
                  value: option.value.substring(0, 50),
                  description: option.description.substring(0, 50),
                }
              if(option.emoji) Obj.emoji = option.emoji;
              return Obj;
             }))
            
            //define the embed
            let MenuEmbed = new Discord.MessageEmbed()
            .setColor(es.color)
            .setAuthor('Custom Command Setup', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/298/flexed-biceps_1f4aa.png', 'https://discord.gg/notsaksh')
            .setDescription(`**Select all \`Custom Commands\` which should get __deleted__**`)
            //send the menu msg
            let menumsg = await message.reply({embeds: [MenuEmbed], components: [new MessageActionRow().addComponents(Selection)]})
            //Create the collector
            const collector = menumsg.createMessageComponentCollector({ 
              filter: i => i?.isSelectMenu() && i?.message.author.id == client.user.id && i?.user,
              time: 90000
            })
            //Menu Collections
            collector.on('collect', menu => {
              if (menu?.user.id === cmduser.id) {
                collector.stop();
                for(const value of menu?.values){
                  client.keyword.remove(message.guild.id, d => String(d.name).substring(0, 25).toLowerCase() == String(value).toLowerCase(), "commands")
                }
                return message.reply({embeds: [new Discord.MessageEmbed()
                  .setTitle(`Deleted ${menu?.values.length} Keywords!`)
                  .setDescription(`There are now \`${cuc.length - menu?.values.length} Keywords\` left!`)
                  .setColor(es.color)
                  .setFooter(client.getFooter(es))
                ]});
              }
              else menu?.reply({content: `<:no:933239221836206131> You are not allowed to do that! Only: <@${cmduser.id}>`, ephemeral: true});
            });
            //Once the Collections ended edit the menu message
            collector.on('end', collected => {
              menumsg.edit({embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)], components: [], content: `${collected && collected.first() && collected.first().values ? `<a:yes:933239140718358558> **Selected: \`${collected.first().values.length} Commands\`**` : "❌ **NOTHING SELECTED - CANCELLED**" }`})
            });
          }break;
          case "Show Settings": {
            let cuc = client.keyword.get(message.guild.id, "commands");
            var embed = new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable22"]))
            .setColor(es.color)
            .setFooter(ee.footertext, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
            var embed2 = new Discord.MessageEmbed()
            .setTitle(eval(client.la[ls]["cmds"]["setup"]["setup-customcommand"]["variable22"]))
            .setColor(es.color)
            .setFooter(ee.footertext, es.footericon && (es.footericon.includes("http://") || es.footericon.includes("https://")) ? es.footericon : client.user.displayAvatarURL())
            var sendembed2 = false;
            for(let i = 0; i < cuc.length; i++){
              try{
                var string = `${cuc[i].output}`;
                if(string.length > 250) string = string.substring(0, 250) + " ..."
                if(i > 13){
                  sendembed2 = true;
                  embed2.addField(`<:arrow:934482036377419866> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
                } else 
                embed.addField(`<:arrow:934482036377419866> \`${cuc[i].name}\` | ${cuc[i].embed ? "✅ Embed" : "❌ Embed"}`, ">>> "+ string)
              }catch (e){
                console.log(e.stack ? String(e.stack).grey : String(e).grey)
              }
            }
            if(sendembed2)
              await message.reply({embeds: [embed, embed2]})
            else
              await message.reply({embeds: [embed]})
          }break;
        }
      }

    } catch (e) {
      console.log(String(e.stack).grey.bgRed)
      return message.reply({embeds: [new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(client.getFooter(es))
        .setTitle(client.la[ls].common.erroroccur)
        .setDescription(eval(client.la[ls]["cmds"]["setup"]["setup-keyword"]["variable30"]))
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