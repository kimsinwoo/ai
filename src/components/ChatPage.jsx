import React, { useState, useEffect } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import axios from 'axios';
import style from '../style/Chat.module.css';

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/chat')
      .then(response => {
        setChats(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat list:', error);
      });
  }, []);

  const selectChat = (roomId) => {
    const selected = chats.find(chat => chat.roomId === roomId);
    setSelectedChat(selected);
  };

  return (
    <div className={style.chatPage}>
      <ChatList chats={chats} selectChat={selectChat} />
      {selectedChat && (
        <ChatWindow roomId={selectedChat.roomId} chatMessages={selectedChat.messages} />
      )}
    </div>
  );
};

export default ChatPage;
