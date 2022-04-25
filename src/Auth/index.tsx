import { useState } from "react";

const Auth = (props: any) => {
    const {connectSocket} = props;
    const [token, setToken] = useState('');
    const [eventId, setEventId] = useState('6ccddb35-2b28-401f-87c7-3bd9472fba9a');

    const handleEventIdChange = (id: string) => {
        setEventId(id)
    }

    const handleTokenChange = (authToken: string) => {
        setToken(authToken);
    }
    const onConnectSocket = () => {
        connectSocket(token, eventId)
    }
    return (
        <div className="inner">
          <form>

            <h3>Connect</h3>

            <div className="form-group">
              <label htmlFor="token">Token</label>
              <textarea
                className="form-control"
                id="token"
                value={token}
                onChange={(event) => handleTokenChange(event.target.value)}
                rows={5}
              />
            </div>


            <div className="form-group">
                <label>Event Id</label>
                <input type="text" 
                  className="form-control"
                  value={eventId}
                  onChange={(event) =>handleEventIdChange(event.target.value)}
                  placeholder="Event Id" />
            </div>

            <button type="button" 
              onClick={onConnectSocket}
              className="btn btn-dark btn-lg btn-block">
              Connect
            </button>
          </form>
        </div>
    )
}
export default Auth;