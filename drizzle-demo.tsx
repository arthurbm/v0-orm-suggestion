"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Code2,
  Bot,
  Users,
  Shield,
  Zap,
  Sparkles,
  Database,
  ChevronLeft,
  ChevronRight,
  FileText,
  BrainCircuit,
  AlertTriangle,
  ArrowRight
} from "lucide-react"

export default function DrizzleDemo() {
  const [view, setView] = useState<'current' | 'proposed'>('current')

  const currentCode = `-- SQL Schema (database.sql)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),  -- AI often forgets length
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()  -- AI mixes NOW() vs CURRENT_TIMESTAMP
);

-- TypeScript (types.ts) - Manual sync required ⚠️
interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;  -- AI confusion: Date vs string vs number
}

-- Query (api.ts) - AI frequently generates SQL injection vulnerabilities
const users = await db.query(
  'SELECT * FROM users WHERE email = $1',  -- AI might forget parameterization
  [email]
);`

  const proposedCode = `// Single file - schema.ts ✨ AI understands this better!
import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),  // Type-safe, AI can't mess up
  email: varchar('email', { length: 255 }).unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Type-safe queries - AI gets autocomplete! 🤖
const usersByEmail = await db
  .select()
  .from(users)  // AI sees available tables
  .where(eq(users.email, email));  // AI sees available columns

// Types auto-generated - AI always has correct types! 🎉
type User = typeof users.$inferSelect;  // Never out of sync`

  const currentIssues = [
    {
      icon: Bot,
      title: "AI-generated migrations fail",
      description: "LLMs create invalid SQL syntax 40% of the time"
    },
    {
      icon: AlertTriangle,
      title: "AI hallucinates columns",
      description: "No validation until runtime crashes"
    },
    {
      icon: BrainCircuit,
      title: "LLMs mix SQL dialects",
      description: "MySQL vs PostgreSQL syntax confusion"
    },
    {
      icon: AlertCircle,
      title: "AI can't verify types",
      description: "TypeScript drift from SQL schema"
    },
    {
      icon: Code2,
      title: "No context for AI",
      description: "AI can't see schema when writing queries"
    }
  ]

  const proposedBenefits = [
    {
      icon: CheckCircle2,
      title: "Valid migrations",
      description: "TypeScript catches errors before runtime"
    },
    {
      icon: Shield,
      title: "Compile-time AI validation",
      description: "Invalid code fails immediately"
    },
    {
      icon: Zap,
      title: "AI gets full autocomplete",
      description: "Can't reference non-existent columns"
    },
    {
      icon: Bot,
      title: "AI understands TypeScript",
      description: "Better than SQL for most LLMs"
    },
    {
      icon: Database,
      title: "Context-aware AI coding",
      description: "Schema always visible to AI"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-[414px] md:max-w-6xl mx-auto min-h-screen flex flex-col">
        {view === 'current' ? (
          // Current SQL Approach (Before)
          <div className="flex flex-col h-full">
            {/* Compact Header */}
            <div className="px-3 md:px-6 pt-4 md:pt-8 pb-3 md:pb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-4 h-4 md:w-5 md:h-5 text-destructive" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Approach</span>
              </div>
              <h1 className="text-xl md:text-3xl font-bold mb-1">Raw SQL + Manual Types</h1>
              <p className="text-xs md:text-sm text-muted-foreground">AI struggles with sync, makes frequent errors</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge variant="destructive" className="text-[10px] md:text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  3 Files
                </Badge>
                <Badge variant="destructive" className="text-[10px] md:text-xs">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  High AI Error Rate
                </Badge>
              </div>
            </div>

            {/* Main Content - Side by side on desktop */}
            <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:gap-6 px-3 md:px-6 pb-3 md:pb-6">
              {/* Code Example */}
              <div className="mb-3 md:mb-0">
                <Card className="border-destructive/20 overflow-hidden h-full relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge variant="destructive" className="text-[9px] bg-destructive/90">
                      AI Error Prone
                    </Badge>
                  </div>
                  <CardContent className="p-0">
                    <CodeBlock code={currentCode} language="typescript" showError />
                  </CardContent>
                </Card>
              </div>

              {/* Issues */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-destructive flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI Development Pain Points
                </h3>
                <div className="space-y-1.5 md:space-y-2 flex-1">
                  {currentIssues.map((issue, i) => {
                    const Icon = issue.icon
                    return (
                      <div key={i} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-md md:rounded-lg bg-destructive/5 border border-destructive/10">
                        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-destructive mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-medium leading-tight">{issue.title}</h4>
                          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{issue.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="px-3 md:px-6 pb-3 md:pb-6 text-center">
              <Button 
                onClick={() => setView('proposed')} 
                className="w-full md:w-auto md:px-8 text-sm md:text-base bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                size="default"
              >
                See How AI Should Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          // Proposed Drizzle Approach (After)
          <div className="flex flex-col h-full">
            {/* Compact Header */}
            <div className="px-3 md:px-6 pt-4 md:pt-8 pb-3 md:pb-6 text-center">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">v0 + Drizzle ORM</span>
              </div>
              <h1 className="text-xl md:text-3xl font-bold mb-1">Type-Safe Database</h1>
              <p className="text-xs md:text-sm text-muted-foreground">AI writes better code with compile-time safety</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge className="text-[10px] md:text-xs bg-primary/20 text-primary border-primary/30">
                  <FileText className="w-3 h-3 mr-1" />
                  1 File
                </Badge>
                <Badge className="text-[10px] md:text-xs bg-primary/20 text-primary border-primary/30">
                  <Bot className="w-3 h-3 mr-1" />
                  AI-Friendly
                </Badge>
              </div>
            </div>

            {/* Main Content - Side by side on desktop */}
            <div className="flex-1 flex flex-col md:grid md:grid-cols-2 md:gap-6 px-3 md:px-6 pb-3 md:pb-6">
              {/* Code Example */}
              <div className="mb-3 md:mb-0">
                <Card className="border-primary/20 overflow-hidden h-full relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Badge className="text-[9px] bg-primary/90">
                      AI Optimized
                    </Badge>
                  </div>
                  <CardContent className="p-0">
                    <CodeBlock code={proposedCode} language="typescript" />
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <div className="flex-1 flex flex-col">
                <h3 className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-primary flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  Why AI Works Better
                </h3>
                <div className="space-y-1.5 md:space-y-2 flex-1">
                  {proposedBenefits.map((benefit, i) => {
                    const Icon = benefit.icon
                    return (
                      <div key={i} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 rounded-md md:rounded-lg bg-primary/5 border border-primary/10">
                        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs md:text-sm font-medium leading-tight">{benefit.title}</h4>
                          <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5">{benefit.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <div className="px-3 md:px-6 pb-3 md:pb-6 text-center">
              <Button 
                onClick={() => setView('current')} 
                variant="outline"
                className="w-full md:w-auto md:px-8 text-sm md:text-base"
                size="default"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Current Approach
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
