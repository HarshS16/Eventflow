
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Globe, CheckCircle, Star, Cloud, CloudRain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Index = () => {
  const navigate = useNavigate();

  const userTypes = [
    {
      title: "Event Organizers",
      description: "Create, manage, and promote your events with powerful tools and seamless sponsor matching.",
      icon: Users,
      color: "from-orange-500 to-pink-500",
      features: ["Event Management", "Sponsor Matching", "Analytics Dashboard", "Ticket Sales"],
      cta: "Start Organizing",
      href: "/organizer/signup"
    },
    {
      title: "Sponsors",
      description: "Discover meaningful partnership opportunities and connect with events that align with your brand.",
      icon: Target,
      color: "from-pink-500 to-purple-500",
      features: ["Event Discovery", "ROI Tracking", "Brand Exposure", "Partnership Management"],
      cta: "Find Opportunities",
      href: "/sponsor/signup"
    },
    {
      title: "Community Partners",
      description: "Amplify local events and strengthen community connections through strategic partnerships.",
      icon: Globe,
      color: "from-purple-500 to-orange-500",
      features: ["Community Events", "Local Networking", "Resource Sharing", "Impact Measurement"],
      cta: "Join Community",
      href: "/community/signup"
    }
  ];

  const features = [
    "End-to-end event management platform",
    "AI-powered sponsor matching",
    "Real-time analytics and insights",
    "Integrated payment processing",
    "Community engagement tools",
    "24/7 customer support"
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Event Organizer",
      company: "TechCorp Events",
      quote: "EventFlow transformed how we manage our conferences. The sponsor matching feature alone saved us months of outreach.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "BrandMax",
      quote: "We've found incredible partnership opportunities through EventFlow. The platform makes it easy to track our ROI.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Community Manager",
      company: "Local Impact",
      quote: "The community features help us amplify local events and create meaningful connections in our neighborhood.",
      rating: 5
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
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
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
                EventFlow
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
                    onClick={() => navigate("/organizer/signup")}
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
                  >
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* User Types Section */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Built for Everyone
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Whether you're organizing events, seeking sponsorships, or building community connections, EventFlow has the tools you need.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
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
                  <Card className="bg-white border border-gray-200 hover:shadow-xl transition-all h-full shadow-lg">
                    <CardHeader className="text-center pb-4">
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
                    <CardContent className="space-y-6">
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
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white shadow-lg`}
                          onClick={() => navigate(type.href)}
                        >
                          {type.cta}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 py-20 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600">
                Powerful features designed to streamline your event management workflow
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="flex items-center space-x-3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-7xl mx-auto">
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
                See what our users have to say about EventFlow
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card className="bg-white border border-gray-200 h-full shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <blockquote className="text-gray-700 mb-4 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div>
                        <div className="font-semibold text-black">{testimonial.name}</div>
                        <div className="text-gray-600 text-sm">{testimonial.role}</div>
                        <div className="text-gray-500 text-sm">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-20 px-6">
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of event organizers, sponsors, and community partners who are already using EventFlow to create amazing experiences.
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
                  onClick={() => navigate("/organizer/signup")}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                >
                  Contact Sales
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
