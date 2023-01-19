import { PlayerState } from "../../lib/enums/player-state"

export default class PlayerMetadata {

    constructor(
        public id: string = '',
        public username: string = '',
        public state: PlayerState = PlayerState.SignedOut
    ) {

    }
}