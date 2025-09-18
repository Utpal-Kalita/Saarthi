
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { CornerDownLeft, Loader2, User, Bot, Sparkles, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleChat, handleMultiModalChat } from "./actions";
import { CrisisAlert } from "@/components/crisis-alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Add this type definition for the SpeechRecognition API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function ChatInterface({ videoRef, hasCameraPermission }: { videoRef: React.RefObject<HTMLVideoElement>, hasCameraPermission: boolean }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isMultiModal, setIsMultiModal] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<any>(null);

  const { toast } = useToast();

  const [crisisState, setCrisisState] = useState<{
    isCrisis: boolean;
    helplineMessage?: string;
  }>({ isCrisis: false });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cameraEnabled = localStorage.getItem("cameraAccess") === "true";
    const micEnabled = localStorage.getItem("micAccess") === "true";
    setIsMultiModal(cameraEnabled || micEnabled);
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        toast({
          variant: "destructive",
          title: "Voice Error",
          description: "Could not start voice recognition. Please check your microphone permissions.",
        });
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        if (isListening) {
           recognitionRef.current.start();
        }
      };

    }
  }, [toast, isListening]);
  
  const handleToggleListening = () => {
    const micEnabled = localStorage.getItem("micAccess") === "true";
    if (!micEnabled) {
      toast({
        title: "Microphone Disabled",
        description: "Please enable microphone access in settings to use voice input.",
      });
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentChatHistory = [...messages, userMessage];
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      let result;
      if (isMultiModal) {
        // Placeholder values for emotion and tone
        const facialEmotion = "neutral"; 
        const voiceTone = "calm";
        result = await handleMultiModalChat(currentInput, currentChatHistory, facialEmotion, voiceTone);
      } else {
        result = await handleChat(currentInput, currentChatHistory);
      }
      
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
                        <p className="font-semibold">Saarthi AI</p>
                        <div className="prose prose-sm text-foreground bg-white p-3 rounded-lg shadow-sm">
                          Hello! I'm here to listen and support you. How are you feeling today?
                          {isMultiModal && <span className="text-xs block mt-2 text-muted-foreground">Multi-modal features are available. Enable them in settings.</span>}
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
                   {message.role === "assistant" && <p className="font-semibold">Saarthi AI</p>}
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
            className="relative flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your message here..."}
              className="pr-20 text-base rounded-full"
              disabled={isPending}
            />
            <Button
                type="button"
                size="icon"
                variant={isListening ? "secondary" : "ghost"}
                className="absolute top-1/2 right-12 -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={handleToggleListening}
                disabled={isPending}
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
              >
                {isListening ? <MicOff /> : <Mic />}
              </Button>
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
