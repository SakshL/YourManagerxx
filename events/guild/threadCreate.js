//The Module
module.exports = async (client, thread) => {
    try{
        if(thread.joinable && !thread.joined){
            await thread.join();
        }
    }catch (e){
        console.log(String(e).grey)
    }
}
/**
 * @INFO
 * Bot Coded by NotSaksh#6969 | https://discord.gg/notsaksh
 * @INFO
 * Work for Nexus Development | https://milrato.eu
 * @INFO
 * Please mention him / Nexus Development, when using this Code!
 * @INFO
 */
