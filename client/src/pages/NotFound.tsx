
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Card className="bg-white border border-gray-200 shadow-lg max-w-md">
        <CardContent className="p-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-black">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <p className="text-gray-500 mb-6">
            The page you're looking for doesn't exist or has been moved. We're sorry for the inconvenience.
          </p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
          >
            Return to Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
