
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import { Settings as SettingsIcon, User, Bell, Palette } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  
  useEffect(() => {
    document.title = "Settings | OptionPulse";
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <SettingsIcon className="h-8 w-8 text-optionpulse-blue" />
            Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>
        
        <Separator />
        
        <Card className="border-border/30 bg-card/50">
          <CardContent className="p-0">
            <Tabs 
              defaultValue="account" 
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full bg-muted rounded-b-none rounded-t-lg h-auto p-0">
                <TabsTrigger 
                  value="account" 
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
                >
                  <User size={16} />
                  <span className="hidden sm:inline">Account</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
                >
                  <Bell size={16} />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="appearance"
                  className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
                >
                  <Palette size={16} />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="account" className="mt-0">
                  <AccountSettings />
                </TabsContent>
                
                <TabsContent value="notifications" className="mt-0">
                  <NotificationSettings />
                </TabsContent>
                
                <TabsContent value="appearance" className="mt-0">
                  <AppearanceSettings />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
