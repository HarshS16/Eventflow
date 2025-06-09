
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Zap, 
  QrCode, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Globe,
  Target,
  Heart,
  Cloud,
  CloudRain,
  CloudSnow
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

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

  const cloudVariants = {
    animate: {
      x: [0, 100, 0],
      y: [0, -20, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const features = [
    {
      icon: Calendar,
      title: "Smart Event Creation",
      description: "Create and manage events with intelligent templates and automated workflows"
    },
    {
      icon: DollarSign,
      title: "Sponsor Matching",
      description: "AI-powered sponsor discovery and automatic partnership recommendations"
    },
    {
      icon: Users,
      title: "Community Network",
      description: "Connect with communities ready to promote and amplify your events"
    },
    {
      icon: QrCode,
      title: "QR Ticketing",
      description: "Seamless ticket generation, distribution, and validation system"
    },
    {
      icon: MessageSquare,
      title: "Automated Communication",
      description: "Smart messaging system for participants, sponsors, and communities"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Real-time insights and performance metrics for all your events"
    }
  ];

  const userTypes = [
    {
      title: "Event Organizers",
      subtitle: "Focus on creating amazing experiences",
      benefits: [
        "End-to-end event management",
        "Automated sponsor discovery",
        "Community outreach handled",
        "Real-time participant updates"
      ],
      icon: Sparkles,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      title: "Sponsors",
      subtitle: "Discover the perfect promotional opportunities",
      benefits: [
        "Curated event recommendations",
        "Direct organizer connections",
        "Performance analytics",
        "Brand visibility tracking"
      ],
      icon: Target,
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      title: "Communities",
      subtitle: "Monetize your audience engagement",
      benefits: [
        "Exclusive event partnerships",
        "Revenue sharing programs",
        "Content creation tools",
        "Community growth insights"
      ],
      icon: Heart,
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={cloudVariants}
          animate="animate"
          className="absolute top-20 left-10 text-purple-400/20"
        >
          <Cloud size={80} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "5s" }}
          className="absolute top-40 right-20 text-blue-400/20"
        >
          <CloudRain size={60} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "10s" }}
          className="absolute bottom-40 left-1/4 text-indigo-400/20"
        >
          <CloudSnow size={70} />
        </motion.div>
        <motion.div
          variants={cloudVariants}
          animate="animate"
          style={{ animationDelay: "15s" }}
          className="absolute top-60 right-1/3 text-purple-400/20"
        >
          <Cloud size={90} />
        </motion.div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative px-6 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <Badge variant="outline" className="bg-purple-600/20 border-purple-400/30 text-purple-200 mb-6">
              <Zap className="w-4 h-4 mr-2" />
              The Future of Event Management
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent"
          >
            Events Made
            <motion.span 
              className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Effortless
            </motion.span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The complete platform connecting organizers, sponsors, and communities. 
            From event creation to execution, we handle everything so you can focus on what matters most.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg group shadow-lg shadow-purple-500/25" 
                onClick={() => navigate('/organizer/signup')}
              >
                Start Your Event
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20 px-8 py-4 text-lg">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="px-6 py-20 bg-gradient-to-r from-slate-900/50 to-purple-900/50 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Streamline your entire event lifecycle with our comprehensive suite of tools
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full group shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-purple-200 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* User Types Section */}
      <motion.section 
        className="px-6 py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Built for Every Stakeholder
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Whether you're organizing, sponsoring, or promoting - we've got you covered
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 h-full relative overflow-hidden group shadow-xl shadow-purple-500/20">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.gradient}`} />
                  
                  <CardHeader className="pb-4">
                    <motion.div 
                      className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <type.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-white text-2xl">{type.title}</CardTitle>
                    <CardDescription className="text-purple-200 text-lg">
                      {type.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {type.benefits.map((benefit, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-center text-purple-100"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="space-y-2">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button 
                          className={`w-full bg-gradient-to-r ${type.gradient} hover:opacity-90 text-white shadow-lg`}
                          onClick={() => {
                            const userTypeMap = {
                              "Event Organizers": "organizer",
                              "Sponsors": "sponsor", 
                              "Communities": "community"
                            };
                            const userTypeKey = userTypeMap[type.title as keyof typeof userTypeMap];
                            navigate(`/${userTypeKey}/signup`);
                          }}
                        >
                          Get Started
                        </Button>
                      </motion.div>
                      <Button 
                        variant="ghost" 
                        className="w-full text-purple-200 hover:text-white hover:bg-purple-600/20"
                        onClick={() => {
                          const userTypeMap = {
                            "Event Organizers": "organizer",
                            "Sponsors": "sponsor", 
                            "Communities": "community"
                          };
                          const userTypeKey = userTypeMap[type.title as keyof typeof userTypeMap];
                          navigate(`/${userTypeKey}/login`);
                        }}
                      >
                        Sign In
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-6 py-20 bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-16 h-16 text-purple-400 mx-auto mb-8" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Ready to Transform Your Events?
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Join thousands of organizers who are already creating unforgettable experiences with our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg group shadow-lg shadow-purple-500/25"
                  onClick={() => navigate('/organizer/signup')}
                >
                  Get Started Free
                  <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="border-purple-400/30 text-purple-200 hover:bg-purple-600/20 px-12 py-4 text-lg">
                  Schedule Demo
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900/80 border-t border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-purple-200">
            © 2024 EventFlow. Building the future of event management.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
