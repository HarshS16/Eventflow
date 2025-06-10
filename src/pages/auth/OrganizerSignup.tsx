
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthLayout from "@/components/auth/AuthLayout";
// import { useToast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { supabase } from "@/integrations/supabase/client";

// const OrganizerSignup = () => {
//   const navigate = useNavigate();
//   const { toast } = useToast();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//             user_type: 'organizer'
//           }
//         }
//       });

//       if (error) throw error;

//       if (data.user) {
//         // Update profile with user type
//         await supabase.from('profiles').update({
//           user_type: 'organizer',
//           full_name: fullName
//         }).eq('id', data.user.id);

//         toast({
//           title: "Account Created!",
//           description: "Welcome to EventFlow! Please check your email to verify your account.",
//         });
//         navigate("/organizer/dashboard");
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
//       title="Join as Event Organizer"
//       subtitle="Create amazing events with our comprehensive platform"
//       userType="organizer"
//     >
//       <form onSubmit={handleSignup} className="space-y-4">
//         <div>
//           <Label htmlFor="fullName" className="text-white">Full Name</Label>
//           <Input
//             id="fullName"
//             type="text"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className="bg-white/5 border-white/10 text-white"
//             required
//           />
//         </div>
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
//           className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
//           disabled={loading}
//         >
//           {loading ? "Creating account..." : "Create Account"}
//         </Button>
//       </form>
      
//       <div className="mt-6 text-center">
//         <p className="text-gray-400">
//           Already have an account?{" "}
//           <Button
//             variant="link"
//             onClick={() => navigate("/organizer/login")}
//             className="text-purple-400 hover:text-purple-300 p-0"
//           >
//             Sign in here
//           </Button>
//         </p>
//       </div>
//     </AuthLayout>
//   );
// };

// export default OrganizerSignup;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/auth/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const OrganizerSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: 'organizer'
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        await supabase.from('profiles').update({
          user_type: 'organizer',
          full_name: fullName
        }).eq('id', data.user.id);

        toast({
          title: "Account Created!",
          description: "Welcome to EventFlow! Please check your email to verify your account.",
        });
        navigate("/organizer/dashboard");
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
      title="Join as Event Organizer"
      subtitle="Create amazing events with our comprehensive platform"
      userType="organizer"
    >
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <Label htmlFor="fullName" className="text-black">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-white border-gray-300 text-black"
            required
          />
        </div>
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
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-700">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => navigate("/organizer/login")}
            className="text-purple-600 hover:text-purple-500 p-0"
          >
            Sign in here
          </Button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default OrganizerSignup;
