
"use client";

import { useRef, useEffect, useState } from "react";
import { ChatInterface } from "./chat-interface";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraOff, Smile, Frown, Meh, Annoyed, Video, VideoOff, Mic, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";
import { PermissionInstructionsDialog } from "./permission-instructions";

const emotions = [
  { name: 'Neutral', icon: Meh, color: 'text-blue-500' },
  { name: 'Happy', icon: Smile, color: 'text-green-500' },
  { name: 'Sad', icon: Frown, color: 'text-gray-500' },
  { name: 'Surprised', icon: Annoyed, color: 'text-yellow-500' },
];

export default function ChatPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isLiveTalkActive, setIsLiveTalkActive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(emotions[0]);
  const [isListening, setIsListening] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { toast } = useToast();
  
  const stopMediaTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
          videoRef.current.srcObject = null;
      }
    }
  };

  const getPermissionsAndStartStream = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        variant: "destructive",
        title: "Feature Not Supported",
        description: "Your browser does not support camera or microphone access.",
      });
      setIsLiveTalkActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
      
      setHasCameraPermission(true);
      setHasMicPermission(true);
      setPermissionsDenied(false);
      
    } catch (error) {
      console.error("Error accessing media devices:", error);
      if (error instanceof Error && (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError')) {
        setPermissionsDenied(true);
      } else if (error instanceof Error) {
         toast({
            variant: "destructive",
            title: "Could not start video source",
            description: "Please make sure your camera is not being used by another application and try again.",
        });
      }
      
      stopMediaTracks();
      setIsLiveTalkActive(false);
      setHasCameraPermission(false);
      setHasMicPermission(false);
    }
  };


  const handleToggleLiveTalk = async () => {
    if (isLiveTalkActive) {
      stopMediaTracks();
      setIsLiveTalkActive(false);
      setHasCameraPermission(false);
      setHasMicPermission(false);
    } else {
      setPermissionsDenied(false); // Reset denial state on new attempt
      setIsLiveTalkActive(true);
      // We now request permission *after* setting state, which triggers the render
      // of the video element, making it available.
    }
  };

  useEffect(() => {
    if (isLiveTalkActive) {
      getPermissionsAndStartStream();
    }
    
    return () => {
      // Cleanup function to stop tracks when component unmounts or isLiveTalkActive becomes false
      if (isLiveTalkActive) {
         stopMediaTracks();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLiveTalkActive]);
  
  // Simulate emotion detection
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isLiveTalkActive && hasCameraPermission) {
        intervalId = setInterval(() => {
            setDetectedEmotion(prev => {
                const currentIndex = emotions.findIndex(e => e.name === prev.name);
                const nextIndex = (currentIndex + 1) % emotions.length;
                return emotions[nextIndex];
            });
        }, 3000);
    }
    return () => clearInterval(intervalId);
  }, [isLiveTalkActive, hasCameraPermission]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
       <PermissionInstructionsDialog open={showInstructions} onOpenChange={setShowInstructions} />
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Saarthi AI</h1>
          <p className="text-muted-foreground">
            A safe space to talk about what's on your mind. Your conversation is private and secure.
          </p>
        </div>
        <Button onClick={handleToggleLiveTalk}>
            {isLiveTalkActive ? <VideoOff className="mr-2 h-4 w-4" /> : <Video className="mr-2 h-4 w-4" />}
            {isLiveTalkActive ? "Stop Live Talk" : "Live Talk with Saarthi"}
        </Button>
      </header>

      {!isLiveTalkActive && !permissionsDenied && (
        <Alert variant="default" className="bg-primary/10 border-primary/20 mt-4">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle className="font-semibold">Enhance Your Experience</AlertTitle>
            <AlertDescription>
                Click "Live Talk with Saarthi" to enable your camera and microphone for a more empathetic, multi-modal conversation. Your video and audio are never recorded or stored.
            </AlertDescription>
        </Alert>
      )}
      
       {permissionsDenied && (
        <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="font-semibold">Permissions Required</AlertTitle>
            <AlertDescription>
                Camera and microphone access was denied. To use Live Talk, you need to grant permission in your browser settings.
            </AlertDescription>
            <div className="mt-4 flex gap-2">
                <Button variant="secondary" onClick={handleToggleLiveTalk}>Retry</Button>
                <Button variant="outline" onClick={() => setShowInstructions(true)}>Show Instructions</Button>
            </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 overflow-hidden">
        {isLiveTalkActive && (
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="w-full aspect-video bg-muted rounded-xl flex items-center justify-center text-muted-foreground border relative overflow-hidden">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
              {!hasCameraPermission && !permissionsDenied && (
                   <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center text-center p-4">
                      <CameraOff className="h-10 w-10 mb-2" />
                      <span className="font-semibold">Waiting for Camera...</span>
                      <p className="text-xs mt-1">Please allow camera access when prompted.</p>
                  </div>
              )}
               {isListening && hasMicPermission && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                    <Mic className="h-8 w-8 mb-2 animate-pulse" />
                    <span className="font-semibold">Listening...</span>
                </div>
              )}
            </div>
            <Card className="flex-1">
              <CardHeader>
                  <CardTitle>Real-time Insights</CardTitle>
              </CardHeader>
              <CardContent>
                {hasCameraPermission ? (
                  <div className="flex items-center gap-4">
                      <detectedEmotion.icon className={`h-16 w-16 ${detectedEmotion.color}`} />
                      <div>
                          <p className="text-sm text-muted-foreground">Detected Emotion</p>
                          <p className="text-2xl font-bold">{detectedEmotion.name}</p>
                      </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                      Enable camera to see real-time emotional analysis.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        <div className={isLiveTalkActive ? 'lg:col-span-2 h-full' : 'col-span-1 lg:col-span-3 h-full'}>
          <ChatInterface 
            hasCameraPermission={hasCameraPermission}
            hasMicPermission={hasMicPermission}
            detectedEmotion={detectedEmotion.name}
            isMultiModal={isLiveTalkActive}
            isListening={isListening}
            setIsListening={setIsListening}
          />
        </div>
      </div>
    </div>
  );
}
