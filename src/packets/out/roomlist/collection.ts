import { OutPacketBase } from 'packets/out/packet'

import { RoomListItem } from 'packets/out/roomlist/item'

import { Room } from 'room/room'

/**
 * sends out channel's rooms to an user
 */
export class RoomListCollection {
    private rooms: Room[]

    constructor(rooms: Room[]) {
        this.rooms = rooms
    }
    public async build(outPacket: OutPacketBase): Promise<void> {
        outPacket.writeUInt16(this.rooms.length)

        for (const room of this.rooms) {
            await new RoomListItem(room).build(outPacket)
        }
    }
}
