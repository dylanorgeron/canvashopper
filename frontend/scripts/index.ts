
import GameInstance from "./game-instance";
import { WebSocketFactory } from "./websocket-handler"
import Login from "./login";

async function main(){
	//open connection on load
	const ws = await WebSocketFactory.start()
	//init login
	// const login = new Login(ws)
	const gameInstance = new GameInstance(ws)
	gameInstance.start('{}')
}

window.onload = async function(){
	await main()
}
