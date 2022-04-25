
import { useRef, useState } from 'react';
import './App.css';
import Auth from './Auth';
import { Socket } from './service/socket';
import { LoungeInviteMessage, RaiseHandMessage, SocketState, SocketType, UserMessage } from './service/socketType';
import SocketWidget from './SocketWidget';

function App() {
  const [connected, setConnected] = useState(SocketState.None);
  const [userList, setUserList] = useState<any []>([]);
  const usersRef = useRef<any[]>([]);
  const [socket, setSocket] = useState<SocketType>()

  const observers = {
    onSocketState : (state: SocketState) => {
      setConnected(state);
    },
    onUserJoined: (message: any) => {
      message.raiseHand = false;
      const users = [...userList, message];
      usersRef.current = users;
      setUserList(users);
    },
    onUserLeave: (message: UserMessage) => {
      usersRef.current = userList.filter(user => user.userId !== message.userId);
      setUserList(userList.filter(user => user.userId !== message.userId));
    },
    onRaiseHand: (message: RaiseHandMessage) => {
      console.log("Raise hand message", message);
      const users = [...usersRef.current];
      console.log("users", users);
      users[users.findIndex(user => user.userId === message.userId)].raiseHand = true;
      setUserList(users);
    },
    onLoungeInvite: (message: LoungeInviteMessage) => {
      alert(message.message + ' :- to  :-' + message.roomData.name)
    }
  }


  const connectSocket = (token: string, eventId: string) => {
    const ws = Socket('wss://3utib47a1d.execute-api.eu-west-1.amazonaws.com/dev');
    ws.connect(token, eventId, observers);
    setSocket(ws);
  }
  return (
    <div className="App">
      <div className="outer">
        {connected !== SocketState.Connected ? (
          <Auth connectSocket={connectSocket} />
        ) : (
          <SocketWidget userList={usersRef.current} socket={socket} />
        )}
        
      </div>
    </div>
  );
}

export default App;
