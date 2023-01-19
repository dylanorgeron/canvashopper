export enum Commands {
    //Client
    RequestLogin = 'RequestLogin',  //Sent with username to initiate login handshake
    Keystroke = 'Keystroke', //Sent on keystroke to initiate action
    //Sever
    CompleteLogin = 'CompleteLogin', //Responds with username to complete login handshake
    Update = 'Update' //General status update of level and player positions
}