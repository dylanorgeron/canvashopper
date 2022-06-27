import RoomSize from "./room-size"

class RoomPrefabConfig{
    constructor(
        public size: RoomSize,
        public w: number,
        public h: number
    ){}
}

export const roomPrefabs: RoomPrefabConfig[] = [
    new RoomPrefabConfig(RoomSize.large, 7, 7),
    new RoomPrefabConfig(RoomSize.medium, 5, 5),
    new RoomPrefabConfig(RoomSize.small, 3, 3),
]

export default RoomPrefabConfig