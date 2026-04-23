"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

// Custom Cursor Component
const CustomCursor = () => {
  useEffect(() => {
    const outer = document.getElementById('cursor-outer');
    const dot = document.getElementById('cursor-dot');
    
    if (!outer || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outerX = mouseX;
    let outerY = mouseY;
    let isHovering = false;
    let isMouseDown = false;
    let isDark = false;
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' || 
          e.target.closest('a') || 
          e.target.closest('button') || 
          e.target.closest('.nav-pill') || 
          e.target.closest('.cta-btn')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
      
      const darkSection = e.target.closest('#expertise');
      const heroSection = e.target.closest('#hero');
      isDark = !!darkSection || !!heroSection;
      
      updateStyles();
    };

    const handleMouseDown = () => { isMouseDown = true; updateStyles(); };
    const handleMouseUp = () => { isMouseDown = false; updateStyles(); };

    const updateStyles = () => {
      // Scale
      if (isMouseDown) {
        outer.style.transform = `translate(-50%, -50%) scale(0.7)`;
      } else if (isHovering) {
        outer.style.transform = `translate(-50%, -50%) scale(2.2)`;
      } else {
        outer.style.transform = `translate(-50%, -50%) scale(1)`;
      }

      // Colors
      if (isDark) {
        outer.style.borderColor = '#E9E7E0';
        dot.style.backgroundColor = '#E9E7E0';
        if (isHovering && !isMouseDown) {
          outer.style.backgroundColor = 'rgba(233,231,224,0.1)';
        } else {
          outer.style.backgroundColor = 'transparent';
        }
      } else {
        outer.style.borderColor = '#1B3A2D';
        dot.style.backgroundColor = '#1B3A2D';
        if (isHovering && !isMouseDown) {
          outer.style.backgroundColor = 'rgba(27,58,45,0.1)';
        } else {
          outer.style.backgroundColor = 'transparent';
        }
      }
    };

    function lerp(a, b, n) { 
      return (1 - n) * a + n * b;
    }
    
    let reqId;
    function animateCursor() {
      outerX = lerp(outerX, mouseX, 0.1);
      outerY = lerp(outerY, mouseY, 0.1);
      outer.style.left = outerX + 'px';
      outer.style.top = outerY + 'px';
      reqId = requestAnimationFrame(animateCursor);
    }
    animateCursor();

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(reqId);
    };
  }, []);

  return (
    <>
      <div id="cursor-outer"></div>
      <div id="cursor-dot"></div>
    </>
  );
};

// Navigation Component
const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll("section").forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const isHero = activeSection === "hero" || activeSection === "";

  return (
    <>
      <motion.nav 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-[6vw] md:py-8 flex justify-between items-center transition-all duration-300 ${!isHero && isScrolled ? 'bg-[#E9E7E0]/85 backdrop-blur-[12px]' : 'bg-transparent'}`}
      >
        <div className="flex gap-2">
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden nav-pill ${isHero ? 'hero-pill' : ''}`}
            onClick={() => setIsMenuOpen(true)}
          >
            Menu
          </button>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-2">
            {['about', 'track-record', 'expertise'].map((item) => {
              const isActive = activeSection === item;
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`nav-pill ${isHero ? 'hero-pill' : ''} ${isActive && !isHero ? 'active' : ''}`}
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              );
            })}
          </div>
        </div>
        <button 
          onClick={() => scrollTo('contact')} 
          className={`cta-btn ${isHero ? 'hero-btn' : ''}`}
        >
          Contact
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#1B3A2D] flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-6 right-6 text-white nav-pill !border-white !text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
            <div className="flex flex-col gap-[48px] text-center">
              {['about', 'track-record', 'expertise', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-white font-inter font-bold text-[28px] uppercase tracking-wide"
                >
                  {item.split('-').join(' ')}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// FadeUp Container (staggered)
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`hw-accel ${className}`}
  >
    {children}
  </motion.div>
);

