
"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { CornerDownLeft, Loader2, User, Sparkles, Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { handleChat, handleMultiModalChat, handleTextToSpeech } from "./actions";
import { CrisisAlert } from "@/components/crisis-alert";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

export function ChatInterface({ 
  hasCameraPermission,
  hasMicPermission,
  detectedEmotion,
  isMultiModal,
  isListening,
  setIsListening,
}: { 
  hasCameraPermission: boolean,
  hasMicPermission: boolean,
  detectedEmotion: string,
  isMultiModal: boolean,
  isListening: boolean,
  setIsListening: (isListening: boolean) => void,
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { toast } = useToast();

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
           setIsListening(false);
        }
      };

    }
  }, [toast, isListening, setIsListening]);
  
  const handleToggleListening = () => {
    if (!hasMicPermission) {
        toast({
            variant: "destructive",
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
    const previousMessages = [...messages]; // History before the new message
    setMessages((prev) => [...prev, userMessage]);
    
    const currentInput = input;
    setInput("");

    startTransition(async () => {
      let result;
      if (isMultiModal) {
        const facialEmotion = hasCameraPermission ? detectedEmotion : "not_detected";
        const voiceTone = "calm"; // Placeholder
        result = await handleMultiModalChat(currentInput, previousMessages, facialEmotion, voiceTone);
      } else {
        result = await handleChat(currentInput, previousMessages);
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
        
        if (isMultiModal && result.response && hasMicPermission) {
            const audioResult = await handleTextToSpeech(result.response);
            if (audioResult.audioDataUri) {
                setAudioSrc(audioResult.audioDataUri);
            } else {
                toast({
                    variant: "destructive",
                    title: "Audio Error",
                    description: audioResult.error
                })
            }
        }
      }
    });
  };

  useEffect(() => {
    if (audioSrc && audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
    }
  }, [audioSrc]);

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
                          Hello! It's good to see you. I'm here to offer support and a safe space to talk. How are you feeling today?
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
                   <div className={cn("flex items-center gap-2", message.role === "user" ? "justify-end" : "")}>
                       {message.role === "assistant" && <p className="font-semibold">Saarthi AI</p>}
                       {message.role === 'assistant' && isSpeaking && index === messages.length - 1 && (
                            <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                        )}
                   </div>
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
                disabled={isPending || !hasMicPermission}
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
      {audioSrc && (
          <audio 
            ref={audioRef} 
            src={audioSrc} 
            onPlay={() => setIsSpeaking(true)}
            onEnded={() => {
                setIsSpeaking(false);
                setAudioSrc(null);
            }}
            hidden 
          />
      )}
    </>
  );
}
