"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface InteractiveTooltipProps {
  children: React.ReactNode
  content: string
}

export function InteractiveTooltip({ children, content }: InteractiveTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="text-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
