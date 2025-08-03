import React from 'react';
import { CheckCircle } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * MarkdownRenderer - A simple component for rendering markdown content as HTML
 * For more advanced markdown features, consider using react-markdown
 */
export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  // Simple markdown to HTML conversion for basic formatting
  const convertMarkdownToHtml = (markdown: string): string => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mb-4 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6 mt-8">$1</h1>')
      
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      
      // Links
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-lfc-red hover:text-bright-red underline">$1</a>')
      
      // Lists
      .replace(/^- (.+)$/gim, '<li class="mb-2">$1</li>')
      
      // Blockquotes
      .replace(/^> (.+)$/gim, '<blockquote class="border-l-4 border-lfc-red pl-4 italic text-gray-300 my-4">$1</blockquote>')
      
      // Paragraphs (basic - split by double newlines)
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h1') || paragraph.includes('<h2') || paragraph.includes('<h3') || 
            paragraph.includes('<li') || paragraph.includes('<blockquote')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-4 text-gray-300 leading-relaxed">${paragraph.trim()}</p>` : '';
      })
      .join('\n');
  };

  const htmlContent = convertMarkdownToHtml(content);

  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

/**
 * Simple component for rendering credential lists from markdown
 */
export function CredentialsList({ credentials }: { credentials: string[] }) {
  return (
    <div className="space-y-3">
      {credentials.map((credential, index) => (
        <div key={index} className="flex items-center text-gray-200">
          <CheckCircle className="w-5 h-5 text-lfc-red mr-3 flex-shrink-0" />
          <span>{credential}</span>
        </div>
      ))}
    </div>
  );
}