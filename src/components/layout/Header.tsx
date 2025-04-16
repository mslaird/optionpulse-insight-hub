
import { useState, useEffect } from "react";
import { Bell, User, Menu, Search } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import SearchAutocomplete from "@/components/header/SearchAutocomplete";
import Logo from "@/components/brand/Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Header = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
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

  const handleNotificationClick = () => {
    navigate('/alerts');
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-30 md:left-64 h-16 bg-optionpulse-navy border-b border-border flex items-center px-4 md:px-6">
      <div className="flex items-center w-full">
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-foreground"
          >
            <Menu size={20} />
          </Button>
          <Logo />
        </div>
        
        <div className="relative max-w-md w-full hidden md:block">
          <SearchAutocomplete />
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors mr-0"
            onClick={() => setShowMobileSearch(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleNotificationClick}
            aria-label="View notifications"
          >
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
      
      <Dialog open={showMobileSearch} onOpenChange={setShowMobileSearch}>
        <DialogContent className="top-4 p-4 max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">Search</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <SearchAutocomplete 
              className="w-full"
              onSelect={() => setShowMobileSearch(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
