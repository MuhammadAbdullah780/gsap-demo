"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {};

const sliderImages = [
  {
    src: "/proj-1.avif",
    alt: "Project 1",
  },
  {
    src: "/proj-2.avif",
    alt: "Project 2",
  },
  {
    src: "/proj-1.avif",
    alt: "Project 1",
  },
  {
    src: "/proj-2.avif",
    alt: "Project 2",
  },

  {
    src: "/proj-1.avif",
    alt: "Project 1",
  },
  {
    src: "/proj-2.avif",
    alt: "Project 2",
  },
  {
    src: "/proj-1.avif",
    alt: "Project 1",
  },
  {
    src: "/proj-2.avif",
    alt: "Project 2",
  },
];

const ProjectSlider = (props: Props) => {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track || !section) return;

    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".bonbon-slider-image");
      if (slides.length < 2) return;

      // Set up the track to be wide enough for all slides
      gsap.set(track, {
        width: `${slides.length * 100}%`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      });

      // Each slide takes full viewport width, centered
      gsap.set(slides, {
        width: "100vw",
        minWidth: "100vw",
        maxWidth: "100vw",
        height: "100%",
        objectFit: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      });

      // Initial position
      gsap.set(track, { x: 0 });

      // Animate the track to the left as we scroll
      gsap.to(track, {
        x: () => `-${(slides.length - 1) * 100}vw`,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top-=60 top",
          end: () => `+=${window.innerWidth * (slides.length - 1)}`,
          scrub: 1,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-0 overflow-x-clip">
      <h2 className="text-[27px] text-center block m-auto max-w-[1300px] mb-3 font-semibold">
        Say Goodbye to planning headaches
      </h2>
      <p className="text-[18px] text-center block m-auto max-w-[1300px]">
        BonBon replaces endless texts, flaky RSVPs, and decision deadlocks with
        a smoother, smarter way to make plans that actually happen.
      </p>

      <div
        className="mt-10 overflow-hidden hide-scrollbar relative w-full"
        ref={sliderRef}
        style={{
          height: "500px",
          overflowX: "hidden",
        }}
      >
        <div
          ref={trackRef}
          className="bonbon-slider-track h-full"
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          {sliderImages.map((img, idx) => (
            <div
              key={idx}
              className="bonbon-slider-image flex justify-center items-center"
              style={{
                width: "100vw",
                minWidth: "100vw",
                maxWidth: "100vw",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="rounded-3xl object-cover"
                style={{
                  width: "100%",
                  maxWidth: "1300px",
                  height: "100%",
                  objectFit: "cover",
                  margin: "0 auto",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;
