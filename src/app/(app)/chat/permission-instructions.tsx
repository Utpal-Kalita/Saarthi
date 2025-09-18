
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Lock } from "lucide-react";

interface PermissionInstructionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PermissionInstructionsDialog({ open, onOpenChange }: PermissionInstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Lock className="h-6 w-6" />
            Enable Permissions
          </DialogTitle>
          <DialogDescription>
            To use Live Talk, you need to allow access in your browser's site settings.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <p>
              1. Click the <span className="font-semibold">padlock icon</span> next to the website address in your browser's address bar.
            </p>
            <div className="relative w-full h-20 rounded-md overflow-hidden border">
                 <Image 
                    src="https://storage.googleapis.com/aai-web-samples/saarthi-permissions-guide.png"
                    alt="Browser address bar with padlock icon highlighted"
                    fill
                    className="object-contain"
                />
            </div>
            <p>2. Find the toggles for <span className="font-semibold">Camera</span> and <span className="font-semibold">Microphone</span> and turn them on.</p>
            <p>3. You may need to refresh the page for the changes to take effect.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
