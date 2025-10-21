import { Card } from "@/components/ui/card";
import { GraduationCap, MapPin, Calendar, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const About = () => {
  const { ref: sectionRef, isRevealed: sectionRevealed } = useScrollReveal();
  
  const details = [
    {
      icon: GraduationCap,
      label: "School",
      value: "Đặng Tấn Tài Secondary School",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Vietnam",
    },
    {
      icon: Calendar,
      label: "Age",
      value: "12 years old",
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent scroll-reveal text-gradient-animated ${sectionRevealed ? 'revealed' : ''}`}>
          <Sparkles className="inline w-6 h-6 md:w-8 md:h-8 mb-2 mr-2 text-primary animate-pulse" />
          About Me
          <Sparkles className="inline w-6 h-6 md:w-8 md:h-8 mb-2 ml-2 text-accent animate-pulse" />
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {details.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <Card
                key={detail.label}
                className={`p-4 md:p-6 text-center backdrop-blur-sm bg-card/80 border-2 gradient-border-animated hover:shadow-2xl transition-all duration-500 hover-lift hover-bounce scroll-reveal-scale ${sectionRevealed ? 'revealed' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mb-3 md:mb-4 hover-rotate">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{detail.label}</p>
                <p className="font-semibold text-base md:text-lg">{detail.value}</p>
              </Card>
            );
          })}
        </div>

        <Card className={`p-6 md:p-8 lg:p-12 backdrop-blur-sm bg-gradient-to-br from-card/90 to-secondary/50 border-2 gradient-border-animated hover:shadow-2xl hover:scale-[1.01] transition-all duration-500 hover-lift scroll-reveal ${sectionRevealed ? 'revealed' : ''}`} style={{ transitionDelay: "300ms" }}>
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg" style={{ background: 'var(--gradient-card)' }} />
          <TooltipProvider>
            <p className="text-base md:text-lg leading-relaxed text-center md:text-left relative z-10">
              Hello! I'm{" "}
              <a 
                href="https://github.com/nguyenidkskibidi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-bold text-primary hover:text-accent transition-colors duration-300 hover:underline"
              >
                Nguyễn Khôi Nguyên
              </a>, 
              a{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://en.wikipedia.org/wiki/Skibidi_Toilet" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors duration-300 hover:underline cursor-help"
                  >
                    "skibidi toilet ohio"
                  </a>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Skibidi Toilet is a machinima web series created by Alexey Gerasimov and released through YouTube videos and Shorts on his channel.</p>
                </TooltipContent>
              </Tooltip>{" "}
              12-year-old student at{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-primary cursor-help border-b border-dotted border-primary">
                    Đặng Tấn Tài Secondary School
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Dang Tan Tai Secondary School (or in Vietnam is: THCS Đặng Tấn Tài). Is a school in Ho Chi Minh City, it got founded in 1980s</p>
                </TooltipContent>
              </Tooltip>{" "}
              in{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-primary cursor-help border-b border-dotted border-primary">
                    Vietnam
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>🇻🇳 Vietnam is a Southeast Asian nation celebrated for its vibrant culture, long history, stunning landscapes, and remarkable transformation from a war-torn past to one of Asia's fastest-growing economies.</p>
                </TooltipContent>
              </Tooltip>. 
              I'm passionate about technology and programming (uhh, i like it when i'm 5 years old hehe :) ), 
              now i'm currently learning{" "}
              <span className="font-semibold text-accent">JavaScript</span> and{" "}
              <span className="font-semibold text-accent">TypeScript</span>. 
              I can speak in both Vietnamese and now i'm just learning English, which helps me access a wide range of 
              learning resources (nvm, i'm bad at these). When I'm not coding, I love watching anime 
              (nuh uh don't trust him), especially Doraemon and Mahiro from Onimai. I believe in continuous learning and 
              I'm excited about building cool projects in the future and i hope i can complete all i want before{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://en.wikipedia.org/wiki/Grand_Theft_Auto_VI" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors duration-300 hover:underline cursor-help"
                  >
                    GTA 6
                  </a>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Grand Theft Auto VI is an upcoming 2026 action-adventure game developed and published by Rockstar Games.</p>
                </TooltipContent>
              </Tooltip>{" "}
              hehe :).
            </p>
          </TooltipProvider>
        </Card>
      </div>
    </section>
  );
};

export default About;
