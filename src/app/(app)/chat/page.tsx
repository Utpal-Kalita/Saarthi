
"use client";

import { useRef, useEffect, useState } from "react";
import { ChatInterface } from "./chat-interface";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CameraOff } from "lucide-react";

export default function ChatPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
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

    // Cleanup function to stop video stream
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

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
          <ChatInterface videoRef={videoRef} hasCameraPermission={hasCameraPermission} />
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
          <div className="flex-1 bg-card rounded-xl border p-4">
            <h3 className="font-semibold mb-2">Real-time Insights</h3>
            <p className="text-sm text-muted-foreground">When enabled, detected emotion and voice tone analysis will be shown here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
