import React from "react"
import ReactMarkdown from "react-markdown"
import { ReactNode } from "react"

interface StyledMarkdownProps {
  children: string
}

export function StyledMarkdown({ children }: StyledMarkdownProps) {
  return (
    <div 
      className="prose prose-invert max-w-none space-y-4"
      dangerouslySetInnerHTML={{
        __html: markdownWithHtml(children),
      }}
    />
  )
}

function markdownWithHtml(markdown: string): string {
  let html = markdown

  // Convert markdown bold to HTML
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong style='font-weight: 700;'>$1</strong>")
  
  // Convert markdown italic to HTML
  html = html.replace(/_(.*?)_/g, "<em style='font-style: italic;'>$1</em>")
  
  // Convert markdown code to HTML
  html = html.replace(/`(.*?)`/g, "<code style='background-color: rgba(96,245,255,0.1); padding: 2px 6px; border-radius: 4px; color: #60F5FF;'>$1</code>")
  
  // Convert headings
  html = html.replace(/^### (.*?)$/gm, "<h3 style='font-size: 1.5rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem;'>$1</h3>")
  html = html.replace(/^## (.*?)$/gm, "<h2 style='font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;'>$1</h2>")
  
  // Convert bullet lists
  html = html.replace(/^- (.*?)$/gm, "<li style='margin-left: 1.5rem;'>$1</li>")
  html = html.replace(/(<li style='margin-left: 1.5rem;'>.*?<\/li>)/s, (match) => {
    return "<ul style='list-style-type: disc;'>" + match + "</ul>"
  })
  
  // Convert numbered lists
  html = html.replace(/^\d+\. (.*?)$/gm, "<li style='margin-left: 1.5rem;'>$1</li>")
  
  // Line breaks
  html = html.replace(/\n\n/g, "</p><p style='margin-top: 1rem;'>")
  html = `<p>${html}</p>`
  html = html.replace(/<\/p><p/g, "</p><p")

  // Preserve HTML spans (for colors and sizes)
  return html
}
