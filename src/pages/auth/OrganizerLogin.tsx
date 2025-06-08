
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const OrganizerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Organizer login data:", data);
    toast({
      title: "Welcome back!",
      description: "Successfully signed in to your organizer account.",
    });
    // Navigate to dashboard after successful login
    // navigate("/organizer/dashboard");
  };

  return (
    <AuthLayout
      title="Organizer Sign In"
      subtitle="Access your event management dashboard"
      userType="organizer"
    >
      <AuthForm
        isSignup={false}
        userType="organizer"
        onSubmit={handleLogin}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/organizer/signup")}
            className="text-purple-400 hover:text-purple-300 p-0"
          >
            Sign up here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OrganizerLogin;
