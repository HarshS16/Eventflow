
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const CommunitySignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Community signup data:", data);
    toast({
      title: "Account Created!",
      description: "Welcome to EventFlow! Start monetizing your community engagement.",
    });
    // Navigate to dashboard after successful signup
    // navigate("/community/dashboard");
  };

  return (
    <AuthLayout
      title="Join as Community Partner"
      subtitle="Monetize your audience engagement"
      userType="community"
    >
      <AuthForm
        isSignup={true}
        userType="community"
        onSubmit={handleSignup}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/community/login")}
            className="text-green-400 hover:text-green-300 p-0"
          >
            Sign in here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default CommunitySignup;
