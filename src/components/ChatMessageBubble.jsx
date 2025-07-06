import React from 'react';
import Logo from './Logo';

const ChatMessageBubble = ({ message }) => {
  const { text, isUser, timestamp, isError } = message;

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`chat-message ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Logo size="md" showText={false} />
        </div>
      )}
      
      <div className="flex flex-col max-w-[80%] md:max-w-[70%]">
        <div className={`chat-bubble ${
          isUser 
            ? 'bg-chat-user text-white ml-auto' 
            : isError 
              ? 'bg-red-900 bg-opacity-50 text-red-200'
              : 'bg-chat-bot text-gray-100'
        }`}>
          <div className="whitespace-pre-wrap">
            {text}
          </div>
        </div>
        
        <div className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 ml-3">
          <span className="text-white font-bold text-sm">U</span>
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubble; 