"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const router = useRouter();

  const handleLogin = () => {
    // In a real app, this would involve an actual authentication flow.
    // For this mock, we just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader className="text-center items-center">
          <DialogTitle className="text-2xl font-bold">Welcome to Saarthi!</DialogTitle>
          <DialogDescription>
            Choose how you'd like to proceed:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 pt-4">
          <Button onClick={handleLogin} size="lg">
            Login with Student ID
          </Button>
          <Button onClick={handleLogin} size="lg">
            Login with Email / Phone
          </Button>
          <Button onClick={handleLogin} variant="outline" size="lg">
            Sign Up (New User)
          </Button>
        </div>
        <div className="text-center pt-2">
            <button
                onClick={() => onOpenChange(false)}
                className="text-sm text-muted-foreground hover:underline"
            >
                Continue as Guest
            </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
