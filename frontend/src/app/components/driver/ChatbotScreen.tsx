import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import MobileHeader from '../shared/MobileHeader';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI traffic penalty assistant. How can I help you today?', sender: 'bot', time: '10:00' },
    { id: 2, text: 'I can help you with:\n• Understanding penalties\n• Payment procedures\n• Disputing violations\n• General traffic regulations', sender: 'bot', time: '10:00' }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'I understand your query. Let me help you with that information...',
        sender: 'bot',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader title="AI Chat Support" backPath="/driver/dashboard" />
      
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full pb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-900 shadow-md'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-gray-500">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-green-600 hover:bg-green-700">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="bg-purple-50 border-t border-purple-200 p-3 max-w-2xl mx-auto w-full">
        <p className="text-xs text-purple-800 text-center">
          AI-powered support • Available 24/7 • Instant responses
        </p>
      </div>
    </div>
  );
}
