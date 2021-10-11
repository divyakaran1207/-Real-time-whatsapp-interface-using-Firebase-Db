import React, { useState,useEffect } from "react";
import SidebarChat from './SidebarChat'
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import db from "./fireBase";
import { useStateValue } from "./stateProvider";

function SIdebar() {
  const [rooms, setrooms] = useState([]);
  const [{user}, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = db.collection('Rooms').onSnapshot((snapshot)=>(
      setrooms(snapshot.docs.map((doc)=>
        ({
          id: doc.id,
          data: doc.data(),
        })
      ))
    ));
    // cleanup part
    return ()=>{
      unsubscribe();
    };
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_header_right">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
          <div 
          className='sidebar_searchContainer'>
              <SearchOutLined/>
              <input type='text' placeholder='enter your search here'/>
          </div>
      </div>
      <div className="sidebar_chats">
          <SidebarChat addNewChat/>
          {rooms.map((room)=>(
            <SidebarChat key={room.id} id={room.id}
            name={room.data.Name}/>
          ))}
      </div>
    </div>
  );
}

export default SIdebar;
