"use client";

import { useState, useRef, useEffect } from "react";
import { CornerDownLeft, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

const MOCK_MESSAGES = [
  {
    user: { id: "user1", name: "Anonymous Panda", avatarColor: "bg-teal-200" },
    content: "Exams are so stressful. I feel like I can't keep up with everything.",
    timestamp: "10:30 AM",
  },
  {
    user: { id: "user2", name: "Anonymous Tiger", avatarColor: "bg-orange-200" },
    content: "I totally get that. I've been feeling the same way. What's been helping me is breaking down my study sessions into smaller chunks.",
    timestamp: "10:32 AM",
  },
  {
    user: { id: "user3", name: "Anonymous Koala", avatarColor: "bg-gray-200" },
    content: "That's a good idea. I also try to take short breaks and do some deep breathing exercises. It really helps calm my nerves.",
    timestamp: "10:35 AM",
  },
    {
    user: { id: "user1", name: "Anonymous Panda", avatarColor: "bg-teal-200" },
    content: "Thanks for the tips! It's nice to know I'm not alone in this.",
    timestamp: "10:40 AM",
  },
];

type Message = {
    user: { id: string; name: string; avatarColor: string; };
    content: string;
    timestamp: string;
};

export function SupportCircleChat() {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsSending(true);
    // Simulate network delay
    setTimeout(() => {
        const newMessage: Message = {
            user: { id: "currentUser", name: "You (Anonymous Fox)", avatarColor: "bg-indigo-200" },
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setIsSending(false);
    }, 500);
  };

  return (
    <Card className="relative flex flex-col h-full shadow-sm">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6 pr-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 text-sm",
                message.user.id === "currentUser" ? "justify-end" : ""
              )}
            >
              {message.user.id !== "currentUser" && (
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className={message.user.avatarColor}>
                    {message.user.name.charAt(10)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className={cn("grid gap-1.5 max-w-[80%]", message.user.id === "currentUser" ? "text-right items-end" : "items-start")}>
                 <p className="font-semibold text-xs text-muted-foreground px-1">{message.user.name}</p>
                <div
                  className={cn(
                    "prose prose-sm text-foreground p-3 rounded-lg shadow-sm",
                    message.user.id === "currentUser"
                      ? "bg-primary/10 text-foreground"
                      : "bg-muted/80"
                  )}
                >
                  {message.content}
                </div>
                <p className="text-xs text-muted-foreground px-1">{message.timestamp}</p>
              </div>
               {message.user.id === "currentUser" && (
                <Avatar className="h-9 w-9 border">
                  <AvatarFallback className={message.user.avatarColor}>
                    {message.user.name.charAt(15)}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t bg-card rounded-b-xl">
        <form
          onSubmit={handleSubmit}
          className="relative"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts anonymously..."
            className="pr-12 text-base rounded-full"
            disabled={isSending}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 rounded-full"
            disabled={!input.trim() || isSending}
          >
            {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
      </div>
    </Card>
  );
}
