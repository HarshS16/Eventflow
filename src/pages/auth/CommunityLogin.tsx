
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "@/components/auth/AuthLayout";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { supabase } from "@/integrations/supabase/client";

// const CommunityLogin = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       if (data.user) {
//         toast({
//           title: "Welcome back!",
//           description: "Successfully signed in to your community account.",
//         });
//         navigate("/community/dashboard");
//       }
//     } catch (error: any) {
//       toast({
//         title: "Error",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout
//       title="Community Sign In"
//       subtitle="Access your community partnership dashboard"
//       userType="community"
//     >
//       <form onSubmit={handleLogin} className="space-y-4">
//         <div>
//           <Label htmlFor="email" className="text-white">Email</Label>
//           <Input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="bg-white/5 border-white/10 text-white"
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="password" className="text-white">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="bg-white/5 border-white/10 text-white"
//             required
//           />
//         </div>
//         <Button 
//           type="submit" 
//           className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
//           disabled={loading}
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </Button>
//       </form>
      
//       <div className="mt-6 text-center">
//         <p className="text-gray-400">
//           Don't have an account?{" "}
//           <Button
//             variant="link"
//             onClick={() => navigate("/community/signup")}
//             className="text-green-400 hover:text-green-300 p-0"
//           >
//             Sign up here
//           </Button>
//         </p>
//       </div>
//     </AuthLayout>
//   );
// };

// export default CommunityLogin;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const CommunityLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your community account.",
        });
        navigate("/community/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Community Sign In"
      subtitle="Access your community partnership dashboard"
      userType="community"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-black">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white border-gray-300 text-black"
            required
          />
        </div>
        <div>
          <Label htmlFor="password" className="text-black">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white border-gray-300 text-black"
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Don't have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/community/signup")}
            className="text-green-600 hover:text-green-500 p-0"
          >
            Sign up here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default CommunityLogin;
