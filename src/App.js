import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [nots, setNots] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    axios.get(`./nots.json`).then((res) => {
      setNots(res.data);
      setUnread(res.data.filter((item) => item.read === false).length);
    });
  }, []);

  const markRead = () => {
    Array.from(document.getElementsByClassName("unread")).forEach(
      (item, index) => {
        setTimeout(() => {
          item.classList.remove("unread");
          item.classList.add("marked");
          setUnread(unread - index - 1);
        }, index * 500);
      }
    );
  };

  return (
    <main>
      <div id="header">
        <h1>
          Notifications{" "}
          <span id="badge" className={unread <= 0 ? "hidden" : ""}>
            {unread}
          </span>
        </h1>{" "}
        <button onClick={() => markRead()}>Mark all as read</button>
      </div>
      <div id="main">
        {nots.map((myNot, index) => {
          return (
            <div
              key={index}
              onClick={(e) => {
                if(e.currentTarget.classList.contains("unread")){
                  setUnread(unread - 1);
                  e.currentTarget.classList.remove("unread")
                  e.currentTarget.classList.add("marked")
                };
              }}
              className={`notification ${myNot.read ? "" : "unread"}`}
            >
              <div className="profile-img">
                <img src={myNot.profilePicture} alt="" />
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  {myNot.accountLink ? (
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="accountName"
                      href={myNot.accountLink}
                    >
                      {myNot.account}
                    </a>
                  ) : (
                    <span className="accountName">{myNot.account}</span>
                  )}{" "}
                  <span>{myNot.didWhat}</span>
                  {myNot.toWhat ? (
                    myNot.toWhatLink ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={myNot.toWhatLink}
                        className={`toWhat ${
                          myNot.type === "group" ? "group" : "notGroup"
                        }`}
                      >
                        {" " + myNot.toWhat}
                      </a>
                    ) : (
                      <span
                        className={`toWhat ${
                          myNot.type === "group" ? "group" : "notGroup"
                        }`}
                      >
                        {" " + myNot.toWhat}
                      </span>
                    )
                  ) : (
                    ""
                  )}
                </div>
                <div className="notification-time">{myNot.time} ago</div>
                {myNot.type === "message" ? (
                  <div className="message">{myNot.message}</div>
                ) : (
                  ""
                )}
              </div>
              {myNot.type === "comment" ? (
                <div className="image-link">
                  <img src={myNot.commentedTo} alt="" />
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
