
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-optionpulse-navy p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-optionpulse-blue/20 flex items-center justify-center mx-auto mb-6">
          <div className="text-4xl font-bold text-optionpulse-blue">404</div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
