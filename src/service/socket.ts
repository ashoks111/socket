import { MessageEvent, EventMessageFrameType, SocketOberver, SocketReadyState, SocketState, MessageFrameType, SocketType, UserMessage, RaiseHandMessage } from "./socketType";

export function Socket(url: string, protocol?: string, pingInterval: number = 1000): SocketType {
    let ws :  WebSocket;
    let socketObserver: SocketOberver;
    let eventId: string;
    const connect = (token: string, event: string, observers: SocketOberver) => {
        socketObserver = observers;
        eventId = event;
        ws =new WebSocket(url+ '?Auth='+token+'&eventId='+eventId);
        ws.onerror = (error) => {
            console.log("Websoket connection error", error);
            ws.close()
            observers.onSocketState(SocketState.Error);
        }
        ws.onclose = () => {
            observers.onSocketState(SocketState.Disconnected);
            if(socketState() !== SocketReadyState.Closed || socketState() !== SocketReadyState.None) {
                ws.close();
            }
            
            // if(pingTimer) {
            //     clearInterval(pingTimer);
            //     pingTimer = null;
            // }
            // if(retry) {
            //  //   connect(options);
            // }
        }
        ws.onopen = () => {
            console.log("Socket Opened");
            observers.onSocketState(SocketState.Connected);
           // sendPingPong(pingInterval);
        }
        ws.onmessage = (event) => {
            console.log("Message recived", event.data);
            const message = JSON.parse(event.data);
            handleMessage(message);

        }
    }

    const disconnect = () => {
        if(socketState() !== SocketReadyState.Closed || socketState() !== SocketReadyState.None)
            ws.close();
    }

    const sendMessage = (msg: MessageFrameType) => {
        if(socketState() !== SocketReadyState.Closed || socketState() !== SocketReadyState.None) {
            ws.send(JSON.stringify(msg));
        }
    }

    const handleMessage = (message: EventMessageFrameType) => {
        switch(message.event) {
            case MessageEvent.USER_CONNECTED: 
                socketObserver.onUserJoined(message.payload);
                return;
            case MessageEvent.USER_DISCONNECTED:
                socketObserver.onUserLeave(message.payload);
                return;
            case MessageEvent.RAISE_HAND: 
                socketObserver.onRaiseHand(message.payload);
                return;
            case MessageEvent.LOUNGE_INVITE:
                socketObserver.onLoungeInvite(message.payload);
                return;
            default:
                return;
        }
    }

    const raiseHandRequest = () => {
        const raiseHandReq : MessageFrameType = {
            action: 'raiseHand',
            eventId
        };
        sendMessage(raiseHandReq);
    }

    const addUsersToLounge = (userId: string) => {
        const addUser : MessageFrameType = {
            action: 'addUserToLounge',
            eventId,
            userId
        }
        sendMessage(addUser);
    }

    const socketState = () : SocketReadyState => {
        if(!ws) 
            return SocketReadyState.None
            switch(ws.readyState) {
                case WebSocket.CONNECTING:
                    return SocketReadyState.Connecting;
                case WebSocket.OPEN:
                    return SocketReadyState.Open;
                case WebSocket.CLOSING:
                    return SocketReadyState.Closing;
                case WebSocket.CLOSED:
                    return SocketReadyState.Closed;
                default:
                    return SocketReadyState.Closed;
            }
    }
    return {
        connect,
        disconnect,
        raiseHandRequest,
        addUsersToLounge
    }
}


 



