

export type SocketOberver = {
    onSocketState(state: string): void;
    onUserJoined(msg: UserMessage): void;
    onUserLeave(msg: UserMessage): void;
    onRaiseHand(message: RaiseHandMessage): void;
    onLoungeInvite(message: LoungeInviteMessage): void;
}

export type SocketType = {
    connect(token: string, event: string, observers: SocketOberver): void;
    disconnect(): void;
    raiseHandRequest(): void;
    addUsersToLounge(userId: string): void;
}

export enum SocketReadyState {
    None,
    Connecting,
    Open,
    Closing,
    Closed,
};
export enum SocketState {
    Connected = 'connected',
    Disconnected = 'disconnected',
    Error = 'error',
    None = 'none'
}

export enum MessageEvent {
    USER_CONNECTED = 'UserConnected',
    USER_DISCONNECTED = 'UserDisconnected',
    RAISE_HAND = 'RaiseHand',
    LOUNGE_INVITE = 'LoungeInvite'
}

export type EventMessageFrameType = {
    event: string;
    payload: UserMessage & RaiseHandMessage & LoungeInviteMessage
}

export interface MessageFrameType {
    action: string;
    eventId: string; 
    userId?: string;
};


export type RaiseHandMessage = {
    userId: string;
    eventId: string;
    message: string;
    userData?: any;
}
export type LoungeInviteMessage = {
    eventId: string;
    roomData: RoomDataType;
    message: string;
}

export type RoomDataType = {
    name: string;
    privacy: string;
    created_at: string;
    id: string;
    api_created: boolean;
    config: any;
    url: string
}

export type UserMessage = {
    userId: string;
    isHost?: boolean;
    connectionId: string;
    message: string;
    userData?: any;
}