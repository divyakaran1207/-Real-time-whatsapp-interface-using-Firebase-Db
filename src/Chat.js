import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import React, { useState, useEffect } from "react";
import "./chat.css";
import db from "./fireBase";
import firebase from "firebase/app";
import { useStateValue } from "./stateProvider";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const sendmessage = (e) => {
    e.preventDefault();
    console.log(`you typed ${input}`);

    db.collection("Rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  const [input, setinput] = useState("");
  const [seed, setseed] = useState("");
  const { roomid } = useParams();
  const [roomName, setroomName] = useState("");
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    if (roomid) {
      db.collection("Rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setroomName(snapshot.data().Name));
      db.collection("Rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  useEffect(() => {
    setseed(Math.floor(Math.random() * 5000));
  }, [roomid]);
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>Last seen {messages[messages.length-1]?.timestamp?.toUTCString()}</p>
        </div>
        <div className="chat_header_right">
          <IconButton>
            {" "}
            <SearchOutlined />
          </IconButton>
          <IconButton>
            {" "}
            <AttachFile />
          </IconButton>
          <IconButton>
            {" "}
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {message.timestamp?.toUTCString()}
              {/*  {message.timestamp?.toUTCString()} */}
              {/* {  new Date(message.timestamp?.toDate()).toUTCString()} */}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <IconButton>
          {" "}
          <InsertEmoticonIcon />{" "}
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="Type your message here"
            value={input}
            onChange={(e) => {
              setinput(e.target.value);
            }}
          ></input>
          <IconButton type="submit" onClick={sendmessage}>
            {" "}
            <SendIcon />{" "}
          </IconButton>
        </form>
        <IconButton>
          {" "}
          <MicIcon />{" "}
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
