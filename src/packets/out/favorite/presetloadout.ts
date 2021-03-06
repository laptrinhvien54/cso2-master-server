import { OutPacketBase } from 'packets/out/packet'

import { UserLoadout } from 'user/userloadout'

/**
 * @class OutFavoriteSomeLoadout
 */
export class OutFavoritePresetLoadout {
    public static build(loadouts: UserLoadout[], outPacket: OutPacketBase): void {
        outPacket.writeUInt8(loadouts.length * 16) // the ammount of items being sent

        for (const loadout of loadouts) {
            this.writeLoadout(outPacket, loadout)
        }
    }

    private static writeItem(outPacket: OutPacketBase, item: number,
                             curIndex: number, loadoutNum: number): void {

        outPacket.writeUInt8(loadoutNum)
        outPacket.writeUInt8(curIndex)
        outPacket.writeUInt32(item)
    }

    private static writeLoadout(outPacket: OutPacketBase,
                                loadout: UserLoadout): void {
        let curItem = 0

        this.writeItem(outPacket, loadout.primary, curItem++, loadout.loadoutNum)
        this.writeItem(outPacket, loadout.secondary, curItem++, loadout.loadoutNum)
        this.writeItem(outPacket, loadout.melee, curItem++, loadout.loadoutNum)
        this.writeItem(outPacket, loadout.hegrenade, curItem++, loadout.loadoutNum)
        this.writeItem(outPacket, loadout.smoke, curItem++, loadout.loadoutNum)
        this.writeItem(outPacket, loadout.flash, curItem++, loadout.loadoutNum)

        // fill the remaining unused spaces with null items
        for (; curItem < 16; curItem++) {
            outPacket.writeUInt8(loadout.loadoutNum)
            outPacket.writeUInt8(curItem)
            outPacket.writeUInt32(0)
        }
    }
}
