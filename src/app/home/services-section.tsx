"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
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

  // Initial color for SSR/hydration
  const initialColor = interpolateColor(0);

  useGSAP(
    () => {
      // Staggered animation for both columns, with color change per item
      let tl: gsap.core.Timeline | null = null;
      let layerTimeline: gsap.core.Timeline | null = null;
      let devTl: gsap.core.Timeline | null = null;

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
          height: 0,
          width: "calc(100% - 48px)",
          left: "24px",
          right: "24px",
          top: "auto",
          bottom: "24px", // <-- Start at 24px from bottom
          y: 0,
          opacity: 1,
        });

        // Set initial color for Development word
        if (developmentRef.current) {
          developmentRef.current.style.color = "#E7E7E7";
        }

        const appearColor = "#111";
        const devAppearColor = "#111";

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

        // After stagger animation, animate the layer coming up and expanding
        // The layer animation should be controlled by a single ScrollTrigger
        // We'll use a single ScrollTrigger for the whole section, and map progress to both timelines

        // Layer animation timeline (starts after stagger timeline completes)
        layerTimeline = gsap.timeline({ paused: true });

        // Step 1: Layer comes up from bottom (height 0 at bottom:24px)
        layerTimeline.to(
          layerRef.current,
          {
            height: "calc(100% - 100px)",
            top: "50%",
            bottom: "auto",
            y: "-50%",
            duration: 1.1,
            ease: "expo.out",
          },
          0
        );

        // Animate dev columns in a staggered way after the layer is up
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

        // --- FIX: Use a single ScrollTrigger and map progress to all timelines ---
        // We'll use a total scroll distance, e.g. 60% for stagger, 30% for layer, 30% for dev
        const staggerScroll = 0.5; // 50% of scroll for design stagger
        const layerScroll = 0.25; // 25% of scroll for layer
        const devScroll = 0.25; // 25% of scroll for dev stagger
        const totalScroll = staggerScroll + layerScroll + devScroll;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * totalScroll}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Map progress 0..staggerScroll to tl, staggerScroll..staggerScroll+layerScroll to layerTimeline, then devTl
            if (progress < staggerScroll) {
              const tlProgress = progress / staggerScroll;
              tl!.progress(tlProgress);
              layerTimeline!.progress(0);
              devTl!.progress(0);
            } else if (progress < staggerScroll + layerScroll) {
              tl!.progress(1);
              const layerProgress = (progress - staggerScroll) / layerScroll;
              layerTimeline!.progress(Math.min(Math.max(layerProgress, 0), 1));
              devTl!.progress(0);
            } else {
              tl!.progress(1);
              layerTimeline!.progress(1);
              const devProgress =
                (progress - staggerScroll - layerScroll) / devScroll;
              devTl!.progress(Math.min(Math.max(devProgress, 0), 1));
            }

            // Handle "Design" color:
            // When the layer animation starts (i.e., progress >= staggerScroll), gradually interpolate from #111 to #D2C9C4 with scroll
            if (designRef.current) {
              if (progress < staggerScroll) {
                // Before layer animation, normal color interpolation
                designRef.current.style.color = interpolateColor(
                  progress / staggerScroll
                );
              } else if (progress < staggerScroll + layerScroll) {
                // During layer animation, interpolate from #111 to #D2C9C4
                const layerProgress = (progress - staggerScroll) / layerScroll;
                designRef.current.style.color =
                  interpolateToD2C9C4(layerProgress);
              } else {
                // After layer, keep at #D2C9C4
                designRef.current.style.color = interpolateToD2C9C4(1);
              }
            }

            // Handle "Development" color animation:
            // The animation starts when the first col staggered animation starts,
            // and the color of development word should be changed to #BDAEA8
            // The duration of this part of animation is the duration of both first and second column staggered animation (i.e., until staggerScroll is complete)
            if (developmentRef.current) {
              if (progress < staggerScroll) {
                // Animate from #E7E7E7 to #BDAEA8 as progress goes from 0 to staggerScroll
                // #E7E7E7 = rgb(231,231,231), #BDAEA8 = rgb(189,174,168)
                const t = progress / staggerScroll;
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
              } else if (progress < staggerScroll + layerScroll) {
                // During layer animation, interpolate from #BDAEA8 to #111
                // progress: [staggerScroll, staggerScroll+layerScroll] => t: [0,1]
                const layerProgress = (progress - staggerScroll) / layerScroll;
                developmentRef.current.style.color =
                  interpolateBDAEA8to111(layerProgress);
              } else {
                // After dev animation, keep at #111
                developmentRef.current.style.color = "#111";
              }
            }
          },
        });
      } else if (layerRef.current && sectionRef.current) {
        // Fallback: set initial state for the layer if columns are not ready
        gsap.set(layerRef.current, {
          height: 0,
          width: "calc(100% - 48px)",
          left: "24px",
          right: "24px",
          top: "auto",
          bottom: "24px",
          y: 0,
          opacity: 1,
        });
        // Fallback: set initial state for Development word
        if (developmentRef.current) {
          developmentRef.current.style.color = "#E7E7E7";
        }
      }

      return () => {
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
      <div className="flex gap-[8px] items-center border-b border-[#e1e3e4] z-20 mb-[80px] pb-[24px]">
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
        <div className="flex z-30 flex-col gap-[32px]">
          <p
            ref={designRef}
            className="text-[98.3px] leading-[100%] font-normal"
            style={{ color: initialColor }}
          >
            Design
          </p>
          <p
            ref={developmentRef}
            className="text-[#E7E7E7] text-[98.3px] leading-[100%] font-normal"
            style={{ color: "#E7E7E7" }}
          >
            Development
          </p>
        </div>
        <div className="grid grid-cols-2">
          {/* FIRST COL */}
          <ul ref={firstColRef}>
            {designServices[0].map((service) => (
              <li
                key={service}
                className="relative services-section__design-first-col pl-[24px] mb-[32px] text-[24px] leading-[125%] font-normal"
                style={{ willChange: "transform, opacity, color" }}
              >
                {service}
                <span className="sparkle absolute left-0 top-[25%]" />
              </li>
            ))}
          </ul>
          {/* SECOND COL */}
          <ul ref={secondColRef}>
            {designServices[1].map((service) => (
              <li
                key={service}
                className="text-[#E7E7E7] services-section__design-second-col relative mb-[32px] pl-[24px] text-[24px] leading-[125%] font-normal"
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
      <div
        ref={layerRef}
        className="absolute z-10 bg-[#FAF8F6] h-0 t-auto bottom-[24px] transform-none rounded-[36px] w-[calc(100%-48px)] left-6 pointer-events-none"
        style={{
          transition: "height 0.3s, top 0.3s, bottom 0.3s, transform 0.3s",
        }}
      >
        <div className="w-full h-full relative">
          <div className="grid grid-cols-2 w-[650px] h-[310px] absolute top-[350px] right-0">
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
    </section>
  );
};

export { ServicesSection };
