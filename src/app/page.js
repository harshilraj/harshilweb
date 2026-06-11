"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";

// Custom Cursor Component
const CustomCursor = () => {
  useEffect(() => {
    document.body.classList.add('custom-cursor-active');
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
      document.body.classList.remove('custom-cursor-active');
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
  const [hasAnimated, setHasAnimated] = useState(false);

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
    const doScroll = () => {
      const element = document.getElementById(id);
      if (window.lenis && element) {
        window.lenis.scrollTo(element, {
          duration: 1.4,
          offset: -80,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      } else if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  const isHero = activeSection === "hero" || activeSection === "";

  // Animation variants
  const navContainer = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: hasAnimated ? 0 : 1.7
      }
    }
  };
  
  const navItem = {
    hidden: { y: hasAnimated ? 0 : -12, opacity: hasAnimated ? 1 : 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { duration: hasAnimated ? 0 : 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <motion.nav 
        variants={navContainer}
        initial="hidden"
        animate="show"
        className={`fixed top-0 left-0 w-full max-w-[100vw] overflow-hidden md:overflow-visible z-50 px-4 py-6 md:px-[6vw] md:py-8 flex justify-between items-center transition-all duration-300 ${!isHero && isScrolled ? 'bg-[#E9E7E0]/85 backdrop-blur-[12px]' : 'bg-transparent'}`}
      >
        <div className="flex gap-2">
          {/* Mobile Menu Button */}
          <motion.button 
            variants={navItem}
            className={`md:hidden nav-pill ${isHero ? 'hero-pill' : ''}`}
            onClick={() => setIsMenuOpen(true)}
          >
            Menu
          </motion.button>
          
          {/* Desktop Links */}
          <div className="hidden md:flex gap-2 mobile-nav-hide">
            {['about', 'track-record', 'expertise'].map((item) => {
              const isActive = activeSection === item;
              return (
                <motion.button
                  variants={navItem}
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`nav-pill ${isHero ? 'hero-pill' : ''} ${isActive && !isHero ? 'active' : ''}`}
                >
                  {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </motion.button>
              );
            })}
          </div>
        </div>
        <motion.button 
          variants={navItem}
          onClick={() => scrollTo('contact')} 
          className={`cta-btn ${isHero ? 'hero-btn' : ''}`}
        >
          Contact
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#1B3A2D] flex flex-col items-center justify-center gap-[40px]"
          >
            <button 
              className="absolute top-6 right-6 text-white nav-pill !border-white !text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Close
            </button>
            {['about', 'track-record', 'expertise', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="text-white font-inter font-bold text-[32px] uppercase tracking-wide"
              >
                {item.split('-').join(' ')}
              </button>
            ))}
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
    const hasAnimated = false; // Always animate because of loader

    const splitText = (element) => {
      if (!element) return [];
      const text = element.innerText;
      element.innerHTML = "";
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        span.style.opacity = hasAnimated ? "1" : "0";
        span.style.transform = hasAnimated ? "translateY(0)" : "translateY(70px)";
        span.style.display = "inline-block";
        element.appendChild(span);
      });
      return element.querySelectorAll("span");
    };

    const chars1 = splitText(textRef1.current);
    const chars2 = splitText(textRef2.current);

    if (!hasAnimated) {
      if (bgRef.current) {
        gsap.set(bgRef.current, { y: 60, opacity: 0 });
        gsap.to(bgRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.inOut",
          delay: 1.3
        });
      }

      gsap.to(chars1, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.055,
        ease: "power3.inOut",
        delay: 1.5
      });

      gsap.to(chars2, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.055,
        ease: "power3.inOut",
        delay: 1.65
      });

      gsap.set(subtextRef.current, { y: 20, opacity: 0 });
      gsap.to(subtextRef.current, {
        opacity: 0.8,
        y: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 1.6
      });
    } else {
      if (bgRef.current) {
        gsap.set(bgRef.current, { y: 0, opacity: 1 });
      }
      gsap.set(subtextRef.current, { y: 0, opacity: 0.8 });
    }
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full bg-[#1B3A2D] overflow-hidden">
      <motion.div 
        ref={bgRef}
        className="absolute inset-0 z-0 hw-accel mobile-hero-bg overflow-hidden" 
        style={{ y: yPhoto }}
      >
        <Image
          src="/harshil.webp"
          alt="Harshil Raj - AI Automation and Cloud Infrastructure Expert"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover object-[80%_center]"
        />
      </motion.div>
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0) 100%)" }}
      />
      
      <div className="w-full relative z-20 h-full hw-accel">
        {/* Desktop Layout */}
        <div className="hidden md:block w-full h-full relative">
          <motion.h2 
            ref={textRef1} 
            style={{ x: xHarshil, opacity: opacityHero }}
            className="text-hero text-white absolute left-[48px] bottom-[220px] z-20 m-0 font-bold"
          >
            HARSHIL
          </motion.h2>
          
          <div 
            ref={subtextRef}
            className="absolute left-[48px] bottom-[160px] z-20"
          >
            <p className="text-white/60 text-[22px] md:text-[24px] leading-[1.7] text-left font-inter tracking-wide whitespace-nowrap">
              AI · Product · GTM
            </p>
          </div>

          <motion.h2 
            ref={textRef2} 
            style={{ x: xRaj, opacity: opacityHero }}
            className="text-hero text-white absolute right-[15%] bottom-[40px] text-right z-20 m-0 font-bold"
          >
            RAJ
          </motion.h2>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full h-full relative">
          <div className="mobile-hero-gradient" />
          
          <motion.div 
            style={{ opacity: opacityHero }}
            className="mobile-hero-subtext"
          >
            <div ref={subtextRef}>AI · Product · GTM</div>
          </motion.div>

          <motion.h2 
            style={{ opacity: opacityHero }}
            className="mobile-hero-name mobile-display-font"
          >
            <div ref={textRef1} style={{ display: 'inline-block' }}>HARSHIL</div><br/>
            <div ref={textRef2} style={{ display: 'inline-block' }}>RAJ</div>
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

