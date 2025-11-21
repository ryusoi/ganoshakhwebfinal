
import React from 'react';
import type { ChatMessage } from '../types';
import SparkIcon from './icons/SparkIcon';
import LinkIcon from './icons/LinkIcon';

interface MessageBubbleProps {
  message: ChatMessage;
  t: any; // translations object
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, t }) => {
  const isModel = message.role === 'model';
  const hasHtml = /<[a-z][\s\S]*>/i.test(message.text);

  return (
    <div className={`flex items-start gap-3 sm:gap-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${isModel ? 'bg-amber-800/50' : 'bg-stone-700'}`}>
        {isModel ? <SparkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" /> : <span className="text-lg">👤</span>}
      </div>
      <div className={`max-w-lg xl:max-w-2xl rounded-2xl p-3 sm:p-4 text-sm sm:text-base ${isModel ? 'bg-stone-800/70 border border-stone-700/50' : 'bg-blue-600/90'}`}>
        {hasHtml ? (
          <div className="text-slate-100" dangerouslySetInnerHTML={{ __html: message.text }}></div>
        ) : (
          <p className="whitespace-pre-wrap text-slate-100">{message.text}</p>
        )}
        
        {message.sources && message.sources.length > 0 && (
          <div className="mt-4 pt-3 border-t border-stone-600/50">
            <h4 className="text-xs font-semibold text-stone-400 mb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              {t.sources}
            </h4>
            <ul className="space-y-1">
              {/* FIX: Added filtering and fallbacks to handle optional 'web', 'uri', and 'title' properties in sources, preventing potential runtime errors. */}
              {message.sources.map((source, index) => {
                const web = source.web;
                if (web?.uri) {
                  return (
                    <li key={index}>
                      <a
                        href={web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 hover:underline truncate block"
                        title={web.title || ''}
                      >
                        {index + 1}. {web.title || web.uri}
                      </a>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
