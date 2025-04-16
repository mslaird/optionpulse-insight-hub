import { useState, useEffect } from "react";
import { Bell, User, Menu } from "lucide-react";
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
import Logo from "@/components/brand/Logo";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  useEffect(() => {
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }
    
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

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-30 md:left-64 h-16 bg-optionpulse-navy border-b border-border flex items-center px-4 md:px-6">
      <div className="flex items-center w-full">
        <div className="md:hidden flex items-center w-full">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={handleToggleSidebar}
          >
            <Menu size={20} />
          </Button>
          
          <Logo collapsed={false} className="mx-auto" />
          
          <div className="flex items-center ml-auto">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground mr-2">
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
        
        <div className="hidden md:flex items-center w-full">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-4"
            onClick={handleToggleSidebar}
          >
            <Menu size={20} />
          </Button>
          
          <div className="relative max-w-md w-full">
            <SearchAutocomplete />
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
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
      </div>
    </header>
  );
};

export default Header;
