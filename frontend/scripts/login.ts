import Message from "../../lib/message"
import { WebSocketHandler } from "./websocket-handler"
import { Commands } from "../../lib/commands"

const styles = require('../styles/login.css')
export async function handleLogin(wsHandler: WebSocketHandler): Promise<void> {
    return new Promise((async (resolve, reject) => {
        if (!wsHandler.ws) reject('Could not find ws on wsHandler')
        else {
            wsHandler.ws.onmessage = (webSocketMessage) => {
                const message: Message = JSON.parse(webSocketMessage.data)
                const params = message.params as any
                if (message.command == Commands.CompleteLogin) {
                    const app = document.getElementById('app')
                    if (app) {
                        app.innerHTML = `<pre><code style='color: #fff'>${JSON.stringify(message, null, '  ').trim()}</code></pre>`
                    }
                } else {
                    reject('Websocket returned unknown command:' + message)
                }
            }
        }
        const app = document.getElementById('app') as HTMLElement
        app.innerHTML = `
            <form id="login">
                <label>Who are you?</label>
                <input id="login-input" value="Amani" />
                <button id="login-btn">Login</button>
            </form>
        `
        const loginForm = document.getElementById('login') as HTMLFormElement
        const inputEl = document.getElementById('login-input') as HTMLInputElement
        const loginBtn = document.getElementById('login-btn') as HTMLButtonElement

        if (!loginForm || !inputEl || !loginBtn) {
            console.error("Failed to find login elements.")
            reject()
        }
        loginBtn.addEventListener('click', (evt) => submitForm(evt, wsHandler))
        loginForm.addEventListener('submit', (evt) => submitForm(evt, wsHandler))

        const submitForm = (evt: MouseEvent | SubmitEvent, wsHandler: WebSocketHandler): void => {
            evt.preventDefault()
            const username = inputEl.value
            wsHandler.login(username)
        }

    }))
}