
import { WebSocketFactory } from "./websocket-handler"
import Login from "./login";

async function main(){
	//open connection on load
	const ws = await WebSocketFactory.start()
	//init login
	const login = new Login(ws)
}

window.onload = async function(){
	await main()
}
