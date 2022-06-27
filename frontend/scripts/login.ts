import { WebSocketHandler } from "./websocket-handler"

const styles = require('../styles/login.css')
export default class Login{
    public loginForm: HTMLFormElement
    public inputEl: HTMLInputElement
    public loginBtn: HTMLButtonElement
    public app = document.getElementById('app') as HTMLElement

    constructor(ws: WebSocketHandler){
        this.app.innerHTML = `
            <form id="login">
                <label>Who are you?</label>
                <input id="login-input" value="Amani" />
                <button id="login-btn">Login</button>
            </form>
        `
        this.loginForm = document.getElementById('login') as HTMLFormElement
        this.inputEl = document.getElementById('login-input') as HTMLInputElement
        this.loginBtn = document.getElementById('login-btn') as HTMLButtonElement
        
        if(!this.loginForm || !this.inputEl || !this.loginBtn){
            console.error("Failed to find login elements.")
            return
        }
        this.loginBtn.addEventListener('click', (evt) => this.submitForm(evt, ws))
        this.loginForm.addEventListener('submit', (evt) => this.submitForm(evt, ws))
    }

    public submitForm(evt: MouseEvent | SubmitEvent, ws: WebSocketHandler): void{
        evt.preventDefault()
        const username = this.inputEl.value
        ws.login(username)
    }
}