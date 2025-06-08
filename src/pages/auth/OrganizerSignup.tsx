
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthForm from "@/components/auth/AuthForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (data: any) => {
    // TODO: Integrate with Supabase authentication
    console.log("Organizer signup data:", data);
    toast({
      title: "Account Created!",
      description: "Welcome to EventFlow! Please check your email to verify your account.",
    });
    // Navigate to dashboard after successful signup
    // navigate("/organizer/dashboard");
  };

  return (
    <AuthLayout
      title="Join as Event Organizer"
      subtitle="Create amazing events with our comprehensive platform"
      userType="organizer"
    >
      <AuthForm
        isSignup={true}
        userType="organizer"
        onSubmit={handleSignup}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/organizer/login")}
            className="text-purple-400 hover:text-purple-300 p-0"
          >
            Sign in here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OrganizerSignup;
