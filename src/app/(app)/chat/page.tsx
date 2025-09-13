import { ChatInterface } from "./chat-interface";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Assistant</h1>
        <p className="text-muted-foreground">
          A safe space to talk about what's on your mind. Your conversation is private and secure.
        </p>
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
