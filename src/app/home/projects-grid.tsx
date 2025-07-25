"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const ProjectsGrid = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // Make the animation last for 100% of the viewport height
        pin: true,
        scrub: 1,
      },
    });

    // Initial state
    gsap.set(textContainerRef.current, {
      x: "100%",
    });

    // Animation timeline
    tl.to(textContainerRef.current, {
      x: 0,
      ease: "none",
    })
    .to(imageContainerRef.current, {
      width: "50%",
      ease: "none",
    }, "<"); // Start at the same time as the text animation

  }, { scope: containerRef });

  return (
    <div className="relative w-full overflow-x-hidden" style={{ height: "200vh" }}> {/* Added overflow-x-hidden */}
      <div ref={containerRef} className="h-screen relative w-full bg-white">
        <div 
          ref={imageContainerRef}
          className="h-full w-full relative p-12"
        >
          <div className="h-full w-full overflow-hidden rounded-[clamp(32px,1.8518518519vw,1.8518518519vw)]">
            <div className="h-full min-h-full w-full overflow-hidden relative">
              <img
                className="block w-full h-full min-w-full min-h-full max-w-none object-cover object-center"
                src="/vio.avif"
                alt="Vio.com interface showing hotel booking in Barcelona"
              />
            </div>
          </div>
        </div>

        <aside
          ref={textContainerRef}
          className="absolute top-0 right-0 min-w-[520px] w-[50%] h-full flex flex-col justify-end p-12"
        >
          <div className="pb-16 pr-8 text-left w-full">
            <h2 className="text-[#131518] mb-4 text-[72px] leading-[100%]">Vio.com</h2>
            <p className="mb-16 text-[#393f46] text-[24px] leading-[150%]">
              We helped Vio.com with a fresh, impactful brand that
              resonates with deal-seeking travelers and reach into every
              product detail.
            </p>
            <ul className="flex flex-wrap gap-3 self-stretch items-start content-start">
              <span className="rounded-full mb-16 w-fit border border-[#e7ded9] px-6 py-3">
                Brand identity
              </span>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectsGrid;
