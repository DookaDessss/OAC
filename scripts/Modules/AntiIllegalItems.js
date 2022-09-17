import { config } from "../globalVars"
import { banPlayer, messagePlayer, runCommand } from "../utils"

const { items } = config.modules.antiIllegalItems

export async function AntiIllegalItems(player, item) {
    if (item.getLore().find(lore => lore.includes("Horion"))) return banPlayer(player, `Using an illegal item`)
    if (items.includes(item.id) || item.id.endsWith("spawn_egg")) {
        if (runCommand(`clear @s ${item.id}`, player).error) {
            player.runCommand(`clear @s`)
            banPlayer(player, `Having a ${item.id.split(':')[1].replace(/_/g, ' ')}`)
        } else {
            messagePlayer(player, `§7[§9OAC§7] §cYou are not allowed to have that item!`)
            player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        }
    }
}