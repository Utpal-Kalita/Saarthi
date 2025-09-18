
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck, Camera, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [cameraAccess, setCameraAccess] = useState(false);
  const [micAccess, setMicAccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved preferences from localStorage when the component mounts
    const savedCameraAccess = localStorage.getItem("cameraAccess") === "true";
    const savedMicAccess = localStorage.getItem("micAccess") === "true";
    setCameraAccess(savedCameraAccess);
    setMicAccess(savedMicAccess);
  }, []);

  const handleCameraChange = (checked: boolean) => {
    setCameraAccess(checked);
    localStorage.setItem("cameraAccess", String(checked));
  };
  
  const handleMicChange = (checked: boolean) => {
    setMicAccess(checked);
    localStorage.setItem("micAccess", String(checked));
  };

  const handleSaveChanges = () => {
    toast({
        title: "Preferences Saved",
        description: "Your settings have been updated successfully.",
    })
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, privacy, and data preferences.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Multi-Modal Emotional Intelligence</CardTitle>
          <CardDescription>
            Opt-in to allow Saarthi to understand your feelings better by analyzing facial expressions and voice tone for more empathetic responses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="default" className="bg-primary/10 border-primary/20">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle className="font-semibold">Your Privacy is Our Priority</AlertTitle>
            <AlertDescription>
              This feature is strictly opt-in. Your video and audio are NEVER recorded or stored. We only process it in real-time to detect emotions and the data is immediately discarded. You can disable this anytime.
            </AlertDescription>
          </Alert>
          <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex items-start space-x-4">
              <Camera className="h-6 w-6 text-primary mt-1" />
              <div className="flex-1 space-y-1">
                <Label htmlFor="camera-access" className="text-base font-medium">
                  Enable Camera Access
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow Saarthi to analyze facial expressions to detect emotions. Your video is not stored.
                </p>
              </div>
            </div>
            <Switch 
              id="camera-access"
              checked={cameraAccess}
              onCheckedChange={handleCameraChange} 
            />
          </div>
           <div className="flex items-center justify-between space-x-4 rounded-lg border p-4">
            <div className="flex items-start space-x-4">
              <Mic className="h-6 w-6 text-primary mt-1" />
              <div className="flex-1 space-y-1">
                <Label htmlFor="mic-access" className="text-base font-medium">
                  Enable Microphone Access
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow Saarthi to analyze voice tone for emotional context and enable voice input.
                </p>
              </div>
            </div>
            <Switch 
              id="mic-access"
              checked={micAccess}
              onCheckedChange={handleMicChange}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges}>Save Preferences</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
