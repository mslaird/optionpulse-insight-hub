
import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
}

const SettingsCard = ({ 
  icon: Icon, 
  title, 
  description, 
  children, 
  footer 
}: SettingsCardProps) => {
  return (
    <Card className="border-border/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon size={18} className="text-optionpulse-blue" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="flex justify-end border-t pt-4 border-border/30">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default SettingsCard;
