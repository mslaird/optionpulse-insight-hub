
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, TrendingUp, ArrowUpRight, BookOpen, Mail, MessageSquare, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NotificationSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [options, setOptions] = useState({
    marketAlerts: true,
    volatilityAlerts: true,
    optionsExpiration: true,
    educationalContent: false,
    communityUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
  });
  
  const handleToggle = (key: string) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof options]
    }));
  };
  
  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Manage how and when you receive alerts and notifications
        </p>
      </div>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={18} className="text-optionpulse-blue" />
            Alert Types
          </CardTitle>
          <CardDescription>Choose which alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              <div className="space-y-0.5">
                <Label className="text-base">Market Alerts</Label>
                <p className="text-sm text-muted-foreground">Price movements, market news, and trading volume</p>
              </div>
            </div>
            <Switch 
              checked={options.marketAlerts} 
              onCheckedChange={() => handleToggle('marketAlerts')} 
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUpRight size={18} className="text-optionpulse-blue" />
              <div className="space-y-0.5">
                <Label className="text-base">Volatility Alerts</Label>
                <p className="text-sm text-muted-foreground">IV spikes, historical volatility changes</p>
              </div>
            </div>
            <Switch 
              checked={options.volatilityAlerts} 
              onCheckedChange={() => handleToggle('volatilityAlerts')} 
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-500" />
              <div className="space-y-0.5">
                <Label className="text-base">Options Expiration</Label>
                <p className="text-sm text-muted-foreground">Reminders about upcoming expirations</p>
              </div>
            </div>
            <Switch 
              checked={options.optionsExpiration} 
              onCheckedChange={() => handleToggle('optionsExpiration')} 
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-emerald-500" />
              <div className="space-y-0.5">
                <Label className="text-base">Educational Content</Label>
                <p className="text-sm text-muted-foreground">New lessons, strategy guides, and webinars</p>
              </div>
            </div>
            <Switch 
              checked={options.educationalContent} 
              onCheckedChange={() => handleToggle('educationalContent')} 
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-optionpulse-blue" />
              <div className="space-y-0.5">
                <Label className="text-base">Community Updates</Label>
                <p className="text-sm text-muted-foreground">Responses to your posts, mentions, and trending discussions</p>
              </div>
            </div>
            <Switch 
              checked={options.communityUpdates} 
              onCheckedChange={() => handleToggle('communityUpdates')} 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail size={18} className="text-optionpulse-blue" />
            Delivery Methods
          </CardTitle>
          <CardDescription>How would you like to receive notifications?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch 
              checked={options.emailNotifications} 
              onCheckedChange={() => handleToggle('emailNotifications')} 
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts in the app and browser</p>
            </div>
            <Switch 
              checked={options.pushNotifications} 
              onCheckedChange={() => handleToggle('pushNotifications')} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4 border-border/30">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettings;
