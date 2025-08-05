"use client"

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import type { BundledLanguage, BundledTheme } from 'shiki'

interface CodeBlockProps {
  code: string
  language: 'typescript' | 'sql'
  className?: string
  showError?: boolean
}

export function CodeBlock({ code, language, className, showError }: CodeBlockProps) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    async function highlightCode() {
      const { codeToHtml } = await import('shiki')
      
      const highlighted = await codeToHtml(code, {
        lang: language as BundledLanguage,
        theme: 'github-dark' as BundledTheme,
        defaultColor: false,
      })
      
      setHtml(highlighted)
    }
    
    highlightCode()
  }, [code, language])

  if (!html) {
    // Fallback while loading
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
        <pre className="relative z-10 p-3 md:p-4 overflow-x-auto">
          <code className="text-xs font-mono text-gray-300">
            {code}
          </code>
        </pre>
      </div>
    )
  }

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
      <div 
        className="relative z-10 [&>pre]:!bg-transparent [&>pre]:!p-3 [&>pre]:md:!p-4 [&>pre]:!m-0 [&>pre]:overflow-x-auto [&_code]:!text-xs [&_code]:!font-mono"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}