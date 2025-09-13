"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { CornerDownLeft, Loader2, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { handleChat } from "./actions";
import { CrisisAlert } from "@/components/crisis-alert";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const [crisisState, setCrisisState] = useState<{
    isCrisis: boolean;
    helplineMessage?: string;
  }>({ isCrisis: false });

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
    if (!input.trim() || isPending) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentChatHistory = [...messages, userMessage];
    setInput("");

    startTransition(async () => {
      const result = await handleChat(input, currentChatHistory);
      if (result.isCrisis) {
        setCrisisState({
          isCrisis: true,
          helplineMessage: result.helplineMessage,
        });
      } else {
        const assistantMessage: Message = {
          role: "assistant",
          content: result.response || "I'm sorry, I couldn't process that. Please try again.",
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    });
  };

  return (
    <>
      <CrisisAlert
        open={crisisState.isCrisis}
        helplineMessage={crisisState.helplineMessage}
      />
      <div className="relative flex flex-col h-full bg-card rounded-xl shadow-sm border">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-6 pr-4">
            {messages.length === 0 && (
                <div className="flex items-start gap-4 p-4 text-sm">
                    <Avatar className="h-9 w-9 border bg-primary/10 text-primary">
                        <AvatarFallback><Sparkles size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5 flex-1">
                        <p className="font-semibold">SarvUday AI</p>
                        <div className="prose prose-sm text-foreground bg-white p-3 rounded-lg shadow-sm">
                        Hello! I'm here to listen and support you. How are you feeling today?
                        </div>
                    </div>
                </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-4 text-sm",
                  message.role === "user" ? "justify-end" : ""
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-9 w-9 border bg-primary/10 text-primary">
                    <AvatarFallback>
                      <Sparkles size={20} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("grid gap-1.5 flex-1 max-w-[80%]", message.role === "user" ? "text-right" : "")}>
                   {message.role === "assistant" && <p className="font-semibold">SarvUday AI</p>}
                  <div
                    className={cn(
                      "prose prose-sm text-foreground p-3 rounded-lg shadow-sm",
                      message.role === "user"
                        ? "bg-muted text-foreground"
                        : "bg-white"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
                {message.role === "user" && (
                   <Avatar className="h-9 w-9 border">
                    <AvatarFallback>
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
               <div className="flex items-start gap-4 p-4 text-sm">
                    <Avatar className="h-9 w-9 border bg-primary/10 text-primary">
                        <AvatarFallback><Sparkles size={20} /></AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1.5 flex-1 pt-2">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                      </div>
                    </div>
                </div>
            )}
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
              placeholder="Type your message here..."
              className="pr-12 text-base rounded-full"
              disabled={isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8 rounded-full"
              disabled={!input.trim() || isPending}
            >
              <CornerDownLeft className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
