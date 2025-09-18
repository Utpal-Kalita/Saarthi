
import { ChatInterface } from "./chat-interface";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">AI Assistant</h1>
        <p className="text-muted-foreground">
          A safe space to talk about what's on your mind. Your conversation is private and secure.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
        <div className="lg:col-span-2 h-full">
            <ChatInterface />
        </div>
        <div className="hidden lg:flex flex-col gap-4">
            <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground border">
                <span>Camera feed will appear here</span>
            </div>
            <div className="flex-1 bg-card rounded-xl border p-4">
                <h3 className="font-semibold mb-2">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">Detected emotion and voice tone analysis will be shown here.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
