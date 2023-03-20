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
    Array.from(document.getElementsByClassName("unread")).map((item, index) => {
      setTimeout(() => {
        item.classList.remove("unread");
        item.classList.add("marked");
        setUnread(unread - index - 1);
      }, index * 500);
    });
  };

  return (
    <section>
      <header>
        <h1>
          Notifications{" "}
          <span id="badge" className={unread <= 0 ? "hidden" : ""}>
            {unread}
          </span>
        </h1>{" "}
        <button onClick={() => markRead()}>Mark all as read</button>
      </header>
      <main>
        {nots.map((myNot, index) => {
          return (
            <div
              key={index}
              className={`notification ${myNot.read ? "" : "unread"}`}
            >
              <div className="profile-img">
                <img src={myNot.profilePicture} alt="" />
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <a href="/" className="accountName">
                    {myNot.account}
                  </a>{" "}
                  <span>{myNot.didWhat}</span>
                  {myNot.toWhat ? (
                    <a href="/"
                      className={`toWhat ${
                        myNot.type === "group" ? "group" : "notGroup"
                      }`}
                    >
                      {" " + myNot.toWhat}
                    </a>
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
      </main>
    </section>
  );
}

export default App;
