import { BlockLocation } from "mojang-minecraft"
import { posLog } from "../index.js"
import { notFullBlocks, notFullBlocksIncludes } from "../globalVars"
import { messagePlayer } from "../utils"

export async function AntiNoClip(player) {
    const log = player.getLog()
    const { location, dimension } = player
    const pos = posLog.get(player)
    const block1 = dimension.getBlock(new BlockLocation(Math.floor(location.x), Math.floor(location.y), Math.floor(location.z))).id
    const block2 = dimension.getBlock(new BlockLocation(Math.floor(location.x), Math.floor(location.y) + 1, Math.floor(location.z))).id
    if ((!notFullBlocks.includes(block1) && !notFullBlocks.includes(block2)) && !notFullBlocksIncludes.find(e => block1.includes(e) && block2.includes(e))) {
        player.runCommand(`tp @s ${pos.x} ${pos.y} ${pos.z}`)
        messagePlayer(player, "§7[§9OAC§7] §cNo clipping isn't allowed!")
        player.runCommand(`playsound random.glass @s ~~~ 1 0.5`)
        log.set("wasHit", 3)
    }
}