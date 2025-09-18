
"use client";

import { useRef, useEffect, useState } from "react";
import { ChatInterface } from "./chat-interface";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraOff, Smile, Frown, Meh, Annoyed } from "lucide-react";

const emotions = [
  { name: 'Neutral', icon: Meh, color: 'text-blue-500' },
  { name: 'Happy', icon: Smile, color: 'text-green-500' },
  { name: 'Sad', icon: Frown, color: 'text-gray-500' },
  { name: 'Surprised', icon: Annoyed, color: 'text-yellow-500' },
];

export default function ChatPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(emotions[0]);
  const { toast } = useToast();

  useEffect(() => {
    const cameraEnabled = localStorage.getItem("cameraAccess") === "true";
    setIsCameraEnabled(cameraEnabled);

    if (cameraEnabled) {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error("Camera API not available in this browser.");
            setHasCameraPermission(false);
            return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play();
            };
          }
          setHasCameraPermission(true);
        } catch (error) {
          console.error("Error accessing camera:", error);
          setHasCameraPermission(false);
          toast({
            variant: "destructive",
            title: "Camera Access Denied",
            description: "Please enable camera permissions in your browser settings to use this feature.",
          });
        }
      };
      getCameraPermission();
    } else {
        setHasCameraPermission(false);
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);
  
  // Simulate emotion detection
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (hasCameraPermission) {
        intervalId = setInterval(() => {
            setDetectedEmotion(prev => {
                const currentIndex = emotions.findIndex(e => e.name === prev.name);
                const nextIndex = (currentIndex + 1) % emotions.length;
                return emotions[nextIndex];
            });
        }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [hasCameraPermission]);

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
          <ChatInterface 
            videoRef={videoRef} 
            hasCameraPermission={hasCameraPermission}
            detectedEmotion={detectedEmotion.name}
          />
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground border relative overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {(!isCameraEnabled || !hasCameraPermission) && (
                 <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-center p-4">
                    <CameraOff className="h-10 w-10 mb-2" />
                    <span className="font-semibold">Camera Off</span>
                    <p className="text-xs mt-1">Enable in settings for multi-modal insights.</p>
                </div>
            )}
          </div>
          <Card className="flex-1">
            <CardHeader>
                <CardTitle>Real-time Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {isCameraEnabled && hasCameraPermission ? (
                <div className="flex items-center gap-4">
                    <detectedEmotion.icon className={`h-16 w-16 ${detectedEmotion.color}`} />
                    <div>
                        <p className="text-sm text-muted-foreground">Detected Emotion</p>
                        <p className="text-2xl font-bold">{detectedEmotion.name}</p>
                    </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                    Enable camera in settings to see real-time emotional analysis here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
