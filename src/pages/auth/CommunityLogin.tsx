
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const CommunityLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Community login data:", data);
    toast({
      title: "Welcome back!",
      description: "Successfully signed in to your community account.",
    });
    // Navigate to dashboard after successful login
    // navigate("/community/dashboard");
  };

  return (
    <AuthLayout
      title="Community Sign In"
      subtitle="Access your community partnership dashboard"
      userType="community"
    >
      <AuthForm
        isSignup={false}
        userType="community"
        onSubmit={handleLogin}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/community/signup")}
            className="text-green-400 hover:text-green-300 p-0"
          >
            Sign up here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default CommunityLogin;