// Hero Section
const Hero = () => {
  const heroRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const subtextRef = useRef(null);
  const bgRef = useRef(null);

  const { scrollY } = useScroll();
  
  // Portrait parallax
  const yPhoto = useTransform(scrollY, (latest) => latest * 0.4);

  // Text parallax and fade
  const xHarshil = useTransform(scrollY, (latest) => {
    if (typeof window === 'undefined') return 0;
    const start = window.innerHeight * 0.5;
    const end = window.innerHeight * 0.6;
    if (latest < start) return 0;
    return Math.max(-120, -((latest - start) / (end - start)) * 120);
  });

  const xRaj = useTransform(scrollY, (latest) => {
    if (typeof window === 'undefined') return 0;
    const start = window.innerHeight * 0.5;
    const end = window.innerHeight * 0.6;
    if (latest < start) return 0;
    return Math.min(120, ((latest - start) / (end - start)) * 120);
  });

  const opacityHero = useTransform(scrollY, (latest) => {
    if (typeof window === 'undefined') return 1;
    const start = window.innerHeight * 0.5;
    const end = window.innerHeight * 0.6;
    if (latest < start) return 1;
    return Math.max(0, 1 - (latest - start) / (end - start));
  });

  useEffect(() => {
    const splitText = (element) => {
      if (!element) return [];
      const text = element.innerText;
      element.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(60px)";
        span.style.display = "inline-block";
        element.appendChild(span);
      });
      return element.querySelectorAll("span");
    };

    const chars1 = splitText(textRef1.current);
    const chars2 = splitText(textRef2.current);

    gsap.to(chars1, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "expo.out",
      delay: 0.2
    });

    gsap.to(chars2, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.05,
      ease: "expo.out",
      delay: 0.5
    });

    gsap.to(subtextRef.current, {
      opacity: 0.8,
      y: 0,
      duration: 1.2,
      ease: "expo.out",
      delay: 0.8
    });
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full bg-[#1B3A2D] overflow-hidden">
      <motion.div 
        ref={bgRef}
        className="absolute inset-0 z-0 hw-accel" 
        style={{ 
          backgroundImage: "url('/harshil.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "80% center",
          y: yPhoto
        }}
      />
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0) 100%)" }}
      />
      
      <div className="w-full relative z-20 h-full hw-accel">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-full relative">
          <motion.h1 
            ref={textRef1} 
            style={{ x: xHarshil, opacity: opacityHero }}
            className="text-hero text-white absolute left-[48px] bottom-[220px] z-20 m-0"
          >
            HARSHIL
          </motion.h1>
          
          <div 
            ref={subtextRef}
            className="absolute left-[48px] bottom-[160px] z-20"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <p className="text-white/60 text-[22px] md:text-[24px] leading-[1.7] text-left font-inter tracking-wide whitespace-nowrap">
              AI x Growth
            </p>
          </div>

          <motion.h1 
            ref={textRef2} 
            style={{ x: xRaj, opacity: opacityHero }}
            className="text-hero text-white absolute right-[15%] bottom-[40px] text-right z-20 m-0"
          >
            RAJ
          </motion.h1>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full h-full relative">
          <h1 className="absolute top-[120px] left-[24px] text-[52px] font-inter font-medium text-white leading-none tracking-[-0.03em]">
            <div ref={textRef1}>HARSHIL</div>
          </h1>
          <h1 className="absolute bottom-[40px] right-[-60px] text-[52px] font-inter font-medium text-white leading-none tracking-[-0.03em] text-right">
            <div ref={textRef2}>RAJ</div>
          </h1>
        </div>
      </div>
    </section>
  );
};

// Infinity Loop Divider
const InfinitySvg = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div className="w-[80px] md:w-[80px] mx-auto my-[40px] md:my-[40px] flex justify-center" ref={ref}>
      <svg width="80" height="32" viewBox="0 0 120 40" className="stroke-[#1B3A2D] fill-none stroke-[1.2px]">
        <motion.path 
          d="M10,20 C10,5 50,5 60,20 C70,35 110,35 110,20 C110,5 70,5 60,20 C50,35 10,35 10,20 Z" 
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
    </div>
  );
};



