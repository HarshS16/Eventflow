
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
  Heart
} from "lucide-react";

const Index = () => {
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
      gradient: "from-purple-500 to-pink-500"
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
      gradient: "from-blue-500 to-cyan-500"
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
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative px-6 py-20 lg:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <Badge variant="outline" className="bg-white/5 border-white/20 text-white mb-6">
              <Zap className="w-4 h-4 mr-2" />
              The Future of Event Management
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent"
          >
            Events Made
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Effortless
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            The complete platform connecting organizers, sponsors, and communities. 
            From event creation to execution, we handle everything so you can focus on what matters most.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg group">
              Start Your Event
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="px-6 py-20 bg-black/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
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
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base">
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Built for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Whether you're organizing, sponsoring, or promoting - we've got you covered
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <motion.div
                key={type.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full relative overflow-hidden group">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${type.gradient}`} />
                  
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-2xl">{type.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      {type.subtitle}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3">
                      {type.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="px-6 py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants}>
            <Globe className="w-16 h-16 text-purple-400 mx-auto mb-8" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Events?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of organizers who are already creating unforgettable experiences with our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg group">
                Get Started Free
                <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-12 py-4 text-lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 EventFlow. Building the future of event management.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
