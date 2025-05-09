import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import { generateResponse } from '@/lib/gpt4all';

// Example FAQ data for fallback
const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a range of skincare services including facials, chemical peels, skin consultations, dermaplane treatments, and more. We also have our own line of premium skincare products."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by clicking the 'Book Now' button on our website, or by calling us directly. We recommend booking in advance to secure your preferred time slot."
  },
  {
    question: "What is your cancellation policy?",
    answer: "We require at least 24 hours notice for cancellations or rescheduling to avoid a cancellation fee. We understand emergencies happen, so please contact us as soon as possible if you need to change your appointment."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is processed, you'll receive a confirmation email with tracking information. You can click the tracking link in that email to monitor your package's journey to you."
  }
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{type: 'user' | 'bot', text: string}[]>([
    {type: 'bot', text: 'Hi there! 👋 I\'m Sally\'s virtual assistant. How can I help you today?'}
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, {type: 'user', text: query}]);
    setIsLoading(true);
    
    try {
      // Create a context-aware prompt
      const context = `You are a helpful assistant for Sally's Soul Therapy, a skincare and wellness business. 
      The business offers skincare services, products, and consultations. 
      Previous conversation: ${conversation.slice(-4).map(msg => `${msg.type}: ${msg.text}`).join('\n')}
      User question: ${query}`;

      // Get response from GPT4All
      const response = await generateResponse(context);
      
      setConversation(prev => [...prev, {type: 'bot', text: response}]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback to FAQ matching if AI fails
      const userQuery = query.toLowerCase();
      const matchingFaq = faqs.find(faq => 
        faq.question.toLowerCase().includes(userQuery) || 
        userQuery.includes(faq.question.toLowerCase().replace('?', '').split(' ').slice(-3).join(' '))
      );
      
      const fallbackResponse = matchingFaq 
        ? matchingFaq.answer 
        : "I apologize, but I'm having trouble processing your request. Please try rephrasing your question or contact our team directly.";
      
      setConversation(prev => [...prev, {type: 'bot', text: fallbackResponse}]);
    } finally {
      setIsLoading(false);
      setQuery('');
    }
  };

  const suggestedQuestions = [
    "What services do you offer?",
    "What skincare products do you recommend?",
    "How do I book an appointment?",
    "Where are you located?"
  ];

  const handleSuggestionClick = (question: string) => {
    setQuery(question);
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <>
      {/* Chat button */}
      <button 
        onClick={toggleChatbot} 
        className={`fixed right-6 bottom-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-gray-200 hover:bg-gray-300' : 'bg-accent-foreground hover:bg-accent-foreground/90'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <MessageSquare className="h-6 w-6 text-white" />
        )}
      </button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-xl z-40 flex flex-col overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="p-4 bg-accent-foreground text-white flex items-center">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">Sally's Soul Therapy</h3>
              <p className="text-xs opacity-80">Ask me anything about our products & services</p>
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-accent-foreground text-white rounded-tr-none' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
          
          {/* Suggested questions */}
          {conversation.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="relative">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question here..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="sm"
                variant="ghost" 
                className="absolute right-0 top-0 h-full px-3" 
                disabled={!query.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatbot;
