
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OrganizerSignup from "./pages/auth/OrganizerSignup";
import OrganizerLogin from "./pages/auth/OrganizerLogin";
import SponsorSignup from "./pages/auth/SponsorSignup";
import SponsorLogin from "./pages/auth/SponsorLogin";
import CommunitySignup from "./pages/auth/CommunitySignup";
import CommunityLogin from "./pages/auth/CommunityLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/organizer/signup" element={<OrganizerSignup />} />
          <Route path="/organizer/login" element={<OrganizerLogin />} />
          <Route path="/sponsor/signup" element={<SponsorSignup />} />
          <Route path="/sponsor/login" element={<SponsorLogin />} />
          <Route path="/community/signup" element={<CommunitySignup />} />
          <Route path="/community/login" element={<CommunityLogin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
