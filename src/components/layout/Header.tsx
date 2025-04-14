
import { useState, useEffect } from "react";
import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import SearchAutocomplete from "@/components/header/SearchAutocomplete";

const Header = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Load profile image from localStorage when component mounts
  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
    // Listen for storage events to update the profile image in real-time across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userProfileImage") {
        setProfileImage(e.newValue);
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="fixed top-0 right-0 left-0 z-30 md:left-64 h-16 bg-optionpulse-navy border-b border-border flex items-center px-4 md:px-6">
      <div className="md:hidden w-8"></div>
      <div className="flex-1 flex items-center justify-between">
        <div className="relative max-w-md w-full hidden md:block">
          <SearchAutocomplete />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell size={20} />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full overflow-hidden p-0 h-10 w-10">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profileImage || ""} alt="Profile" />
                  <AvatarFallback className="bg-optionpulse-blue text-white">
                    <User size={18} />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/watchlist">Watchlist</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
