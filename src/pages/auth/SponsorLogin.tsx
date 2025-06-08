
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const SponsorLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Sponsor login data:", data);
    toast({
      title: "Welcome back!",
      description: "Successfully signed in to your sponsor account.",
    });
    // Navigate to dashboard after successful login
    // navigate("/sponsor/dashboard");
  };

  return (
    <AuthLayout
      title="Sponsor Sign In"
      subtitle="Access your sponsorship dashboard"
      userType="sponsor"
    >
      <AuthForm
        isSignup={false}
        userType="sponsor"
        onSubmit={handleLogin}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/sponsor/signup")}
            className="text-blue-400 hover:text-blue-300 p-0"
          >
            Sign up here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SponsorLogin;
