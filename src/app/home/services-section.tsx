"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

type Props = {};

// Service list
const designServices = [
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

const developmentServices = [
  [
    "Website development",
    "Web app development",
    "Cross platform mobile apps",
    "CMS implementation",
    "Design Systems",
  ],
  [
    "Technical research",
    "Performance optimizations",
    "API Integrations",
    "Ongoing support",
    "Collab with in-house team",
  ],
];

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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

// Helper to interpolate to #A19591
const interpolateToA19591 = (progress: number) => {
  // #A19591 = rgb(161, 149, 145)
  // #111 = rgb(17, 17, 17)
  const startColor = [17, 17, 17]; // #111
  const endColor = [161, 149, 145]; // #A19591
  let t = Math.max(0, Math.min(1, progress));
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * t);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * t);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * t);
  return `rgb(${r},${g},${b})`;
};

// Helper to interpolate to #D2C9C4
const interpolateToD2C9C4 = (progress: number) => {
  // #111 = rgb(17, 17, 17)
  // #D2C9C4 = rgb(210, 201, 196)
  const startColor = [17, 17, 17];
  const endColor = [210, 201, 196];
  let t = Math.max(0, Math.min(1, progress));
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * t);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * t);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * t);
  return `rgb(${r},${g},${b})`;
};

// Helper to interpolate from #BDAEA8 to #111
const interpolateBDAEA8to111 = (progress: number) => {
  // #BDAEA8 = rgb(189,174,168)
  // #111 = rgb(17,17,17)
  const startColor = [189, 174, 168];
  const endColor = [17, 17, 17];
  let t = Math.max(0, Math.min(1, progress));
  const r = Math.round(startColor[0] + (endColor[0] - startColor[0]) * t);
  const g = Math.round(startColor[1] + (endColor[1] - startColor[1]) * t);
  const b = Math.round(startColor[2] + (endColor[2] - startColor[2]) * t);
  return `rgb(${r},${g},${b})`;
};

