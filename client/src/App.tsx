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
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Onboarding from "./pages/Onboarding";
import OrganizerDashboard from "./pages/dashboard/OrganizerDashboard";
import SponsorDashboard from "./pages/dashboard/SponsorDashboard";
import CommunityDashboard from "./pages/dashboard/CommunityDashboard";
import ParticipantDashboard from "./pages/dashboard/ParticipantDashboard";
import PromoteEvents from "./pages/community/PromoteEvents";
import EngageCommunity from "./pages/community/EngageCommunity";
import CommunityAnalytics from "./pages/community/CommunityAnalytics";
import ManageSponsors from "./pages/organizer/ManageSponsors";
import OrganizerAnalytics from "./pages/organizer/OrganizerAnalytics";

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
            
            {/* Unified Auth Routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/organizer/dashboard" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/sponsors" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <ManageSponsors />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/organizer/analytics" 
              element={
                <ProtectedRoute requiredRole="organizer">
                  <OrganizerAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/sponsor/dashboard" 
              element={
                <ProtectedRoute requiredRole="sponsor">
                  <SponsorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/dashboard" 
              element={
                <ProtectedRoute requiredRole="community">
                  <CommunityDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/participant/dashboard" 
              element={
                <ProtectedRoute requiredRole="participant">
                  <ParticipantDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Community Sub-Routes */}
            <Route 
              path="/community/promote" 
              element={
                <ProtectedRoute requiredRole="community">
                  <PromoteEvents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/engage" 
              element={
                <ProtectedRoute requiredRole="community">
                  <EngageCommunity />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/community/analytics" 
              element={
                <ProtectedRoute requiredRole="community">
                  <CommunityAnalytics />
                </ProtectedRoute>
              } 
            />
            
            {/* Static Pages */}
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
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
