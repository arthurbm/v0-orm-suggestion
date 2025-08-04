"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Database, Zap, Users } from "lucide-react"

export default function DrizzleDemo() {
  const [activeTab, setActiveTab] = useState<"current" | "proposed">("current")

  const currentApproach = {
    title: "Current Approach",
    subtitle: "Raw SQL with manual type definitions",
    code: (
      <>
        <span className="text-muted-foreground">// SQL Schema (separate file)</span>
        {"\n"}
        <span className="text-primary">CREATE TABLE</span> <span className="text-foreground">users</span>{" "}
        <span className="text-muted-foreground">(</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">id</span> <span className="text-primary">SERIAL PRIMARY KEY</span>
        <span className="text-muted-foreground">,</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">name</span> <span className="text-primary">VARCHAR</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">255</span>
        <span className="text-muted-foreground">),</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">email</span> <span className="text-primary">VARCHAR</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">255</span>
        <span className="text-muted-foreground">)</span> <span className="text-primary">UNIQUE</span>
        <span className="text-muted-foreground">,</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">created_at</span> <span className="text-primary">TIMESTAMP DEFAULT NOW</span>
        <span className="text-muted-foreground">()</span>
        {"\n"}
        <span className="text-muted-foreground">);</span>
        {"\n\n"}
        <span className="text-muted-foreground">// TypeScript (manual sync required)</span>
        {"\n"}
        <span className="text-primary">interface</span> <span className="text-foreground">User</span>{" "}
        <span className="text-muted-foreground">{"{"}</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">id</span>
        <span className="text-muted-foreground">:</span> <span className="text-primary">number</span>
        <span className="text-muted-foreground">;</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">name</span>
        <span className="text-muted-foreground">:</span> <span className="text-primary">string</span>
        <span className="text-muted-foreground">;</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">email</span>
        <span className="text-muted-foreground">:</span> <span className="text-primary">string</span>
        <span className="text-muted-foreground">;</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">created_at</span>
        <span className="text-muted-foreground">:</span> <span className="text-primary">Date</span>
        <span className="text-muted-foreground">;</span>
        {"\n"}
        <span className="text-muted-foreground">{"}"}</span>
        {"\n\n"}
        <span className="text-muted-foreground">// Database query</span>
        {"\n"}
        <span className="text-primary">const</span> <span className="text-foreground">users</span>{" "}
        <span className="text-muted-foreground">=</span> <span className="text-primary">await</span>{" "}
        <span className="text-foreground">db</span>
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">query</span>
        <span className="text-muted-foreground">(</span>
        {"\n"}
        {"  "}
        <span className="text-accent-foreground">'SELECT * FROM users WHERE email = $1'</span>
        <span className="text-muted-foreground">,</span>
        {"\n"}
        {"  "}
        <span className="text-muted-foreground">[</span>
        <span className="text-foreground">email</span>
        <span className="text-muted-foreground">]</span>
        {"\n"}
        <span className="text-muted-foreground">);</span>
      </>
    ),
    issues: [
      "Manual type sync between SQL and TypeScript",
      "Runtime SQL errors only",
      "No IDE autocomplete for columns",
      "Schema changes require multiple file updates",
      "Beginners struggle with SQL syntax",
    ],
  }

  const proposedApproach = {
    title: "Proposed Approach",
    subtitle: "Type-safe schema-first design with Drizzle ORM",
    code: (
      <>
        <span className="text-muted-foreground">// Single source of truth - schema.ts</span>
        {"\n"}
        <span className="text-primary">import</span> <span className="text-muted-foreground">{"{"}</span>{" "}
        <span className="text-foreground">pgTable</span>
        <span className="text-muted-foreground">,</span> <span className="text-foreground">serial</span>
        <span className="text-muted-foreground">,</span> <span className="text-foreground">varchar</span>
        <span className="text-muted-foreground">,</span> <span className="text-foreground">timestamp</span>{" "}
        <span className="text-muted-foreground">{"}"}</span> <span className="text-primary">from</span>{" "}
        <span className="text-accent-foreground">'drizzle-orm/pg-core'</span>
        <span className="text-muted-foreground">;</span>
        {"\n\n"}
        <span className="text-primary">export const</span> <span className="text-foreground">users</span>{" "}
        <span className="text-muted-foreground">=</span> <span className="text-foreground">pgTable</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">'users'</span>
        <span className="text-muted-foreground">,</span> <span className="text-muted-foreground">{"{"}</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">id</span>
        <span className="text-muted-foreground">:</span> <span className="text-foreground">serial</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">'id'</span>
        <span className="text-muted-foreground">).</span>
        <span className="text-foreground">primaryKey</span>
        <span className="text-muted-foreground">(),</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">name</span>
        <span className="text-muted-foreground">:</span> <span className="text-foreground">varchar</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">'name'</span>
        <span className="text-muted-foreground">,</span> <span className="text-muted-foreground">{"{"}</span>{" "}
        <span className="text-foreground">length</span>
        <span className="text-muted-foreground">:</span> <span className="text-accent-foreground">255</span>{" "}
        <span className="text-muted-foreground">{"}"}</span>
        <span className="text-muted-foreground">),</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">email</span>
        <span className="text-muted-foreground">:</span> <span className="text-foreground">varchar</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">'email'</span>
        <span className="text-muted-foreground">,</span> <span className="text-muted-foreground">{"{"}</span>{" "}
        <span className="text-foreground">length</span>
        <span className="text-muted-foreground">:</span> <span className="text-accent-foreground">255</span>{" "}
        <span className="text-muted-foreground">{"}"}</span>
        <span className="text-muted-foreground">).</span>
        <span className="text-foreground">unique</span>
        <span className="text-muted-foreground">(),</span>
        {"\n"}
        {"  "}
        <span className="text-foreground">createdAt</span>
        <span className="text-muted-foreground">:</span> <span className="text-foreground">timestamp</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-accent-foreground">'created_at'</span>
        <span className="text-muted-foreground">).</span>
        <span className="text-foreground">defaultNow</span>
        <span className="text-muted-foreground">(),</span>
        {"\n"}
        <span className="text-muted-foreground">{"}"}</span>
        <span className="text-muted-foreground">);</span>
        {"\n\n"}
        <span className="text-muted-foreground">// Type-safe queries with full autocomplete</span>
        {"\n"}
        <span className="text-primary">const</span> <span className="text-foreground">usersByEmail</span>{" "}
        <span className="text-muted-foreground">=</span> <span className="text-primary">await</span>{" "}
        <span className="text-foreground">db</span>
        {"\n"}
        {"  "}
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">select</span>
        <span className="text-muted-foreground">()</span>
        {"\n"}
        {"  "}
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">from</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-foreground">users</span>
        <span className="text-muted-foreground">)</span>
        {"\n"}
        {"  "}
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">where</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-foreground">eq</span>
        <span className="text-muted-foreground">(</span>
        <span className="text-foreground">users</span>
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">email</span>
        <span className="text-muted-foreground">,</span> <span className="text-foreground">email</span>
        <span className="text-muted-foreground">));</span>
        {"\n\n"}
        <span className="text-muted-foreground">// TypeScript types auto-generated!</span>
        {"\n"}
        <span className="text-primary">type</span> <span className="text-foreground">User</span>{" "}
        <span className="text-muted-foreground">=</span> <span className="text-primary">typeof</span>{" "}
        <span className="text-foreground">users</span>
        <span className="text-muted-foreground">.</span>
        <span className="text-foreground">$inferSelect</span>
        <span className="text-muted-foreground">;</span>
      </>
    ),
    benefits: [
      "Single source of truth for schema",
      "Compile-time type checking",
      "Full IDE autocomplete support",
      "Auto-generated TypeScript types",
      "Just code - no SQL knowledge required",
    ],
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">v0 Should Default to Drizzle ORM</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Better type safety, clearer schemas, and more beginner-friendly. Perfect for AI code generation.
          </p>

          {/* Key Benefits Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="px-3 py-1.5">
              <Zap className="w-3 h-3 mr-2" />
              Better for AI
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5">
              <Users className="w-3 h-3 mr-2" />
              Beginner Friendly
            </Badge>
            <Badge variant="secondary" className="px-3 py-1.5">
              <Database className="w-3 h-3 mr-2" />
              Type Safety
            </Badge>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === "current" ? "default" : "ghost"}
              onClick={() => setActiveTab("current")}
              className="mr-1"
              size="sm"
            >
              Current Approach
            </Button>
            <Button
              variant={activeTab === "proposed" ? "default" : "ghost"}
              onClick={() => setActiveTab("proposed")}
              size="sm"
            >
              Proposed Approach
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Code Section */}
          <Card
            className={`relative overflow-hidden ${activeTab === "current" ? "border-destructive/20" : "border-primary/20"}`}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 ${activeTab === "current" ? "bg-destructive/20" : "bg-primary/20"}`}
            />
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  {activeTab === "current" ? (
                    <XCircle className="w-5 h-5 text-destructive" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                  {activeTab === "current" ? currentApproach.title : proposedApproach.title}
                </CardTitle>
                <Badge variant={activeTab === "current" ? "destructive" : "default"} className="text-xs">
                  {activeTab === "current" ? "Issues" : "Drizzle ORM"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {activeTab === "current" ? currentApproach.subtitle : proposedApproach.subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-muted/50 border rounded-lg p-4 text-sm overflow-x-auto font-mono leading-relaxed">
                  <code>{activeTab === "current" ? currentApproach.code : proposedApproach.code}</code>
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Benefits/Issues Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeTab === "current" ? (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    Current Issues
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Drizzle Benefits
                  </>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {activeTab === "current"
                  ? "Why the current approach creates problems for AI and developers"
                  : "How Drizzle solves these problems and improves the developer experience"}
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(activeTab === "current" ? currentApproach.issues : proposedApproach.benefits).map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    {activeTab === "current" ? (
                      <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    )}
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Database Services Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">Perfect pairing with database services</p>
          <div className="flex justify-center gap-3">
            <Badge variant="outline" className="px-3 py-1">
              <Database className="w-3 h-3 mr-2" />
              Neon
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Database className="w-3 h-3 mr-2" />
              Supabase
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Database className="w-3 h-3 mr-2" />
              PlanetScale
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