// Removed InfinitySvg component

// Marquee Component
const Marquee = () => {
  return (
    <div className="md:hidden mobile-marquee-container">
      <div className="mobile-marquee-content">
        <span className="mobile-marquee-text">AI SYSTEMS · PRODUCT · GO-TO-MARKET · AI SYSTEMS · PRODUCT · GO-TO-MARKET · </span>
        <span className="mobile-marquee-text">AI SYSTEMS · PRODUCT · GO-TO-MARKET · AI SYSTEMS · PRODUCT · GO-TO-MARKET · </span>
      </div>
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
      <FadeUp delay={0.06}>
        <h1 className="font-inter font-semibold text-[13px] md:text-[14px] text-[#6B6B60] uppercase tracking-[0.15em] mb-[16px] block">
          AI Systems & Product Consultant
        </h1>
      </FadeUp>
      <FadeUp delay={0.12}>
        <h2 className="text-display text-[#1B3A2D] mb-[56px] leading-[1.05] w-full block tracking-[-0.03em] max-w-full mobile-about-headline">
          Making Sense of AI.
        </h2>
      </FadeUp>
      
      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] items-start w-full mobile-about-body-cols">
        <FadeUp delay={0.24} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60] mobile-about-body-text">
            <p>
              Most people talk about AI. Few actually know how to build with it, ship it into a product, or turn it into pipeline.
            </p>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.36} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60] mobile-about-body-text">
            <p>
              I work with founders and operators across three areas: AI systems that work in production, product decisions that account for AI properly, and GTM engines that don't need a full sales team.
            </p>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.48}>
        <div className="mt-[80px] flex justify-between items-end w-full border-b border-[#1B3A2D]/20 pb-[40px] mobile-about-labels">
          <div className="flex flex-col items-start hw-accel" style={{ transform: `translateX(${-scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE MISSION</span>
            <span className="font-inter font-bold text-[40px] md:text-[clamp(44px,5vw,80px)] text-[#1B3A2D] tracking-[-0.03em] leading-none mobile-about-systems">AUTOMATE</span>
          </div>
          
          <div className="flex flex-col items-end hw-accel" style={{ transform: `translateX(${scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE RESULT</span>
            <span className="font-inter font-bold text-[40px] md:text-[clamp(44px,5vw,80px)] text-[#1B3A2D] tracking-[-0.03em] leading-none text-right mobile-about-growth">SCALE</span>
          </div>
        </div>
      </FadeUp>
    </section>
  );
};

// Track Record Section
const TrackRecord = () => {
  return (
    <section id="track-record" className="bg-[#e8e4db] pt-[80px] pb-[100px] px-[6vw] relative z-20">
      <FadeUp delay={0.12}>
        <div className="mb-[64px]">
          <div className="mobile-track-pills hidden"></div>
          <span className="font-inter font-normal text-[12px] text-[#1B3A2D] uppercase tracking-[0.2em] mb-4 block"></span>
          <h2 className="text-[32px] md:text-[40px] font-inter font-extrabold text-[#1B3A2D] leading-[1.1] mb-4">
            Built across<br/>every side of the table.
          </h2>
          <p className="font-inter font-light text-[15px] md:text-[17px] text-[#6B6B60] max-w-[540px]">
            From CS + AI/ML foundations to shipping real products for real businesses - here's the journey and what each chapter taught me.
          </p>
        </div>
      </FadeUp>

      <div className="w-full flex flex-col">
        {[
          { role: "Project Manager", org: "Tech Startup", desc: "Sat inside a fast-moving startup and learned how decisions actually get made under pressure. Instinct for what ships and what doesn't." },
          { role: "Founder", org: "Livo", desc: "Built a software and services firm from zero. Delivered apps, web products, and Shopify stores for clients across India. Learned what actually makes a business run." },
          { role: "AI Consultant & Builder", org: "Independent", desc: "Now working with founders and operators who want to use AI properly. Not to cut costs and call it transformation. To build things that actually work." }
        ].map((item, idx) => (
          <FadeUp key={idx} delay={0.24 + (idx * 0.12)}>
            <div className={`grid grid-cols-1 md:grid-cols-[280px_1fr] py-[32px] md:py-[40px] border-b border-[#1B3A2D]/10 ${idx === 0 ? 'border-t' : ''} mobile-track-row track-row`}>
              <div className="mb-4 md:mb-0">
                <h4 className="text-[22px] md:text-[24px] font-extrabold font-inter text-[#1B3A2D] leading-tight mobile-track-role track-row-role">
                  {item.role}
                </h4>
              </div>
              <div className="font-inter mobile-track-company-desc track-row-desc">
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
    <section id="expertise" className="bg-[#0D0D0D] pt-[120px] pb-[120px] px-[6vw] text-[#E9E7E0] w-full mt-[-60px] relative z-30">
      <FadeUp delay={0.12}>
        <h2 className="text-[32px] md:text-[clamp(44px,5.5vw,80px)] font-inter font-extrabold tracking-[-0.03em] mb-[64px] leading-none text-[#E9E7E0] w-full mobile-expertise-headline mobile-display-font">
          What I Work On
        </h2>
      </FadeUp>

      <FadeUp delay={0.24} className="w-full">
        <div className="w-full border-y border-[#2A2A2A] mobile-expertise-grid-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mobile-expertise-grid">
            {[
              { title: "AI Systems", desc: "End-to-end AI workflows built for production. Multi-model pipelines, automation across tools like Make, n8n, and OpenAI, and AI agents that handle real work. Not demos." },
              { title: "Product", desc: "Most product teams are adding AI features without a strategy. I help founders and PMs decide what to build, what to ignore, and how to ship AI into products that people actually use." },
              { title: "Go-To-Market", desc: "A GTM engine that runs on AI: content systems, outreach workflows, and pipeline generation without a large team. Built for founders who are selling and building at the same time." },
              { title: "Writing & Ideas", desc: "9,400+ followers on LinkedIn. I share what I'm actually building, thinking, and learning across AI, product, and GTM. No fluff. Follow along or steal what works." }
            ].map((item, idx) => (
              <div key={idx} className={`py-[32px] px-[28px] h-full border-b border-[#2A2A2A] md:border-b-0 hover:bg-[#161616] group transition-all duration-220 ease-in-out ${idx !== 3 ? 'md:border-r border-[#2A2A2A]' : ''} mobile-expertise-item`}>
                <h3 className="text-[18px] font-inter font-semibold text-[#FFFFFF] mb-[10px] leading-tight group-hover:text-[#E9E7E0] transition-colors mobile-expertise-item-label">{item.title}</h3>
                <p className="text-[13px] font-inter font-light text-[#666660] leading-[1.6] mt-[10px] mobile-expertise-item-sub">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] mt-[64px] w-full mobile-expertise-body">
        <FadeUp delay={0.36} className="w-full md:max-w-[460px]">
          <h3 className="font-inter font-bold text-[20px] text-[#E9E7E0] mb-4">AI only compounds if you use it right.</h3>
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8]">
            Most AI implementations fail quietly. Wrong tool, wrong use case, no one who actually understands how the pieces connect.
          </p>
        </FadeUp>
        <FadeUp delay={0.48} className="w-full md:max-w-[460px]">
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8] mb-4">
            I've been the PM who shipped under pressure, the founder who figured out what a business actually needs, and the builder who made it work. That combination is rare.
          </p>
          <p className="font-inter font-medium text-[16px] text-[#E9E7E0] leading-[1.8]">
            If you're building something real and want someone who can help you think clearly about AI, reach out.
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

// Dynamic Terminal Console Simulator for Selected Systems
const TerminalConsole = ({ sysId }) => {
  const [logs, setLogs] = useState([]);
  
  const pipelineLogs = [
    { type: 'cmd', text: 'gtm --init --target=icp_leads' },
    { type: 'info', text: 'Initializing prospecting workflow engine...' },
    { type: 'ok', text: 'Apollo API connected. Querying ICP parameters...' },
    { type: 'ok', text: 'Clay DB sync complete. Found 142 companies.' },
    { type: 'info', text: 'Running multi-source data enrichment...' },
    { type: 'ok', text: 'Enriched 118 records with verified business emails.' },
    { type: 'info', text: 'Analyzing intent signals using Claude-3.5-Sonnet...' },
    { type: 'warn', text: 'Scoring leads: 42 contacts marked High Intent (>8.5).' },
    { type: 'info', text: 'Writing custom personalization hooks via OpenAI...' },
    { type: 'success', text: 'Syncing CRM: 42 leads pushed to HubSpot.' },
    { type: 'success', text: 'Slack alert sent. Engine running in background.' }
  ];

  const frontDeskLogs = [
    { type: 'cmd', text: 'retell --monitor-sip-pipe' },
    { type: 'info', text: 'Twilio SIP Trunk connected. Status: LISTENING...' },
    { type: 'warn', text: 'INCOMING CALL: +1 (302) 555-0142 (Inquiry)...' },
    { type: 'info', text: 'Connecting Retell AI voice agent (latency: 120ms)...' },
    { type: 'ok', text: 'Caller: "Looking to understand automation options."' },
    { type: 'info', text: 'Intent parsing: Pricing inquiry & Calendar lookup.' },
    { type: 'ok', text: 'Agent: "We offer custom builds. Let\'s schedule a call."' },
    { type: 'ok', text: 'Caller: "Sure, tomorrow at 10 AM works."' },
    { type: 'info', text: 'Querying Cal.com API... Slot verified.' },
    { type: 'success', text: 'Booking created. Invite sent to caller.' },
    { type: 'success', text: 'Call completed. Duration: 02m 14s. SIP idle.' }
  ];

  const opsLogs = [
    { type: 'cmd', text: 'n8n --listen-webhooks --channel=stripe' },
    { type: 'info', text: 'Webhook received: Stripe Checkout Completed.' },
    { type: 'ok', text: 'PostgreSQL: Customer status updated to "active".' },
    { type: 'info', text: 'Provisioning AWS EC2 sandbox environment...' },
    { type: 'ok', text: 'EC2 Instance i-03f9a28c launched in ap-south-1.' },
    { type: 'info', text: 'Injecting custom agent configurations...' },
    { type: 'ok', text: 'Docker stack initialized (Redis, Python, API).' },
    { type: 'success', text: 'Provisioning success. Onboarding email sent.' },
    { type: 'success', text: 'Workflow run #9283 finished. CPU: 0.02s.' }
  ];

  const currentLogs = sysId === 'SYS-01' ? pipelineLogs : sysId === 'SYS-02' ? frontDeskLogs : opsLogs;

  useEffect(() => {
    setLogs([]);
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < currentLogs.length) {
        setLogs(prev => [...prev, currentLogs[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [sysId]);

  return (
    <div className="w-full h-full p-6 font-mono text-[11px] md:text-[12px] bg-[#090909]/95 text-[#A0A090] overflow-y-auto min-h-[300px] select-none rounded-b-2xl">
      <div className="flex flex-col gap-1.5">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 leading-relaxed">
            {log.type === 'cmd' && <span className="text-[#10B981] font-bold">&gt;</span>}
            {log.type === 'info' && <span className="text-[#8C8C80]">[SYSTEM]</span>}
            {log.type === 'ok' && <span className="text-[#3B82F6]">[OK]</span>}
            {log.type === 'warn' && <span className="text-[#F59E0B]">[WARN]</span>}
            {log.type === 'success' && <span className="text-[#10B981]">[SUCCESS]</span>}
            <span className={log.type === 'cmd' ? 'text-white font-medium' : log.type === 'success' ? 'text-[#D0FFD0]' : ''}>
              {log.text}
            </span>
          </div>
        ))}
        <span className="inline-block w-1.5 h-3.5 bg-[#10B981] animate-pulse ml-0.5" />
      </div>
    </div>
  );
};

const Systems = () => {
  const list = [
    {
      sysId: "SYS-01",
      visualId: "SYSTEM_CONSOLE // REVENUE_PIPELINE",
      title: "Revenue Pipeline Engine",
      desc: "An automated prospecting system that continuously discovers, enriches, and qualifies opportunities so outbound never runs dry.",
      stack: "n8n, Clay, OpenAI, Apollo",
      perf: "10,000+ leads processed monthly",
      challenge: "Manual prospecting consumed hours per week and made a consistent pipeline of qualified opportunities nearly impossible to maintain.",
      outcome: "A repeatable acquisition engine that identifies prospects, enriches company data, and routes qualified leads into the sales workflow."
    },
    {
      sysId: "SYS-02",
      visualId: "SYSTEM_CONSOLE // FRONT_OFFICE",
      title: "Always-On Front Desk",
      desc: "An AI powered intake system that responds instantly, qualifies inquiries, and books appointments at any hour, without a human in the loop.",
      stack: "Retell AI, OpenAI, Make, Twilio",
      perf: "99.9% uptime, 24/7/365 coverage",
      challenge: "Missed calls and delayed responses were costing real opportunities while creating overhead that didn't need to exist.",
      outcome: "A 24/7 front office layer that captures inquiries, handles common questions, and schedules appointments without touching a calendar."
    },
    {
      sysId: "SYS-03",
      visualId: "SYSTEM_CONSOLE // OPERATIONS_LAYER",
      title: "Autonomous Operations Layer",
      desc: "A connected ecosystem of AI workflows that runs the repetitive work across teams and systems automatically.",
      stack: "Node.js, PostgreSQL, Make, n8n",
      perf: "Cross-platform real-time sync",
      challenge: "Teams were losing hours to manual coordination, follow-ups, and data entry that required no real thinking.",
      outcome: "Business critical workflows run on their own. Manual effort drops. Teams redirect time to work that actually requires a human."
    }
  ];

  return (
    <section id="systems" className="bg-[#0D0D0D] pt-[120px] pb-[120px] px-[6vw] text-[#E9E7E0] w-full mt-[-60px] relative z-30 border-t border-[#2A2A2A]">
      <div className="w-full max-w-[1200px] mx-auto">
        <FadeUp delay={0.12}>
          <span className="font-inter font-normal text-[12px] text-[#A0A090] uppercase tracking-[0.2em] mb-4 block">
            SELECTED SYSTEMS
          </span>
          <h2 className="text-[32px] md:text-[clamp(44px,5.5vw,80px)] font-inter font-extrabold tracking-[-0.03em] mb-4 leading-none text-[#E9E7E0]">
            Systems that do the work.
          </h2>
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8] max-w-[640px]">
            Real-world AI and automation infrastructure built to eliminate operational drag, not demos, not prototypes.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-24 w-full mt-20">
          {list.map((system, idx) => (
            <div
              key={idx}
              className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center w-full pb-16 border-b border-[#2A2A2A] last:border-0 last:pb-0 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Interactive CSS Terminal Console */}
              <FadeUp delay={0.2} className="w-full lg:w-1/2">
                <div className="w-full rounded-2xl border border-[#2A2A2A] bg-white/[0.01] overflow-hidden group hover:border-[#10B981]/30 transition-all duration-300">
                  <div className="flex justify-between items-center px-4 py-3 bg-[#161616]/60 border-b border-[#2A2A2A]">
                    <span className="font-mono text-[10px] text-[#8C8C80] tracking-wider uppercase">
                      {system.visualId}
                    </span>
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2A2A2A]" />
                    </div>
                  </div>
                  <TerminalConsole sysId={system.sysId} />
                </div>
              </FadeUp>

              {/* Specs & Description Panel */}
              <FadeUp delay={0.3} className="w-full lg:w-1/2 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[11px] text-[#10B981] font-bold tracking-widest uppercase bg-[#10B981]/10 px-2.5 py-1 rounded">
                    {system.sysId}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                    </span>
                    <span className="font-mono text-[10px] text-[#8C8C80] uppercase tracking-wider">
                      ACTIVE // LIVE_METRICS
                    </span>
                  </div>
                </div>

                <h3 className="text-[24px] md:text-[28px] font-inter font-extrabold text-white mb-4 leading-tight">
                  {system.title}
                </h3>
                
                <p className="text-[15px] text-[#A0A090] font-light leading-[1.7] mb-6">
                  {system.desc}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4 border border-[#2A2A2A] bg-white/[0.01] rounded-xl p-4 mb-6">
                  <div>
                    <span className="font-mono text-[10px] text-[#666660] uppercase tracking-wider block mb-0.5">
                      CORE STACK
                    </span>
                    <span className="text-[13px] text-white font-medium">
                      {system.stack}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-[#666660] uppercase tracking-wider block mb-0.5">
                      PERFORMANCE
                    </span>
                    <span className="text-[13px] text-white font-medium">
                      {system.perf}
                    </span>
                  </div>
                </div>

                {/* Challenge & Outcome */}
                <div className="space-y-3 pt-4 border-t border-[#2A2A2A]">
                  <p className="text-[14px] text-[#A0A090] font-light leading-[1.6]">
                    <strong className="text-[#F59E0B] font-medium font-inter">Challenge: </strong>
                    {system.challenge}
                  </p>
                  <p className="text-[14px] text-[#A0A090] font-light leading-[1.6]">
                    <strong className="text-[#10B981] font-medium font-inter">Outcome: </strong>
                    {system.outcome}
                  </p>
                </div>
              </FadeUp>
            </div>
          ))}
        </div>

        <FadeUp delay={0.6} className="mt-20 text-center">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (window.lenis && element) {
                window.lenis.scrollTo(element, {
                  duration: 1.4,
                  offset: -80,
                  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              } else if (element) {
                window.scrollTo({
                  top: element.offsetTop - 80,
                  behavior: 'smooth'
                });
              }
            }}
            className="font-inter font-light text-[14px] text-[#A0A090] hover:text-[#10B981] underline transition-colors"
          >
            Every system above is available as a standalone engagement.
          </a>
        </FadeUp>
      </div>
    </section>
  );
};

// Common Questions (FAQ) Component
const FAQ = () => {
  const faqs = [
    {
      q: "What does \"making sense of AI\" actually mean?",
      a: "Most people are either ignoring AI or implementing it randomly. Making sense of it means knowing which tools actually solve your problem, how to build systems that work in production, and how to integrate AI into your product or GTM without creating more complexity than you started with. That's what I help with."
    },
    {
      q: "Who do you work with?",
      a: "Founders building AI into their product, operators who want to automate real workflows, and startup teams who need someone to think clearly about their AI strategy. Not enterprises, not theory-only engagements."
    },
    {
      q: "What does an engagement typically look like?",
      a: "Usually starts with a 30-minute call to understand the real problem. From there it's either a defined project (build a specific system or workflow), a consulting retainer, or a strategy session. Scope depends on what you actually need."
    },
    {
      q: "Do you only work on technical AI builds?",
      a: "No. About half my work is strategic: figuring out what to build, what to ignore, and how AI fits into the business. The technical build often follows but it doesn't have to."
    },
    {
      q: "How is this different from hiring a freelance developer?",
      a: "A developer builds what you spec. I help you figure out what to spec, whether the approach makes sense, and then build it or direct the build. The thinking is part of the service."
    }
  ];

  return (
    <div className="w-full mt-[80px] border-t border-[#1B3A2D]/10 pt-[60px]">
      <h3 className="font-inter font-extrabold text-[24px] md:text-[32px] text-[#1B3A2D] mb-[32px]">
        Common Questions
      </h3>
      <div className="w-full max-w-[800px] flex flex-col gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-[#1B3A2D]/10 pb-6">
            <h4 className="font-inter font-bold text-[16px] md:text-[18px] text-[#1B3A2D] mb-2">
              {faq.q}
            </h4>
            <p className="font-inter font-light text-[14px] md:text-[15px] text-[#6B6B60] leading-[1.6]">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Section
const Contact = () => {
  return (
    <section id="contact" className="bg-[#E9E7E0] pt-[100px] pb-[60px] px-[6vw] relative w-full overflow-hidden z-20 mt-[-60px]">
      
      <div className="w-full flex flex-col items-start relative z-10">
        <FadeUp delay={0.12}>
          <div className="flex flex-col items-start w-full relative z-10 mobile-contact-block">
            {/* Row 1 */}
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-[16px] mobile-contact-label">
              Let's talk.
            </span>
            <p className="font-inter font-light text-[16px] md:text-[18px] text-[#1B3A2D] mb-[32px] max-w-[500px] leading-[1.5]">
              If you're building something and want to think through the AI layer properly, a 30-minute call is enough to know if there's a fit.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-[12px] mb-[24px] mobile-contact-socials w-full sm:w-auto">
              <a href="https://cal.com/harshil-raj/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center border-[1.5px] border-[#1B3A2D] bg-[#1B3A2D] rounded-full px-[32px] py-[12px] font-inter font-medium text-[15px] md:text-[16px] text-white hover:bg-transparent hover:text-[#1B3A2D] transition-colors duration-250">
                Book a Call
              </a>
              <a href="https://linkedin.com/in/harshilraj" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-center border-[1.5px] border-[#1B3A2D] rounded-full px-[32px] py-[12px] font-inter font-medium text-[15px] md:text-[16px] text-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white transition-colors duration-250">
                DM on LinkedIn
              </a>
            </div>

            
            {/* Row 3 */}
            <p className="font-inter font-light text-[15px] text-[#6B6B60] leading-[1.6]">
              Available for AI systems builds, product consulting, and GTM projects.
            </p>
          </div>
        </FadeUp>

        {/* FAQ Section */}
        <FAQ />

        <FadeUp delay={0.24} className="w-full">
          {/* Desktop Footer Name */}
          <div className="hidden md:flex justify-between items-end w-full mt-[80px]">
            <h2 className="font-inter font-bold text-[clamp(50px,7.5vw,100px)] text-[#1B3A2D] leading-[0.8] m-0 text-left">HARSHIL</h2>
            <div className="w-[150px] h-[195px] relative mx-[4vw] shrink-0 mb-[-5px] overflow-hidden">
               <Image
                 src="/harshil.webp"
                 alt="Harshil Raj"
                 fill
                 sizes="150px"
                 className="object-cover object-center"
               />
            </div>
            <h2 className="font-inter font-bold text-[clamp(50px,7.5vw,100px)] text-[#1B3A2D] leading-[0.8] m-0 text-right">RAJ</h2>
          </div>

          {/* Mobile Footer Name */}
          <div className="md:hidden w-full flex flex-col items-center mobile-footer-names">
            <h2 className="mobile-display-font text-[#1B3A2D] m-0 leading-[0.85] text-left">
              HARSHIL<br/>RAJ
            </h2>
            <div className="mobile-footer-photo relative overflow-hidden">
              <Image
                src="/harshil.webp"
                alt="Harshil Raj"
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
          </div>
        </FadeUp>

        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mt-[40px] pt-[20px] border-t border-[#1B3A2D]/10 text-[13px] font-inter text-[#6B6B60] mobile-footer-copyright gap-4">
          <div className="footer-contact flex gap-4 items-center text-[13px] font-inter text-[#6B6B60]">
            <a href="https://linkedin.com/in/harshilraj" target="_blank" rel="noopener noreferrer" className="hover:text-[#1B3A2D] transition-colors">
              LinkedIn
            </a>
            <span className="opacity-40">•</span>
            <a href="mailto:harshilraj.growth@gmail.com" className="hover:text-[#1B3A2D] transition-colors">
              harshilraj.growth@gmail.com
            </a>
          </div>
          <span>2026 © Harshil Raj</span>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [entranceDone, setEntranceDone] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setEntranceDone(true);
      }, 1000); // 1 sec loader
    }

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
    
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = undefined;
    };
  }, []);

  return (
    <>
      <div className={`entrance-bg ${entranceDone ? 'done' : ''}`}>
        <div className="loader-wrapper">
          <span className="loader-text">Making Sense of AI</span>
          <div className="loader-line-container">
            <div className="loader-line" />
          </div>
        </div>
      </div>
      <main className="bg-[#E9E7E0] selection:bg-[#1B3A2D] selection:text-white relative font-inter">
        <CustomCursor />
        <Navigation />
        <Hero />
        <About />
        <Marquee />
        <TrackRecord />
        <Expertise />
        <Systems />
        <Contact />
      </main>
    </>
  );
}
