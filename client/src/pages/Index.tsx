
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Globe, CheckCircle, Star, Cloud, CloudRain, Sparkles, Box, Zap, BarChart3, CreditCard, MessageCircle, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ContactModal from "@/components/ContactModal";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { MagicCard } from "@/components/ui/magic-card";
import { cn } from "@/lib/utils";

const Index = () => {
  const navigate = useNavigate();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const userTypes = [
    {
      title: "Event Organizers",
      description: "Create, manage, and promote your events with powerful tools and seamless sponsor matching.",
      icon: Users,
      color: "from-orange-500 to-pink-500",
      features: ["Event Management", "Sponsor Matching", "Analytics Dashboard", "Ticket Sales"]
    },
    {
      title: "Sponsors",
      description: "Discover meaningful partnership opportunities and connect with events that align with your brand.",
      icon: Target,
      color: "from-pink-500 to-purple-500",
      features: ["Event Discovery", "ROI Tracking", "Brand Exposure", "Partnership Management"]
    },
    {
      title: "Community Partners",
      description: "Amplify local events and strengthen community connections through strategic partnerships.",
      icon: Globe,
      color: "from-purple-500 to-orange-500",
      features: ["Community Events", "Local Networking", "Resource Sharing", "Impact Measurement"]
    },
    {
      title: "Event Participants",
      description: "Discover and register for events that match your interests and connect with communities.",
      icon: Users,
      color: "from-orange-500 to-pink-500",
      features: ["Event Discovery", "Easy Registration", "Personal Dashboard", "Community Connections"]
    }
  ];

  const features = [
    {
      title: "End-to-end event management",
      description: "Comprehensive platform for managing every aspect of your events from planning to execution.",
      icon: Box,
      area: "md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
    },
    {
      title: "AI-powered sponsor matching",
      description: "Smart algorithms connect you with the perfect sponsors aligned with your event goals.",
      icon: Zap,
      area: "md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
    },
    {
      title: "Real-time analytics",
      description: "Track performance metrics and gain insights to optimize your event success.",
      icon: BarChart3,
      area: "md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
    },
    {
      title: "Integrated payments",
      description: "Seamless payment processing with multiple gateways and instant settlements.",
      icon: CreditCard,
      area: "md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
    },
    {
      title: "Community engagement",
      description: "Build stronger connections with attendees through interactive tools and features.",
      icon: MessageCircle,
      area: "md:[grid-area:3/1/4/7] xl:[grid-area:2/8/3/10]"
    },
    {
      title: "QR Ticketing",
      description: "Bulk QR ticketing provided to all the participants of the events",
      icon: Headphones,
      area: "md:[grid-area:3/7/4/13] xl:[grid-area:2/10/3/13]"
    }
  ];

  const cloudVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, -20, 0],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-white via-gray-50 to-white text-black relative overflow-hidden">
        {/* Animated Background Clouds */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            variants={cloudVariants}
            animate="animate"
            className="absolute top-20 left-10 text-orange-500/10"
          >
            <Cloud size={120} />
          </motion.div>
          <motion.div
            variants={cloudVariants}
            animate="animate"
            style={{ animationDelay: "10s" }}
            className="absolute bottom-20 right-10 text-pink-500/10"
          >
            <CloudRain size={100} />
          </motion.div>
          <motion.div
            variants={cloudVariants}
            animate="animate"
            style={{ animationDelay: "20s" }}
            className="absolute top-1/2 left-1/3 text-purple-500/10"
          >
            <Cloud size={150} />
          </motion.div>
          <motion.div
            variants={cloudVariants}
            animate="animate"
            style={{ animationDelay: "15s" }}
            className="absolute bottom-1/3 left-20 text-orange-500/5"
          >
            <CloudRain size={90} />
          </motion.div>
        </div>

        {/* Hero Section */}
        <section id="home" className="relative z-10 py-20 px-3">
          <div className="max-w-[1600px] mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-white border border-gray-200 rounded-full px-6 py-3 mb-8 shadow-sm"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 text-orange-500" />
                <span className="text-gray-700">Connecting Events, Sponsors & Communities</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-clip-text text-transparent">
                Rheo
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                The complete platform connecting organizers, sponsors, and communities for seamless event management and meaningful partnerships.
              </p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg shadow-2xl shadow-orange-500/25 group"
                    onClick={() => navigate("/signup")}
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </Button>
                </motion.div>
                {/* <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                  >
                    Watch Demo
                  </Button>
                </motion.div> */}
                {/* <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                    onClick={() => navigate("/participant/login")}
                  >
                    Participant Login
                  </Button>
                </motion.div> */}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="relative z-10 py-20 px-3">
          <div className="max-w-[1600px] mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Explore Events & Roles
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're organizing, sponsoring, partnering, or participating — jump into the right experience.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {userTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="w-full border-none p-0 shadow-none h-full">
                    <MagicCard
                      gradientColor={index % 2 === 0 ? "rgba(251, 146, 60, 0.3)" : "rgba(236, 72, 153, 0.3)"}
                      gradientSize={300}
                      gradientOpacity={0.6}
                      className="bg-white border border-gray-200 hover:shadow-2xl transition-all h-full shadow-lg"
                    >
                      <CardHeader className="text-center pb-4 border-b border-gray-100">
                        <motion.div 
                          className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl mx-auto mb-4 flex items-center justify-center shadow-lg`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <type.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <CardTitle className="text-2xl text-black mb-2">{type.title}</CardTitle>
                        <CardDescription className="text-gray-600 text-base">
                          {type.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 pt-6">
                        <ul className="space-y-3">
                          {type.features.map((feature, idx) => (
                            <motion.li 
                              key={idx} 
                              className="flex items-center text-gray-700"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </MagicCard>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Single CTA for all roles */}
            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-10 py-4 text-lg shadow-2xl shadow-orange-500/25 group"
                onClick={() => navigate("/signup")}
              >
                Get Started - Choose Your Role
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative z-10 py-20 px-3 bg-[#fafafa]">
          <div className="max-w-[1600px] mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                About Rheo
              </h2>
              <p className="text-xl text-gray-600">
                Rheo brings organizers, sponsors, and communities together with streamlined tools and meaningful insights.
              </p>
            </motion.div>

            <motion.ul 
              className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:grid-rows-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.li 
                  key={index}
                  className={cn("min-h-[14rem] list-none", feature.area)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-gray-300/50 p-2 md:rounded-[1.5rem] md:p-3">
                    <GlowingEffect
                      spread={40}
                      glow={true}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={3}
                    />
                    <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-gray-300/50 bg-white p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
                      <div className="relative flex flex-1 flex-col justify-between gap-3">
                        <div className="w-fit rounded-lg border-[0.75px] border-gray-300/50 bg-gray-100 p-2">
                          <feature.icon className="h-4 w-4 text-gray-700" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-gray-900">
                            {feature.title}
                          </h3>
                          <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-gray-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 py-20 px-3">
          <div className="max-w-[1600px] mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Loved by Teams
              </h2>
              <p className="text-xl text-gray-600">
                See what our users have to say about Rheo
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <StaggerTestimonials />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative z-10 py-20 px-3">
          <motion.div 
            className="max-w-4xl mx-auto text-center bg-white border border-gray-200 rounded-2xl p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-16 h-16 text-orange-500" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Questions or partnerships? Reach out — we’d love to help you create amazing events.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 text-lg shadow-2xl shadow-orange-500/25 group"
                  onClick={() => setIsContactModalOpen(true)}
                >
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </Layout>
  );
};

export default Index;
