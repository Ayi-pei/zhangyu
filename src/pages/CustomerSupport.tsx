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
      { sender: 'support', text: '고객 센터：안녕하세요, 어떤 문제 있으신가요?' },
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
          placeholder="메시지를 입력해 주세요..."
        />
        <button onClick={handleSendMessage}>전송</button>
      </div>

      <button onClick={handleReceiveMessage}>시뮬레이션된 고객 서비스 답변</button>
    </div>
  );
};
export default CustomerSupport;
