"use client"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  code: string
  language: 'typescript' | 'sql'
  className?: string
  showError?: boolean
}

// Custom theme with more vibrant colors
const customTheme = {
  ...atomDark,
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    background: 'transparent',
  },
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    background: 'transparent',
  },
}

export function CodeBlock({ code, language, className, showError }: CodeBlockProps) {
  return (
    <div className={cn(
      "relative group overflow-hidden rounded-md", 
      showError && "ring-1 ring-destructive/50",
      className
    )}>
      <div className={cn(
        "absolute inset-0",
        language === 'sql' ? "bg-slate-900/95" : "bg-slate-800/95"
      )} />
      <SyntaxHighlighter
        language={language}
        style={customTheme}
        customStyle={{
          margin: 0,
          padding: '0.625rem',
          borderRadius: '0',
          fontSize: '0.7rem',
          lineHeight: '1.35',
          backgroundColor: 'transparent',
          fontFamily: 'var(--font-mono)',
          overflow: 'auto',
          maxHeight: 'none',
          position: 'relative',
          zIndex: 1,
        }}
        showLineNumbers={false}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}