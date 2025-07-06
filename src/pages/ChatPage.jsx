import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatMessageBubble from '../components/ChatMessageBubble';
import UsageCounter from '../components/UsageCounter';
import ChatInputBar from '../components/ChatInputBar';
import FormModal from '../components/FormModal';
import Logo from '../components/Logo';
import { sendPromptToGemini } from '../api/gemini';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const maxFreeQuestions = 5;

  // Scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (messageText) => {
    if (!messageText.trim()) return;

    // Check if user has exceeded free questions and hasn't submitted form
    if (questionCount >= maxFreeQuestions && !hasSubmittedForm) {
      setShowModal(true);
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestionCount(prev => prev + 1);
    setIsLoading(true);

    try {
      // Get AI response
      const aiResponse = await sendPromptToGemini(messageText);
      
      // Add AI message
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [questionCount, maxFreeQuestions, hasSubmittedForm]);

  // Handle initial question from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const initialQuestion = urlParams.get('q');
    
    if (initialQuestion && messages.length === 0) {
      handleSendMessage(initialQuestion);
    }
  }, [location.search, messages.length, handleSendMessage]);

  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setHasSubmittedForm(true);
    setShowModal(false);
    // In a real app, you'd send this data to your backend
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-chat-bg text-white flex flex-col">
      {/* Header */}
      <header className="bg-chat-dark border-b border-gray-800 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to home</span>
            </button>
            <Logo size="sm" className="text-white" />
          </div>
          
          <UsageCounter 
            questionCount={questionCount} 
            maxQuestions={maxFreeQuestions}
            hasSubmittedForm={hasSubmittedForm}
          />
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full px-4">
            <div className="text-center max-w-md">
              <div className="mx-auto mb-6">
                <Logo size="xl" showText={false} />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Hello! How can I assist you today?</h2>
              <p className="text-gray-400">
                I'm here to explain complex topics in simple terms using real-world analogies. Ask me anything!
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((message) => (
              <ChatMessageBubble key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="chat-message">
                <div className="flex-shrink-0">
                  <Logo size="md" showText={false} />
                </div>
                <div className="chat-bubble bg-chat-bot text-gray-300">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-800 bg-chat-dark">
        <div className="max-w-4xl mx-auto">
          <ChatInputBar 
            onSendMessage={handleSendMessage}
            disabled={isLoading || (questionCount >= maxFreeQuestions && !hasSubmittedForm)}
            placeholder="Ask KnowItGPT anything…"
          />
        </div>
      </div>

      {/* Form Modal */}
      {showModal && (
        <FormModal 
          onSubmit={handleFormSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ChatPage; 