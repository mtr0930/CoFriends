import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import red from "@mui/material/colors/red";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
type Message = {
  role: "user" | "assistant";
  content: string;
};
import { Box, IconButton } from "@mui/material";

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  console.log(auth);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleMessage = ()=> {
    const content = inputRef.current?.value as string

    console.log(inputRef.current?.value);
    const newMessage: Message = { role: "user", content: content };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  }
  const getAssistantMessage = async () => {
    const assistantMsg: Message = {
      role: "assistant",
      content: "Hello"
    }
    setTimeout(function() {
      setChatMessages((prevMessages) => [...prevMessages, assistantMsg]); 
    }, 2000);
  };

  const handleSubmit = async ()=> {
    handleMessage();
    console.log(chatMessages);
    await getAssistantMessage();
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };
  // useLayoutEffect(() => {
  //   if (auth?.isLoggedIn && auth.user) {
  //     toast.loading("Loading Chats", { id: "loadchats" });
  //     getUserChats()
  //       .then((data) => {
  //         setChatMessages([...data.chats]);
  //         toast.success("Successfully loaded chats", { id: "loadchats" });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error("Loading Failed", { id: "loadchats" });
  //       });
  //   }
  // }, [auth]);
  
  // useEffect(() => {
  //   if (!auth?.user) {
  //     return navigate("/login");
  //   }
  // }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        maxWidth: "72rem",
        mt: "70px",
        gap: 3,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: { md: 1, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            flexGrow: "1",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            height: "70px",
            borderRadius: 8,
            backgroundColor: "white",
            borderColor: "black",
            border: "1px solid black",
            display: "flex",
            marginBottom: "50px"
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              color: "b",
              fontSize: "20px",
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
