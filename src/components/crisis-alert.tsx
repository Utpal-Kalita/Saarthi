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
import { Phone, AlertTriangle } from "lucide-react";

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
        <AlertDialogHeader className="text-center">
            <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit">
                 <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          <AlertDialogTitle className="text-xl font-bold pt-2">Help is Available Right Now</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {helplineMessage ||
              "It sounds like you are going through a very difficult time. Please reach out to connect with people who can support you by calling or texting."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-destructive/10 border-l-4 border-destructive text-destructive-foreground p-4 rounded-md text-center my-4">
          <h3 className="font-bold">Tele-MANAS Helpline</h3>
          <p className="text-sm">A national 24/7 helpline for mental health support in India.</p>
          <p className="font-bold text-2xl mt-2 tracking-widest">14416</p>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleCall} className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
            <Phone className="mr-2 h-5 w-5" /> Call 14416 Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
