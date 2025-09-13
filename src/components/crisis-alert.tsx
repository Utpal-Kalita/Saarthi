"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Phone } from "lucide-react";

interface CrisisAlertProps {
  open: boolean;
  helplineMessage?: string;
}

export function CrisisAlert({ open, helplineMessage }: CrisisAlertProps) {
  const handleCall = () => {
    window.location.href = "tel:14416";
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Support is available</AlertDialogTitle>
          <AlertDialogDescription>
            {helplineMessage ||
              "It sounds like you are going through a difficult time. Please reach out for help. You can connect with people who can support you by calling or texting."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 rounded-md">
          <h3 className="font-bold">Tele-MANAS Helpline</h3>
          <p>A national 24/7 helpline for mental health support in India.</p>
          <p className="font-bold text-lg mt-2">14416</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700 text-white">
            <Phone className="mr-2 h-4 w-4" /> Call 14416
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
