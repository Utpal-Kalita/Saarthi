import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and data preferences.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Enhanced Monitoring</CardTitle>
          <CardDescription>
            Opt-in to get deeper, data-driven insights into your well-being by correlating behavioral data (like sleep and activity) with your self-reported moods.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="default" className="bg-primary/10 border-primary/20">
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle className="font-semibold">Your Privacy is Our Priority</AlertTitle>
            <AlertDescription>
              This feature is strictly opt-in. Your data is used only to provide you with private, personalized insights and will never be shared without your explicit consent.
            </AlertDescription>
          </Alert>
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="flex-1 space-y-1">
              <Label htmlFor="enhanced-monitoring" className="text-base font-medium">
                Enable Enhanced Monitoring
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow Saarthi to access activity and sleep data from your device to provide personalized insights.
              </p>
            </div>
            <Switch id="enhanced-monitoring" disabled />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled>Connect Health Data</Button>
          <p className="text-xs text-muted-foreground ml-4">Coming Soon</p>
        </CardFooter>
      </Card>
    </div>
  );
}
