import { Command } from "../enums/commands"

export interface IMessage{
    command: Command
    params: any
}