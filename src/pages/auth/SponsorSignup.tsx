
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const SponsorSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Sponsor signup data:", data);
    toast({
      title: "Account Created!",
      description: "Welcome to EventFlow! Start discovering sponsorship opportunities.",
    });
    // Navigate to dashboard after successful signup
    // navigate("/sponsor/dashboard");
  };

  return (
    <AuthLayout
      title="Join as Sponsor"
      subtitle="Discover curated promotional opportunities"
      userType="sponsor"
    >
      <AuthForm
        isSignup={true}
        userType="sponsor"
        onSubmit={handleSignup}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/sponsor/login")}
            className="text-blue-400 hover:text-blue-300 p-0"
          >
            Sign in here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SponsorSignup;
