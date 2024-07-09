import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import style from '../style/Chat.module.css';

const ChatWindow = ({ roomId, chatMessages }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages || []);
  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
        setMessages(prevMessages => [...prevMessages, JSON.parse(message.body)]);
      });
    });

    return () => {
      if (stompClient.current) {
        stompClient.current.disconnect();
      }
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        roomId,
        message,
        sender: localStorage.getItem('stuName'),
        timestamp: new Date().toISOString()
      };

      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.send('/app/chat', {}, JSON.stringify(newMessage));
        setMessages(prevMessages => [...prevMessages, newMessage]);
        setMessage('');
      } else {
        console.error('WebSocket is not connected');
      }
    }
  };

  return (
    <div className={style.chatWindow}>
      <div className={style.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={style.message}>
            <span className={style.sender}>{msg.sender}</span>: {msg.message}
          </div>
        ))}
      </div>
      <div className={style.input}>
        <input 
          type="text" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage() : null}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
