import { WebSocketHandler } from "./websocket-handler"
import { Command } from "../../lib/enums/commands"
import { IState } from "../../lib/interfaces/state"
import { IReceiveLogin } from "../../lib/interfaces/commands/receive-login"
import { ISendLogin } from "../../lib/interfaces/commands/send-login"

const styles = require('../styles/login.css')

export async function handleLogin(wsHandler: WebSocketHandler): Promise<IReceiveLogin> {
    return new Promise((async (resolve, reject) => {
        //saftey checking, -should- never happen
        if (!wsHandler.ws) {
            reject('Could not find ws on wsHandler')
            return
        }
        //listen for complete login command, then resolve with intial state
        wsHandler.on(Command.ReceiveLoginConfirmation, (completeLoginData: IReceiveLogin) => {
            resolve(completeLoginData)
        })

        //render login form
        const app = document.getElementById('app') as HTMLElement
        app.innerHTML = `
            <form id="login">
                <label>Who are you?</label>
                <input id="login-input" value="Amani" />
                <button id="login-btn">Login</button>
            </form>
        `
        //event handlers
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
            const params : ISendLogin= {
                Username: inputEl.value
            }
            wsHandler.send(Command.SendLogin, params)
        }
        //end event handlers
    }))
}