const SocketWidget = (props: any) => {
    const {userList, socket} = props;

    const sendRaiseHandRequest = () => {
        socket.raiseHandRequest();
    }
    const addUserToLounge = (userId: string) => {
        socket.addUsersToLounge(userId);
    }

    const closeSocket = () => {
        socket.disconnect();
    }
    return (
        <div className="container">
            <div className="row pt-5 border-bottom border-dark ">
                <div className="d-flex flex-row bd-highlight mb-3 fullWidth ">
                    <div className="fullWidth textCenterAlign textWhite fs-2">Socket Connected</div>
                    <button onClick={closeSocket} className="btn btn-danger float-end">Disconnect</button>
                </div>
            </div>
            <div className="row pt-3">

                <div className="col ">
                    <h3 className="textWhite">Users</h3>
                    <ul className="list-group bgGrey">
                        {userList.map((user: any) => (
                            <li className="list-group-item bgGrey" key={user.userId}>{user.userId}
                            {user.raiseHand && (<span onClick={() =>addUserToLounge(user.userId)}>✋</span>)}</li>
                        ))}
                        
                        {userList.length === 0 && (
                            <li className="list-group-item bgGrey">No Users in online</li>
                        )}
                    </ul>

                </div>
                <div className="col">
                    <h3 className="textWhite">Actions</h3>
                    <div className="d-flex flex-row bd-highlight p-2 mb-3 fullWidth">
                        <button
                            onClick={sendRaiseHandRequest} 
                            className="btn btn-primary">Raise Hand</button>
                            

                    </div>
                </div>

            </div>

        </div>
    )
}
export default SocketWidget;