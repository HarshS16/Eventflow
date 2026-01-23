"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "Rheo transformed how we manage our conferences. The sponsor matching feature alone saved us months of outreach.",
    by: "Sarah Johnson, Event Organizer at TechCorp Events",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
  },
  {
    tempId: 1,
    testimonial: "We've found incredible partnership opportunities through Rheo. The platform makes it easy to track our returns.",
    by: "Michael Chen, Marketing Director at BrandMax",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
  },
  {
    tempId: 2,
    testimonial: "The community features help us amplify local events and create meaningful connections in our neighborhood.",
    by: "Emily Rodriguez, Community Manager at Local Impact",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
  },
  {
    tempId: 3,
    testimonial: "My favorite solution in the market. We work 5x faster with Rheo.",
    by: "Alex Thompson, CEO at EventPro",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
  },
  {
    tempId: 4,
    testimonial: "I'm confident my data is safe with Rheo. I can't say that about other providers.",
    by: "Dan Williams, CTO at SecureNet",
    imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
  },
  {
    tempId: 5,
    testimonial: "I know it's cliche, but we were lost before we found Rheo. Can't thank you guys enough!",
    by: "Stephanie Lee, COO at InnovateCo",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop"
  },
  {
    tempId: 6,
    testimonial: "Rheo's products make planning for the future seamless. Can't recommend them enough!",
    by: "Marie Dubois, CFO at FuturePlanning",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop"
  },
  {
    tempId: 7,
    testimonial: "If I could give 11 stars, I'd give 12.",
    by: "Andre Silva, Head of Design at CreativeSolutions",
    imgSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop"
  },
  {
    tempId: 8,
    testimonial: "SO SO SO HAPPY WE FOUND YOU GUYS!!!! I'd bet you've saved me 100 hours so far.",
    by: "Jeremy Park, Product Manager at TimeWise",
    imgSrc: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop"
  },
  {
    tempId: 9,
    testimonial: "Took some convincing, but now that we're on Rheo, we're never going back.",
    by: "Pam Martinez, Marketing Director at BrandBuilders",
    imgSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop"
  },
  {
    tempId: 10,
    testimonial: "I would be lost without Rheo's in-depth analytics. The ROI is EASILY 100X for us.",
    by: "Daniel Kim, Data Scientist at AnalyticsPro",
    imgSrc: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=150&h=150&fit=crop"
  },
  {
    tempId: 11,
    testimonial: "It's just the best. Period.",
    by: "Fernando Costa, UX Designer at UserFirst",
    imgSrc: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=150&h=150&fit=crop"
  },
  {
    tempId: 12,
    testimonial: "I switched 5 years ago and never looked back.",
    by: "Andy Morrison, DevOps Engineer at CloudMasters",
    imgSrc: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop"
  },
  {
    tempId: 13,
    testimonial: "I've been searching for a solution like Rheo for YEARS. So glad I finally found one!",
    by: "Pete Anderson, Sales Director at RevenueRockets",
    imgSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop"
  },
  {
    tempId: 14,
    testimonial: "It's so simple and intuitive, we got the team up to speed in 10 minutes.",
    by: "Marina Petrov, HR Manager at TalentForge",
    imgSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop"
  },
  {
    tempId: 15,
    testimonial: "Rheo's customer support is unparalleled. They're always there when we need them.",
    by: "Olivia Brown, Customer Success Manager at ClientCare",
    imgSrc: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=150&h=150&fit=crop"
  },
  {
    tempId: 16,
    testimonial: "The efficiency gains we've seen since implementing Rheo are off the charts!",
    by: "Raj Patel, Operations Manager at StreamlineSolutions",
    imgSrc: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=150&h=150&fit=crop"
  },
  {
    tempId: 17,
    testimonial: "Rheo has revolutionized how we handle our workflow. It's a game-changer!",
    by: "Lila Jackson, Workflow Specialist at ProcessPro",
    imgSrc: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop"
  },
  {
    tempId: 18,
    testimonial: "The scalability of Rheo's solution is impressive. It grows with our business seamlessly.",
    by: "Trevor Walsh, Scaling Officer at GrowthGurus",
    imgSrc: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop"
  },
  {
    tempId: 19,
    testimonial: "I appreciate how Rheo continually innovates. They're always one step ahead.",
    by: "Naomi Foster, Innovation Lead at FutureTech",
    imgSrc: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=150&h=150&fit=crop"
  }
];

interface TestimonialCardProps {
  position: number;
  testimonial: typeof testimonials[0];
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter 
          ? "z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-500" 
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-orange-500/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px rgba(0, 0, 0, 0.1)" : "0px 0px 0px 0px transparent"
      }}
    >
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-orange-600" : "bg-gray-200"
        )}
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2
        }}
      />
      <img
        src={testimonial.imgSrc}
        alt={`${testimonial.by.split(',')[0]}`}
        className="mb-4 h-14 w-12 bg-gray-200 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px rgba(255, 255, 255, 0.3)"
        }}
      />
      <h3 className={cn(
        "text-base sm:text-xl font-medium",
        isCenter ? "text-white" : "text-gray-900"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
        isCenter ? "text-white/90" : "text-gray-600"
      )}>
        - {testimonial.by}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-gray-50/50"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-orange-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-200 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:text-white hover:border-orange-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
