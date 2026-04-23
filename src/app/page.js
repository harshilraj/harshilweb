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
            className="text-hero text-white absolute left-[48px] bottom-[220px] z-20 m-0 font-bold"
          >
            HARSHIL
          </motion.h1>
          
          <div 
            ref={subtextRef}
            className="absolute left-[48px] bottom-[160px] z-20"
          >
            <p className="text-white/60 text-[22px] md:text-[24px] leading-[1.7] text-left font-inter tracking-wide whitespace-nowrap">
              AI x Growth
            </p>
          </div>

          <motion.h1 
            ref={textRef2} 
            style={{ x: xRaj, opacity: opacityHero }}
            className="text-hero text-white absolute right-[15%] bottom-[40px] text-right z-20 m-0 font-bold"
          >
            RAJ
          </motion.h1>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden w-full h-full relative">
          <div className="mobile-hero-gradient" />
          
          <motion.div 
            style={{ opacity: opacityHero }}
            className="mobile-hero-subtext"
          >
            <div ref={subtextRef}>AI × Growth</div>
          </motion.div>

          <motion.h1 
            style={{ opacity: opacityHero }}
            className="mobile-hero-name mobile-display-font"
          >
            <div ref={textRef1} style={{ display: 'inline-block' }}>HARSHIL</div><br/>
            <div ref={textRef2} style={{ display: 'inline-block' }}>RAJ</div>
          </motion.h1>
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
        <span className="mobile-marquee-text">SYSTEMS · GROWTH · AI · GTM STRATEGY · DISTRIBUTION · </span>
        <span className="mobile-marquee-text">SYSTEMS · GROWTH · AI · GTM STRATEGY · DISTRIBUTION · </span>
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
      <FadeUp delay={0.12}>
        <h2 className="text-display text-[#1B3A2D] mb-[56px] leading-[1.05] w-full block tracking-[-0.03em] max-w-full mobile-about-headline">
          Growth That Compounds
        </h2>
      </FadeUp>
      
      <div className="flex flex-col md:flex-row gap-[40px] md:gap-[80px] items-start w-full mobile-about-body-cols">
        <FadeUp delay={0.24} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60] mobile-about-body-text">
            <p>
              Most people treat AI as a tool. I treat it as infrastructure. The difference is compounding returns versus one-time productivity gains. I build systems where AI creates actual leverage rather than just adding distraction.
            </p>
          </div>
        </FadeUp>
        
        <FadeUp delay={0.36} className="w-full md:max-w-[460px]">
          <div className="text-[15px] md:text-body text-[#6B6B60] mobile-about-body-text">
            <p>
              My focus sits at a specific intersection: AI systems, go-to-market strategy, and distribution. These three things compound each other. I work with founders and teams who want to move decisively, not just experiment.
            </p>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.48}>
        <div className="mt-[80px] flex justify-between items-end w-full border-b border-[#1B3A2D]/20 pb-[40px] mobile-about-labels">
          <div className="flex flex-col items-start hw-accel" style={{ transform: `translateX(${-scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE APPROACH</span>
            <span className="font-inter font-bold text-[40px] md:text-[clamp(44px,5vw,80px)] text-[#1B3A2D] tracking-[-0.03em] leading-none mobile-about-systems">SYSTEMS</span>
          </div>
          
          <div className="flex flex-col items-end hw-accel" style={{ transform: `translateX(${scrollProgress * 30}px)` }}>
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-2">THE GOAL</span>
            <span className="font-inter font-bold text-[40px] md:text-[clamp(44px,5vw,80px)] text-[#1B3A2D] tracking-[-0.03em] leading-none text-right mobile-about-growth">GROWTH</span>
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
          Build Your Growth Engine
        </h2>
      </FadeUp>

      <FadeUp delay={0.24} className="w-full">
        <div className="w-full border-y border-[#2A2A2A] mobile-expertise-grid-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mobile-expertise-grid">
            {[
              { title: "AI Systems & Workflows", desc: "Agents, automations, and multi-model workflows built around business outcomes, not demos." },
              { title: "GTM Strategy", desc: "Building GTM engines that are repeatable, measurable, and designed to accelerate as you learn." },
              { title: "Growth & Distribution", desc: "Channel strategies and content playbooks that convert attention into pipeline." },
              { title: "Content & Audience", desc: "8.9K+ LinkedIn followers. Delivering frameworks and observations from the work itself." }
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
          <p className="font-inter font-light text-[16px] text-[#A0A090] leading-[1.8]">
            I design and deploy AI infrastructure that compounds. The goal is always the same: more output from your team, with less manual overhead. Strategy without execution is expensive guesswork. I close that gap. An AI-powered GTM engine doesn't just grow faster, it grows smarter the longer you run it.
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
          <div className="flex flex-col items-start w-full relative z-10 mobile-contact-block">
            {/* Row 1 */}
            <span className="font-inter font-normal text-[13px] text-[#6B6B60] uppercase tracking-[0.08em] mb-[16px] mobile-contact-label">
              Get in touch
            </span>
            
            {/* Row 2: Email and LinkedIn together */}
            <div className="flex items-center gap-[12px] mobile-contact-socials">
              <a href="mailto:harshilraj.growth@gmail.com" className="w-fit border-[1.5px] border-[#1B3A2D] rounded-full px-[24px] py-[10px] font-inter font-medium text-[15px] md:text-[16px] text-[#1B3A2D] hover:bg-[#1B3A2D] hover:text-white transition-colors duration-250 mobile-contact-email">
                harshilraj.growth@gmail.com
              </a>
              <a href="https://linkedin.com/in/harshilraj" target="_blank" rel="noopener noreferrer" className="w-[42px] h-[42px] rounded-full bg-[#1B3A2D] flex items-center justify-center text-white hover:scale-105 transition-transform cursor-none shrink-0 md:w-[50px] md:h-[50px]">
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
            <h1 className="font-inter font-bold text-[clamp(50px,7.5vw,100px)] text-[#1B3A2D] leading-[0.8] m-0 text-left">HARSHIL</h1>
            <div className="w-[150px] h-[195px] object-cover mx-[4vw] shrink-0 mb-[-5px]">
               <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('/harshil.jpg')" }} />
            </div>
            <h1 className="font-inter font-bold text-[clamp(50px,7.5vw,100px)] text-[#1B3A2D] leading-[0.8] m-0 text-right">RAJ</h1>
          </div>

          {/* Mobile Footer Name */}
          <div className="md:hidden w-full flex flex-col items-center mobile-footer-names">
            <h1 className="mobile-display-font text-[#1B3A2D] m-0 leading-[0.85] text-left">
              HARSHIL<br/>RAJ
            </h1>
            <img src="/harshil.jpg" alt="Harshil Raj" className="mobile-footer-photo" />
          </div>
        </FadeUp>

        <div className="w-full flex justify-between items-center mt-[40px] pt-[20px] border-t border-[#1B3A2D] text-[13px] font-inter text-[#6B6B60] mobile-footer-copyright">
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
          <span className="loader-text">Compiling Leverage</span>
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
        <Contact />
      </main>
    </>
  );
}
