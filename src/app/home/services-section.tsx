"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

type Props = {};

// Service list
const services = [
  [
    "Information Architecture",
    "User research and testing",
    "Conversion optimization",
    "Design systems",
    "Web app design",
  ],
  [
    "Mobile app design",
    "Brand identity",
    "Decks and social media",
    "Motion design",
    "Website design",
  ],
];

gsap.registerPlugin(ScrollTrigger);

// Helper to interpolate color
const interpolateColor = (progress: number) => {
  const startColor = [231, 231, 231]; // #E7E7E7
  const endColor = [17, 17, 17]; // #111
  // Clamp progress to [0,1]
  let t = Math.max(0, Math.min(1, progress));
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * t);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * t);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * t);
  return `rgb(${r},${g},${b})`;
};

const ServicesSection = (props: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLParagraphElement>(null);
  const firstColRef = useRef<HTMLUListElement>(null);
  const secondColRef = useRef<HTMLUListElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // Initial color for SSR/hydration
  const initialColor = interpolateColor(0);

  useGSAP(
    () => {
      // Color animation for "Design"
      let st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1.0,
        onUpdate: (self) => {
          // Reverse the progress: 1 - self.progress
          const reversedProgress = 1 - self.progress;
          if (designRef.current) {
            designRef.current.style.color = interpolateColor(reversedProgress);
          }
        },
      });

      // Staggered animation for both columns, with color change per item
      let tl: gsap.core.Timeline | null = null;

      if (firstColRef.current && secondColRef.current) {
        const itemsFirst = Array.from(
          firstColRef.current.querySelectorAll("li")
        );
        const itemsSecond = Array.from(
          secondColRef.current.querySelectorAll("li")
        );

        // Set initial state for all li children in both columns
        gsap.set(itemsFirst, {
          y: 40,
          opacity: 0,
          color: "#E7E7E7",
        });
        gsap.set(itemsSecond, {
          y: 40,
          opacity: 0,
          color: "#E7E7E7",
        });

        const appearColor = "#111";

        // Create a single timeline for both columns, staggered one after the other
        tl = gsap.timeline({ paused: true });

        // Animate first column items
        itemsFirst.forEach((item, i) => {
          tl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.25
          );
          tl!.to(
            item,
            {
              color: appearColor,
              duration: 0.2,
              ease: "power1.inOut",
            },
            i * 0.25 + 0.4
          );
        });

        // Animate second column items, staggered after the first column finishes
        const firstColDuration =
          itemsFirst.length > 0
            ? (itemsFirst.length - 1) * 0.25 + 0.4 + 0.2
            : 0;
        itemsSecond.forEach((item, i) => {
          tl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            firstColDuration + i * 0.25
          );
          tl!.to(
            item,
            {
              color: appearColor,
              duration: 0.2,
              ease: "power1.inOut",
            },
            firstColDuration + i * 0.25 + 0.4
          );
        });

        // ScrollTrigger to scrub the timeline as you scroll
        const totalDuration = tl.duration();

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * 0.6}`,
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            tl!.progress(progress);
          },
        });
      }

      // Layer animation: from height 0 at bottom to full height centered
      if (layerRef.current && sectionRef.current) {
        // Set initial state: height 0, bottom 0, left-6, width calc(100%-48px), rounded, bg, etc.
        gsap.set(layerRef.current, {
          height: 0,
          top: "auto",
          bottom: "24px",
          y: 0,
        });

        // Animate to: height calc(100%-100px), top 50%, bottom auto, translateY(-50%)
        gsap.to(layerRef.current, {
          height: "calc(100% - 100px)",
          top: "50%",
          bottom: "auto",
          y: "-50%",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        });
      }

      return () => {
        st && st.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full relative p-[52px] flex h-screen justify-center flex-col"
    >
      {/* TOP CARD */}
      <div className="flex gap-[8px] items-center border-b border-[#e1e3e4] z-10 mb-[80px] pb-[24px]">
        <span className="text-[24px] leading-[100%] font-semibold">
          Services
        </span>
        <img
          alt=""
          className="h-[7px] w-[30px] mt-[2px]"
          src="https://yummygum.com/images/home/services-separator.svg"
        />
        <p className="text-[#71757f] text-[24px]">
          Ranging from big ideas to fine details
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-[32px]">
          <p
            ref={designRef}
            className="text-[98.3px] leading-[100%] font-normal"
            style={{ color: initialColor }}
          >
            Design
          </p>
          <p className="text-[#E7E7E7] text-[98.3px] leading-[100%] font-normal">
            Development
          </p>
        </div>
        <div className="grid grid-cols-2">
          {/* FIRST COL */}
          <ul ref={firstColRef}>
            {services[0].map((service) => (
              <li
                key={service}
                className="relative pl-[24px] mb-[32px] text-[24px] leading-[125%] font-normal"
                style={{ willChange: "transform, opacity, color" }}
              >
                {service}
                <span className="sparkle absolute left-0 top-[25%]" />
              </li>
            ))}
          </ul>
          {/* SECOND COL */}
          <ul ref={secondColRef}>
            {services[1].map((service) => (
              <li
                key={service}
                className="text-[#E7E7E7] relative mb-[32px] pl-[24px] text-[24px] leading-[125%] font-normal"
                style={{ willChange: "transform, opacity, color" }}
              >
                {service}
                <span className="sparkle absolute left-0 top-[25%]" />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RELATIVE LAYER */}
      {/* <div
        ref={layerRef}
        className="absolute bg-[#FAF8F6] rounded-[36px] w-[calc(100%-48px)] left-6 h-[calc(100%-100px)] top-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          // These styles are for SSR/hydration fallback, GSAP will override
          height: "calc(100% - 100px)",
          top: "50%",
          bottom: "auto",
          transform: "translateY(-50%)",
        }}
      ></div> */}
    </section>
  );
};

export { ServicesSection };
