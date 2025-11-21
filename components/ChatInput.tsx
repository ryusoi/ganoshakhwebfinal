import React, { useState, useRef, KeyboardEvent } from 'react';
import SendIcon from './icons/SendIcon';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  t: any;
  isAiReady: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, t, isAiReady }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (text.trim() && !isLoading && isAiReady) {
      onSendMessage(text);
      setText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setText(e.currentTarget.value);
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${e.currentTarget.scrollHeight}px`;
    }
  };

  const isDisabled = isLoading || !isAiReady;

  return (
    <div className="p-2 sm:p-4 bg-stone-900/70 border-t border-amber-900/50">
      <div className="flex items-end gap-2 bg-stone-800/80 border border-stone-600/50 rounded-xl p-2">
        <textarea
          id="chat-input"
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={isAiReady ? t.chat_placeholder : 'AI is currently unavailable...'}
          className="flex-1 bg-transparent resize-none outline-none placeholder-stone-400 px-2 max-h-48 text-slate-100"
          rows={1}
          disabled={isDisabled}
        />
        <button
          onClick={handleSend}
          disabled={isDisabled || !text.trim()}
          aria-label="Send message"
          className="w-10 h-10 flex-shrink-0 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-stone-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;