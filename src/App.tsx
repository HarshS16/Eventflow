import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComingSoon from "./pages/ComingSoon";
import EventPage from "./pages/EventPage";
import OrganizerSignup from "./pages/auth/OrganizerSignup";
import OrganizerLogin from "./pages/auth/OrganizerLogin";
import SponsorSignup from "./pages/auth/SponsorSignup";
import SponsorLogin from "./pages/auth/SponsorLogin";
import CommunitySignup from "./pages/auth/CommunitySignup";
import CommunityLogin from "./pages/auth/CommunityLogin";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import SponsorDashboard from "./pages/dashboard/SponsorDashboard";
import CommunityDashboard from "./pages/dashboard/CommunityDashboard";
import ParticipantSignup from "./pages/auth/ParticipantSignup";
import ParticipantLogin from "./pages/auth/ParticipantLogin";
import ParticipantDashboard from "./pages/dashboard/ParticipantDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/organizer/signup" element={<OrganizerSignup />} />
            <Route path="/organizer/login" element={<OrganizerLogin />} />
            <Route path="/sponsor/signup" element={<SponsorSignup />} />
            <Route path="/sponsor/login" element={<SponsorLogin />} />
            <Route path="/community/signup" element={<CommunitySignup />} />
            <Route path="/community/login" element={<CommunityLogin />} />
            <Route path="/participant/signup" element={<ParticipantSignup />} />
            <Route path="/participant/login" element={<ParticipantLogin />} />
            <Route 
              path="/organizer/dashboard" 
              element={
                <ProtectedRoute>
                  <OrganizerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sponsor/dashboard" 
              element={
                <ProtectedRoute>
                  <SponsorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/dashboard" 
              element={
                <ProtectedRoute>
                  <CommunityDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participant/dashboard" 
              element={
                <ProtectedRoute>
                  <ParticipantDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/pricing" element={<ComingSoon />} />
            <Route path="/about" element={<ComingSoon />} />
            <Route path="/careers" element={<ComingSoon />} />
            <Route path="/press" element={<ComingSoon />} />
            <Route path="/contact" element={<ComingSoon />} />
            <Route path="/help" element={<ComingSoon />} />
            <Route path="/docs" element={<ComingSoon />} />
            <Route path="/api" element={<ComingSoon />} />
            <Route path="/blog" element={<ComingSoon />} />
            <Route path="/privacy" element={<ComingSoon />} />
            <Route path="/terms" element={<ComingSoon />} />
            <Route path="/cookies" element={<ComingSoon />} />
            <Route path="/security" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
