"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import { AnimatedAbout } from "../about/animated-about";
import { ServicesSection } from "../home/services-section";
import ProjectsGrid from "../home/projects-grid";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ShowcasePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Hero text parallax and fade effect
      if (heroTextRef.current) {
        gsap.to(heroTextRef.current, {
          y: 150,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: heroRef }
  );

  return (
    <main className="showcase-page bg-[#0a0a0a] w-full min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="h-screen relative flex items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 119, 198, 0.15), transparent)",
        }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
            filter: "blur(100px)",
            animation: "pulse 8s ease-in-out infinite",
          }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div ref={heroTextRef} className="relative z-10 text-center px-6 pt-24">
          <div className="inline-block mb-6 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
            <span className="text-sm text-white/70 tracking-wider uppercase">
              GSAP Animation Portfolio
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Animation
            </span>
            <span className="block text-white/90">Showcase</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
            A curated collection of GSAP-powered animations demonstrating
            advanced scroll-triggered effects, smooth transitions, and
            interactive elements.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <span className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm">
              Scroll Animations
            </span>
            <span className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm">
              Typewriter Effects
            </span>
            <span className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm">
              Carousel Sliders
            </span>
            <span className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-sm">
              SVG Path Drawing
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 mx-auto text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Section Divider with Title - Typewriter Effect */}
      <SectionDivider
        title="Typewriter Animation"
        description="Scroll-triggered character-by-character reveal with synchronized SVG animations and cursor effects."
        number="01"
        bgColor="bg-[#111]"
      />

      {/* Typewriter Animation Section */}
      <AnimatedAbout />

      {/* Section Divider - Services Showcase */}
      <SectionDivider
        title="Services Showcase"
        description="Multi-stage scroll animation with staggered reveals, color transitions, and SVG path drawing effects."
        number="02"
        bgColor="bg-white"
        dark={false}
      />

      {/* Services Section */}
      <div className="bg-white">
        <ServicesSection />
      </div>

      {/* Section Divider - Project Carousel */}
      <SectionDivider
        title="Project Carousel"
        description="Horizontal scroll-based project showcase with smooth sliding transitions and content reveals."
        number="03"
        bgColor="bg-white"
        dark={false}
      />

      {/* Projects Grid/Carousel Section */}
      <div className="bg-white">
        <ProjectsGrid />
      </div>
      {/* Footer Section */}
      <footer className="bg-[#0a0a0a] py-24 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm mb-8">
              Ready to bring your vision to life?
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let&apos;s Create Something
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </h2>
            <p className="text-lg text-white/60 max-w-xl mx-auto">
              These animations represent just a glimpse of what&apos;s possible.
              Let&apos;s discuss how we can elevate your project with stunning,
              performant animations.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <span className="text-white/40 text-sm block mb-1">
                Framework
              </span>
              <span className="text-white font-semibold">GSAP + Next.js</span>
            </div>
            <div className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <span className="text-white/40 text-sm block mb-1">
                Animations
              </span>
              <span className="text-white font-semibold">4 Showcases</span>
            </div>
            <div className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <span className="text-white/40 text-sm block mb-1">
                Performance
              </span>
              <span className="text-white font-semibold">60fps Smooth</span>
            </div>
          </div>

          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} GSAP Animation Showcase. Built with ❤️
            and code.
          </p>
        </div>
      </footer>

      {/* Custom keyframes for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }
      `}</style>
    </main>
  );
};

// Section Divider Component
const SectionDivider = ({
  title,
  description,
  number,
  bgColor = "bg-[#0a0a0a]",
  dark = true,
}: {
  title: string;
  description: string;
  number: string;
  bgColor?: string;
  dark?: boolean;
}) => {
  const dividerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 80%",
              end: "top 30%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: dividerRef }
  );

  return (
    <div
      ref={dividerRef}
      className={`${bgColor} py-32 px-8 flex items-center justify-center`}
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center">
        <span
          className={`inline-block text-8xl md:text-9xl font-bold mb-6 ${
            dark
              ? "text-white/5"
              : "text-black/5"
          }`}
          style={{ fontFamily: "system-ui" }}
        >
          {number}
        </span>
        <h2
          className={`text-3xl md:text-5xl font-bold mb-6 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            dark ? "text-white/60" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default ShowcasePage;
