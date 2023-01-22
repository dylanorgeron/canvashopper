
import { WebSocketFactory } from "./websocket-handler"
import { handleLogin }  from "./login";
import GameInstance from "./game-instance";
import { IReceiveLogin } from "../../lib/interfaces/commands/receive-login";

window.onload = async function(){
	await init()
}

async function init(){
	//open connection to server
	//this connection will persist throughout the lifecycle of the page
	const webSocketHandler = await WebSocketFactory.start()
	//show login form
	//resolves once login has been accepted by server
	const loginResponse: IReceiveLogin = await handleLogin(webSocketHandler)
	//launch game
	//creates canvas, inits keybinds, starts draw loop
	//todo, remove initial state
	const gameInstance = new GameInstance(webSocketHandler, loginResponse)
}
