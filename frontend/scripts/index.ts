
import { WebSocketFactory } from "./websocket-handler"
import { handleLogin }  from "./login";

//wait for page to render, then init
window.onload = async function(){
	await init()
}
async function init(){
	//open connection on load
	const webSocketHandler = await WebSocketFactory.start()
	//init login
	await handleLogin(webSocketHandler)
}


