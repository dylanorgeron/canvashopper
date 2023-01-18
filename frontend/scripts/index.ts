
import { WebSocketFactory } from "./websocket-handler"
import { handleLogin }  from "./login";
import GameInstance from "./render/game-instance";

//wait for page to render, then init
window.onload = async function(){
	await init()
}
async function init(){
	//open connection on load
	const webSocketHandler = await WebSocketFactory.start()
	//login
	const initialState = await handleLogin(webSocketHandler)
	const gameInstance = new GameInstance(webSocketHandler, initialState)
}


