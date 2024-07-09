import React from 'react';
import style from '../style/Chat.module.css';

const ChatList = ({ chats, selectChat }) => {
  return (
    <div className={style.chatList}>
      {chats.map((chat, index) => (
        <div key={index} className={style.chatItem} onClick={() => selectChat(chat.roomId)}>
          <p>{chat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