// About Section
const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate breathing effect progress based on document scroll
      const docHeight = document.body.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(window.scrollY / docHeight);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="about" className="bg-[#E9E7E0] pt-[110px] pb-[80px] px-[6vw] relative z-20">
      <FadeUp delay={0.12}>
        <h2 className="text-display text-[#1B3A2D] mb-[56px] leading-[1.05] w-full block tracking-[-0.03em] max-w-full">
          Growth x Entrepreneurship
        </h2>
      </FadeUp>
      
      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] items-start w-full">
        <FadeUp delay={0.24} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60]">
            <p>
              Most people treat AI as a tool. I treat it as infrastructure. The difference is compounding returns versus one-time productivity gains. I build systems where AI creates actual leverage rather than just adding distraction.
            </p>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.36} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60]">
            <p>
              My focus sits at a specific intersection: AI systems, go-to-market strategy, and distribution. These three things compound each other. I work with founders and teams who want to move decisively, not just experiment.
            </p>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.48}>
        <div className="mt-[80px] flex justify-between items-end w-full border-b border-[#1B3A2D]/20 pb-[40px]">
          <div className="flex flex-col items-start hw-accel" style={{ transform: `translateX(${-scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE APPROACH</span>
            <span className="font-inter font-extrabold text-[48px] md:text-[clamp(56px,7vw,100px)] text-[#1B3A2D] tracking-[-0.03em] leading-none">SYSTEMS</span>
          </div>
          
          <div className="flex flex-col items-end hw-accel" style={{ transform: `translateX(${scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE GOAL</span>
            <span className="font-inter font-extrabold text-[48px] md:text-[clamp(56px,7vw,100px)] text-[#1B3A2D] tracking-[-0.03em] leading-none text-right">GROWTH</span>
          </div>
        </div>
      </FadeUp>

      <InfinitySvg />
    </section>
  );
};

// Track Record Section
const TrackRecord = () => {
  return (
    <section id="track-record" className="bg-[#e8e4db] pt-[80px] pb-[100px] px-[6vw] relative z-20">
      <FadeUp delay={0.12}>
        <div className="mb-[64px]">
          <span className="font-inter font-normal text-[12px] text-[#1B3A2D] uppercase tracking-[0.2em] mb-4 block"></span>
          <h2 className="text-[32px] md:text-[40px] font-inter font-extrabold text-[#1B3A2D] leading-[1.1] mb-4">
            Built across<br/>roles that ship.
          </h2>
          <p className="font-inter font-light text-[15px] md:text-[17px] text-[#6B6B60] max-w-[540px]">
            From inside a startup to running my own company - here's what I've done and what I took away from it.
          </p>
        </div>
      </FadeUp>

      <div className="w-full flex flex-col">
        {[
          { role: "Project Manager", org: "Tech Startup", desc: "Learned how product decisions get made under real constraints. Instinct for what actually ships." },
          { role: "Founder", org: "Livo (Founded)", desc: "Built and ran a tech services company. Closed deals, delivered projects, managed client relationships end to end." },
          { role: "Creator & Consultant", org: "LinkedIn 8.9K+", desc: "Building the next chapter in public. Consulting with early-stage teams on AI strategy and GTM systems." }
        ].map((item, idx) => (
          <FadeUp key={idx} delay={0.24 + (idx * 0.12)}>
            <div className={`grid grid-cols-1 md:grid-cols-[280px_1fr] py-[32px] md:py-[40px] border-b border-[#1B3A2D]/10 ${idx === 0 ? 'border-t' : ''}`}>
              <div className="mb-4 md:mb-0">
                <h4 className="text-[22px] md:text-[24px] font-extrabold font-inter text-[#1B3A2D] leading-tight">
                  {item.role}
                </h4>
              </div>
              <div className="font-inter">
                <span className="text-[13px] md:text-[14px] font-semibold text-[#1B3A2D]/80 uppercase tracking-wider block mb-2">{item.org}</span>
                <p className="text-[15px] md:text-[17px] font-light text-[#6B6B60] leading-[1.6] max-w-[600px] opacity-90">
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
};

// Expertise Section
const Expertise = () => {
  return (
    <section id="expertise" className="bg-[#0D0D0D] pt-[120px] pb-[120px] px-[6vw] text-[#E9E7E0] w-full mt-[-60px] pt-[120px] relative z-30">
      <FadeUp delay={0.12}>
        <h2 className="text-[32px] md:text-[clamp(44px,5.5vw,80px)] font-inter font-extrabold tracking-[-0.03em] mb-[64px] leading-none text-[#E9E7E0] w-full">
          WANT YOUR GROWTH × 10?
        </h2>
      </FadeUp>

      <FadeUp delay={0.24} className="w-full">
        <div className="w-full border-y border-[#2A2A2A]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {[
              { title: "AI Systems & Workflows", desc: "Agents, automations, and multi-model workflows built around business outcomes, not demos." },
              { title: "GTM Strategy", desc: "Building GTM engines that are repeatable, measurable, and designed to accelerate as you learn." },
              { title: "Growth & Distribution", desc: "Channel strategies and content playbooks that convert attention into pipeline." },
              { title: "Content & Audience", desc: "8.9K+ LinkedIn followers. Delivering frameworks and observations from the work itself." }
            ].map((item, idx) => (
              <div key={idx} className={`py-[32px] px-[28px] h-full border-b border-[#2A2A2A] md:border-b-0 hover:bg-[#161616] group transition-all duration-220 ease-in-out ${idx !== 3 ? 'md:border-r border-[#2A2A2A]' : ''}`}>
                <h3 className="text-[18px] font-inter font-semibold text-[#FFFFFF] mb-[10px] leading-tight group-hover:text-[#E9E7E0] transition-colors">{item.title}</h3>
                <p className="text-[13px] font-inter font-light text-[#666660] leading-[1.6] mt-[10px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] mt-[64px] w-full">
        <FadeUp delay={0.36} className="w-full md:max-w-[460px]">
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8]">
            I design and deploy AI infrastructure that compounds. The goal is always the same: more output from your team, with less manual overhead. Strategy without execution is expensive guesswork. I close that gap. An AI-powered GTM engine doesn't just grow faster—it grows smarter the longer you run it.
          </p>
        </FadeUp>
        <FadeUp delay={0.48} className="w-full md:max-w-[460px]">
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8]">
            Distribution is the leverage most founders underestimate. I build systems that convert attention into pipeline. If you are building something with real ambition, let's find out if there is a fit.
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="bg-[#E9E7E0] pt-[100px] pb-[60px] px-[6vw] relative w-full overflow-hidden z-20 mt-[-60px]">
      
      <div className="w-full flex flex-col items-start relative z-10">
        <FadeUp delay={0.12}>
          <div className="flex flex-col items-start w-full relative z-10">
            {/* Row 1 */}
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-[16px]">
              Get in touch
            </span>
            
            {/* Row 2: Email and LinkedIn together */}
            <div className="flex items-center gap-[12px]">
              <a href="mailto:harshilraj.growth@gmail.com" className="w-fit border-[1.5px] border-[#1B3A2D] rounded-full px-[24px] py-[10px] font-inter font-medium text-[15px] md:text-[16px] text-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white transition-colors duration-250">
                harshilraj.growth@gmail.com
              </a>
              <a href="https://linkedin.com/in/harshilraj" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-[#1B3A2D] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-none shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            
            {/* Row 3 */}
            <p className="font-inter font-light text-[15px] text-[#6B6B60] mt-[24px] leading-[1.6]">
              Consulting, advisory & the occasional full-time role worth taking.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.24} className="w-full">
          {/* Desktop Footer Name */}
          <div className="hidden md:flex justify-between items-end w-full mt-[80px]">
            <h1 className="font-inter font-extrabold text-[clamp(60px,9vw,130px)] text-[#1B3A2D] leading-[0.8] m-0 text-left">HARSHIL</h1>
            <div className="w-[150px] h-[195px] object-cover mx-[4vw] shrink-0 mb-[-5px]">
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/harshil.jpg')" }} />
            </div>
            <h1 className="font-inter font-extrabold text-[clamp(60px,9vw,130px)] text-[#1B3A2D] leading-[0.8] m-0 text-right">RAJ</h1>
          </div>

          {/* Mobile Footer Name */}
          <div className="md:hidden w-full flex flex-col items-center mt-[80px]">
            <h1 className="text-[48px] font-inter font-extrabold text-[#1B3A2D] text-center leading-[0.9] tracking-[-0.03em] mb-6">
              HARSHIL<br/>RAJ
            </h1>
            <div className="w-[100px] h-[130px]">
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/harshil.jpg')" }} />
            </div>
          </div>
        </FadeUp>

        <div className="w-full flex justify-between items-center mt-[40px] pt-[20px] border-t border-[#1B3A2D] text-[13px] font-inter text-[#6B6B60]">
          <span>2026 © Harshil Raj</span>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.075,
      wheelMultiplier: 0.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#E9E7E0] selection:bg-[#1B3A2D] selection:text-white relative font-inter">
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <TrackRecord />
      <Expertise />
      <Contact />
    </main>
  );
}
