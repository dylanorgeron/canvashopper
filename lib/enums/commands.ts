export enum Command {
    //Client
    SendLogin = 'SendLogin',  //Sent with username to initiate login handshake
    SendKeystroke = 'SendKeystroke', //Sent on keystroke to initiate action
    //Sever
    ReceiveLoginConfirmation = 'ReceiveLoginConfirmation', //Responds with username to complete login handshake
    ReceiveUpdate = 'ReceiveUpdate' //General status update of level and player positions
}