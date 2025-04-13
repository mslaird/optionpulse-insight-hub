
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Key, Edit2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AccountSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleSaveProfile = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    }, 1000);
  };
  
  const handleSavePassword = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully."
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings and change your profile information
        </p>
      </div>
      
      <Card className="border-border/30">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
              <AvatarFallback className="bg-optionpulse-blue text-white text-lg">OP</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>Update your profile picture</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload size={16} />
              Upload
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={18} className="text-optionpulse-blue" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="email" defaultValue="john.doe@example.com" className="pl-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4 border-border/30">
          <Button onClick={handleSaveProfile} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key size={18} className="text-optionpulse-blue" />
            Password
          </CardTitle>
          <CardDescription>Change your password</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4 border-border/30">
          <Button onClick={handleSavePassword} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountSettings;