const ServicesSection = (props: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const designRef = useRef<HTMLParagraphElement>(null);
  const developmentRef = useRef<HTMLParagraphElement>(null);
  const firstColRef = useRef<HTMLUListElement>(null);
  const secondColRef = useRef<HTMLUListElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const devFirstColRef = useRef<HTMLUListElement>(null);
  const devSecondColRef = useRef<HTMLUListElement>(null);
  const scribbleRef = useRef<SVGPathElement>(null);

  // Initial color for SSR/hydration
  const initialColor = interpolateColor(0);

  useGSAP(
    () => {
      // Only one timeline for the layer
      let designTl: gsap.core.Timeline | null = null;
      let devTl: gsap.core.Timeline | null = null;
      let layerTl: gsap.core.Timeline | null = null;

      if (
        firstColRef.current &&
        secondColRef.current &&
        layerRef.current &&
        devFirstColRef.current &&
        devSecondColRef.current
      ) {
        const itemsFirst = Array.from(
          firstColRef.current.querySelectorAll(
            ".services-section__design-first-col"
          )
        );
        const itemsSecond = Array.from(
          secondColRef.current.querySelectorAll(
            ".services-section__design-second-col"
          )
        );

        // For dev columns
        const devItemsFirst = Array.from(
          devFirstColRef.current.querySelectorAll(
            ".services-section__dev-first-col"
          )
        );
        const devItemsSecond = Array.from(
          devSecondColRef.current.querySelectorAll(
            ".services-section__dev-second-col"
          )
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

        // Set initial state for dev columns
        gsap.set(devItemsFirst, {
          y: 40,
          opacity: 0,
          color: "#E7E7E7",
        });
        gsap.set(devItemsSecond, {
          y: 40,
          opacity: 0,
          color: "#E7E7E7",
        });

        // Set initial state for the layer: hidden at bottom, height 0, centered horizontally
        // The layer should appear from +24px above the bottom (bottom: 24px)
        gsap.set(layerRef.current, {
          width: "calc(100% - 48px)",
          height: 0,
          left: "24px",
          right: "24px",
          top: "auto",
          bottom: "24px",
          y: 0,
          opacity: 1,
          borderRadius: "0px",
        });

        // Set initial color for Development word
        if (developmentRef.current) {
          developmentRef.current.style.color = "#E7E7E7";
        }

        const appearColor = "#111";
        const devAppearColor = "#111";

        // 0. Design columns staggered animation (before layer stage 1)
        designTl = gsap.timeline({ paused: true });

        // Animate first column items
        itemsFirst.forEach((item, i) => {
          designTl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.25
          );
          designTl!.to(
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
          designTl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            firstColDuration + i * 0.25
          );
          designTl!.to(
            item,
            {
              color: appearColor,
              duration: 0.2,
              ease: "power1.inOut",
            },
            firstColDuration + i * 0.25 + 0.4
          );
        });

        // 1. Layer timeline: all layer stages in one timeline
        layerTl = gsap.timeline({ paused: true });

        // Stage 1: from initial to "card" size, centered
        layerTl.to(
          layerRef.current,
          {
            height: "calc(100% - 100px)",
            left: "24px",
            right: "24px",
            top: "50%",
            bottom: "auto",
            y: "-50%",
            borderRadius: "32px",
            duration: 1.1,
            ease: "expo.out",
          },
          0
        );

        // Stage 2: expand to full screen, all positions 0, border 0, width/height 100vw/100vh
        // NOTE: The inner dev columns container (the one with absolute top-[350px] right-0) does NOT change its positioning in this stage.
        // --- THIS IS THE CAUSE OF THE OVERFLOW-X ISSUE ---
        // To fix, use width: "100%" instead of "100vw"
        layerTl.to(
          layerRef.current,
          {
            width: "100vw", // was "100vw"
            height: "100vh",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            y: 0,
            borderRadius: "0px",
            duration: 1.1,
            ease: "expo.inOut",
          },
          "+=1.1" // after stage 1
        );

        // 2. Dev columns staggered animation (after layer stage 1 is complete)
        devTl = gsap.timeline({ paused: true });

        // Animate dev first column
        devItemsFirst.forEach((item, i) => {
          devTl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            i * 0.25
          );
          devTl!.to(
            item,
            {
              color: devAppearColor,
              duration: 0.2,
              ease: "power1.inOut",
            },
            i * 0.25 + 0.4
          );
        });

        // Animate dev second column, staggered after the first column finishes
        const devFirstColDuration =
          devItemsFirst.length > 0
            ? (devItemsFirst.length - 1) * 0.25 + 0.4 + 0.2
            : 0;
        devItemsSecond.forEach((item, i) => {
          devTl!.to(
            item,
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            devFirstColDuration + i * 0.25
          );
          devTl!.to(
            item,
            {
              color: devAppearColor,
              duration: 0.2,
              ease: "power1.inOut",
            },
            devFirstColDuration + i * 0.25 + 0.4
          );
        });

        // --- ScrollTrigger: 4 stages ---
        // 0. Design columns staggered (designTl)
        // 1. Layer stage 1 (layerTl, progress 0->0.5)
        // 2. Dev columns staggered (devTl)
        // 3. Layer stage 2 (layerTl, progress 0.5->1)
        // We'll use: 0.25, 0.25, 0.25, 0.25 (25% each) for scroll progress
        const designScroll = 0.25;
        const layer1Scroll = 0.25;
        const devScroll = 0.25;
        const layer2Scroll = 0.25;
        const totalScroll =
          designScroll + layer1Scroll + devScroll + layer2Scroll;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * totalScroll}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // 0..designScroll: designTl
            // designScroll..designScroll+layer1Scroll: layerTl (0->0.5)
            // ...devScroll: devTl
            // ...layer2Scroll: layerTl (0.5->1)

            // Layer timeline progress mapping:
            // 0..layer1Scroll: 0..0.5
            // layer2Scroll: 0.5..1

            // 1. Design columns staggered
            if (progress < designScroll) {
              const t = progress / designScroll;
              designTl!.progress(t);
              layerTl!.progress(0);
              devTl!.progress(0);
            }
            // 2. Layer stage 1 (card, centered)
            else if (progress < designScroll + layer1Scroll) {
              designTl!.progress(1);
              const t = (progress - designScroll) / layer1Scroll;
              // Layer timeline: 0..0.5
              layerTl!.progress(t * 0.5);
              devTl!.progress(0);
            }
            // 3. Dev columns staggered, layer stays at card state
            else if (progress < designScroll + layer1Scroll + devScroll) {
              designTl!.progress(1);
              layerTl!.progress(0.5); // hold at card state
              const t = (progress - designScroll - layer1Scroll) / devScroll;
              devTl!.progress(t);
            }
            // 4. Layer stage 2 (expand to full screen)
            else {
              designTl!.progress(1);
              devTl!.progress(1);
              // Layer timeline: 0.5..1
              const t =
                (progress - designScroll - layer1Scroll - devScroll) /
                layer2Scroll;
              layerTl!.progress(0.5 + Math.min(Math.max(t, 0), 1) * 0.5);
            }

            // Handle "Design" color:
            // When the layer animation starts (i.e., progress >= designScroll), gradually interpolate from #111 to #D2C9C4 with scroll
            if (designRef.current) {
              if (progress < designScroll) {
                // Before layer animation, normal color interpolation
                designRef.current.style.color = interpolateColor(
                  progress / designScroll
                );
              } else if (progress < designScroll + layer1Scroll) {
                // During layer stage 1, interpolate from #111 to #D2C9C4
                const t = (progress - designScroll) / layer1Scroll;
                designRef.current.style.color = interpolateToD2C9C4(t);
              } else {
                // After layer, keep at #D2C9C4
                designRef.current.style.color = interpolateToD2C9C4(1);
              }
            }

            // Handle "Development" color animation:
            // The animation starts when the first col staggered animation starts,
            // and the color of development word should be changed to #BDAEA8
            // The duration of this part of animation is the duration of both first and second column staggered animation (i.e., until designScroll is complete)
            if (developmentRef.current) {
              if (progress < designScroll) {
                // Animate from #E7E7E7 to #BDAEA8 as progress goes from 0 to designScroll
                // #E7E7E7 = rgb(231,231,231), #BDAEA8 = rgb(189,174,168)
                const t = progress / designScroll;
                const startColor = [231, 231, 231];
                const endColor = [189, 174, 168];
                const r = Math.round(
                  startColor[0] + (endColor[0] - startColor[0]) * t
                );
                const g = Math.round(
                  startColor[1] + (endColor[1] - startColor[1]) * t
                );
                const b = Math.round(
                  startColor[2] + (endColor[2] - startColor[2]) * t
                );
                developmentRef.current.style.color = `rgb(${r},${g},${b})`;
              } else if (progress < designScroll + layer1Scroll) {
                // During layer stage 1, interpolate from #BDAEA8 to #111
                // progress: [designScroll, designScroll+layer1Scroll] => t: [0,1]
                const t = (progress - designScroll) / layer1Scroll;
                developmentRef.current.style.color = interpolateBDAEA8to111(t);
              } else {
                // After dev animation, keep at #111
                developmentRef.current.style.color = "#111";
              }
            }
          },
        });

        // Initialize DrawSVG animation (FORWARD)
        if (scribbleRef.current) {
          // Set initial state - not drawn
          gsap.set(scribbleRef.current, {
            drawSVG: "100% 100%",
          });

          // Create timeline for scribble animation (forward: draw)
          const scribbleTl = gsap.timeline({ paused: true });

          // Stage 1: Draw from 0% to 30% (i.e., 0% 0% -> 0% 30%)
          scribbleTl.to(scribbleRef.current, {
            drawSVG: "100% 75%",
            duration: 1,
            ease: "power2.inOut",
          });

          // Stage 2: Draw from 30% to 60% (i.e., 0% 30% -> 0% 60%)
          scribbleTl.to(scribbleRef.current, {
            drawSVG: "90% 50%",
            duration: 1,
            ease: "power2.inOut",
          });

          // Stage 3: Draw from 60% to 100% (i.e., 0% 60% -> 0% 100%)
          scribbleTl.to(scribbleRef.current, {
            drawSVG: "50% 0%",
            duration: 1,
            ease: "power2.inOut",
          });

          // Create ScrollTrigger for the scribble animation (forward mapping)
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${window.innerHeight * totalScroll}`, // Use the same total scroll as other animations
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;

              // Map the scroll progress to our animation timeline (forward)
              if (progress < designScroll) {
                // During design services stagger (0-25%)
                const t = progress / designScroll;
                scribbleTl.progress(t * 0.3); // First 30% of animation (from 0 to 0.3)
              } else if (progress < designScroll + layer1Scroll) {
                // During layer stage 1 (25-50%)
                const t = (progress - designScroll) / layer1Scroll;
                scribbleTl.progress(0.3 + t * 0.3); // 0.3 to 0.6
              } else {
                // During remaining scroll (50-100%)
                const t =
                  (progress - (designScroll + layer1Scroll)) /
                  (devScroll + layer2Scroll);
                scribbleTl.progress(0.6 + t * 0.4); // 0.6 to 1
              }
            },
          });
        }
      } else if (layerRef.current && sectionRef.current) {
        // Fallback: set initial state for the layer if columns are not ready
        gsap.set(layerRef.current, {
          width: "calc(100% - 48px)",
          height: 0,
          left: "24px",
          right: "24px",
          top: "auto",
          bottom: "24px",
          y: 0,
          opacity: 1,
          borderRadius: "0px",
        });
        // Fallback: set initial state for Development word
        if (developmentRef.current) {
          developmentRef.current.style.color = "#E7E7E7";
        }
        // Fallback: scribble not drawn
        if (scribbleRef.current) {
          gsap.set(scribbleRef.current, {
            drawSVG: "100% 100%",
          });
        }
      }

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        // Clean up overflow-x
        document.body.style.overflowX = "";
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden relative p-4 md:p-[52px] flex min-h-screen lg:h-screen justify-center flex-col"
    >
      {/* TOP CARD */}
      <div className="flex flex-wrap gap-2 md:gap-[8px] items-center border-b border-[#e1e3e4] z-20 mb-6 md:mb-[80px] pb-4 md:pb-[24px]">
        <span className="text-base md:text-[24px] leading-[100%] font-semibold">
          Services
        </span>
        <img
          alt=""
          className="h-[5px] md:h-[7px] w-[20px] md:w-[30px] mt-[2px] hidden md:block"
          src="https://yummygum.com/images/home/services-separator.svg"
        />
        <p className="text-[#71757f] text-sm md:text-[24px] w-full md:w-auto">
          Ranging from big ideas to fine details
        </p>
      </div>

      {/* MAIN SECTION - Desktop: 2 col grid, Mobile: stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0">
        {/* Left side - Design & Development headings */}
        <div className="flex z-30 flex-col gap-2 md:gap-[32px] relative mb-6 lg:mb-0">
          <p
            ref={designRef}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-[98.3px] leading-[100%] font-normal"
            style={{ color: initialColor }}
          >
            Design
          </p>
          <p
            ref={developmentRef}
            className="text-[#E7E7E7] text-3xl sm:text-4xl md:text-6xl lg:text-[98.3px] leading-[100%] font-normal"
            style={{ color: "#E7E7E7" }}
          >
            Development
          </p>
          <svg
            className="services-section__scribble absolute bottom-10 -left-4 md:-left-20 hidden lg:block"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 725 175"
            width="100%"
            height="50%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              ref={scribbleRef}
              d="M720 165C400 140 260 155 150 168C70 177 -5 160 5 105C15 50 50 25 90 15C130 5 340 0 420 10"
              stroke="#D7CDC8"
              strokeLinecap="round"
              strokeWidth="5"
            />
          </svg>
        </div>
        
        {/* Right side - Service lists */}
        <div className="grid grid-cols-2 relative gap-2 md:gap-0">
          {/* FIRST COL - Design Services */}
          <ul ref={firstColRef}>
            {designServices[0].map((service) => (
              <li
                key={service}
                className="relative services-section__design-first-col pl-4 md:pl-[24px] mb-3 md:mb-[32px] text-xs md:text-lg lg:text-[24px] leading-[140%] md:leading-[125%] font-normal"
                style={{ willChange: "transform, opacity, color" }}
              >
                {service}
                <span className="sparkle absolute left-0 top-[25%]" />
              </li>
            ))}
          </ul>
          {/* SECOND COL - Design Services */}
          <ul ref={secondColRef}>
            {designServices[1].map((service) => (
              <li
                key={service}
                className="text-[#E7E7E7] services-section__design-second-col relative mb-3 md:mb-[32px] pl-4 md:pl-[24px] text-xs md:text-lg lg:text-[24px] leading-[140%] md:leading-[125%] font-normal"
                style={{ willChange: "transform, opacity, color" }}
              >
                {service}
                <span className="sparkle absolute left-0 top-[25%]" />
              </li>
            ))}
          </ul>

          {/* 
            Development Services Overlay - HIDDEN on mobile to prevent overlap
            Only shows on lg+ screens where the animation works properly
          */}
          <div className="hidden lg:grid grid-cols-2 w-full h-full absolute top-0 right-0 z-20">
            {/* FIRST COL */}
            <ul ref={devFirstColRef}>
              {developmentServices[0].map((service) => (
                <li
                  key={service}
                  className="relative services-section__dev-first-col pl-[24px] mb-[32px] text-[24px] leading-[125%] font-normal"
                  style={{ willChange: "transform, opacity, color" }}
                >
                  {service}
                  <span className="sparkle absolute left-0 top-[25%]" />
                </li>
              ))}
            </ul>
            {/* SECOND COL */}
            <ul ref={devSecondColRef}>
              {developmentServices[1].map((service) => (
                <li
                  key={service}
                  className="text-[#E7E7E7] services-section__dev-second-col relative mb-[32px] pl-[24px] text-[24px] leading-[125%] font-normal"
                  style={{ willChange: "transform, opacity, color" }}
                >
                  {service}
                  <span className="sparkle absolute left-0 top-[25%]" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* RELATIVE LAYER - Hidden on mobile */}
      <div
        ref={layerRef}
        className="hidden lg:block absolute z-10 bg-[#FAF8F6] h-0 t-auto bottom-[24px] transform-none rounded-[36px] w-[calc(100%-48px)] left-6 pointer-events-none"
        style={{
          transition:
            "height 0.3s, top 0.3s, bottom 0.3s, transform 0.3s, border-radius 0.3s, width 0.3s, left 0.3s, right 0.3s",
        }}
      />
    </section>
  );
};

export { ServicesSection };
