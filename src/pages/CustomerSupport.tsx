import React, { useState } from 'react';
import './CustomerSupport.css'; // 导入样式文件

interface Message {
  sender: 'user' | 'support';
  text: string;
}

const CustomerSupport = () => {
  // 初始化消息列表
  const [messages, setMessages] = useState<Message[]>([]);

  // 当前输入的消息
  const [messageText, setMessageText] = useState('');

  // 发送消息
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // 发送的消息
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: messageText },
      ]);
      setMessageText(''); // 清空输入框
    }
  };

  // 模拟客服回复
  const handleReceiveMessage = () => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'support', text: '客服：您好，有什么问题吗？' },
    ]);
  };

  return (
    <div className="customer-support-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'support-message'}`}
          >
            <span>{message.text}</span>
          </div>
        ))}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="请输入您的消息..."
        />
        <button onClick={handleSendMessage}>发送</button>
      </div>

      <button onClick={handleReceiveMessage}>模拟客服回复</button>
    </div>
  );
};
export default CustomerSupport;
