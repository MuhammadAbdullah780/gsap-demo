"use client";
import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    img: "https://www.datocms-assets.com/138661/1743608083-vio-cover-desktop.avif?dpr=0.25&fm=webp%20848w,https://www.datocms-assets.com/138661/1743608083-vio-cover-desktop.avif?dpr=0.5&fm=webp%201696w,https://www.datocms-assets.com/138661/1743608083-vio-cover-desktop.avif?dpr=0.75&fm=webp%202544w,https://www.datocms-assets.com/138661/1743608083-vio-cover-desktop.avif?fm=webp%203392w",
    name: "Vio.com",
    description:
      "We helped Vio.com with a fresh, impactful brand that resonates with deal-seeking travelers and reaches into every product detail.",
    tags: ["Branding", "Web Design", "SEO"],
    link: "https://www.vio.com",
  },
  {
    img: "https://www.datocms-assets.com/138661/1743608083-echo-cover-desktop.avif?dpr=0.25&fm=webp%20848w,https://www.datocms-assets.com/138661/1743608083-echo-cover-desktop.avif?dpr=0.5&fm=webp%201696w,https://www.datocms-assets.com/138661/1743608083-echo-cover-desktop.avif?dpr=0.75&fm=webp%202544w,https://www.datocms-assets.com/138661/1743608083-echo-cover-desktop.avif?fm=webp%203392w",
    name: "Echo Health",
    description:
      "Echo Health partnered with us to launch a digital platform that simplifies healthcare payments for providers and patients.",
    tags: ["UI/UX", "Web App", "Healthcare"],
    link: "https://www.echohealth.com",
  },
  {
    img: "https://www.datocms-assets.com/138661/1743608083-aurora-cover-desktop.avif?dpr=0.25&fm=webp%20848w,https://www.datocms-assets.com/138661/1743608083-aurora-cover-desktop.avif?dpr=0.5&fm=webp%201696w,https://www.datocms-assets.com/138661/1743608083-aurora-cover-desktop.avif?dpr=0.75&fm=webp%202544w,https://www.datocms-assets.com/138661/1743608083-aurora-cover-desktop.avif?fm=webp%203392w",
    name: "Aurora Solar",
    description:
      "Aurora Solar’s new site showcases their innovative solar design tools and helps drive industry adoption.",
    tags: ["Web Design", "SaaS", "Sustainability"],
    link: "https://www.aurorasolar.com",
  },
];
export function ProjectSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);


  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen h-screen overflow-visible bg-white flex items-center justify-center"
      style={{ willChange: "transform" }}
    >
      <div className="flex w-full h-full items-center justify-center">
        {/* Image: covers full area at first, shrinks as text appears */}
        <div
          ref={imageWrapperRef}
          className="w-full h-full flex items-center justify-center"
          style={{
            transition: "box-shadow 0.3s",
            padding: "48px 80px 48px 48px",
            willChange: "transform, filter, border-radius",
            pointerEvents: "none",
          }}
        >
          <img
            src={projects[0].img}
            alt={projects[0].name}
            className="w-full h-full object-cover rounded-[32px] shadow-xl"
            style={{
              transition: "border-radius 0.3s, filter 0.3s",
              objectPosition: "center",
            }}
          />
        </div>

        {/* Text: hidden at first, expands in as image shrinks */}
        <div
          ref={textRef}
          className="flex flex-col justify-end h-full rounded-[32px] min-w-[520px]"
          style={{
            willChange: "opacity, transform",
          }}
        >
          <h2 className="text-[51px] font-normal leading-none text-[#131518] mb-4">
            {projects[0].name}
          </h2>
          <p
            className="text-[20px] mb-[64px]"
            style={{
              color: "#393F46",
              fontFamily:
                '"Fusion Neue", system-ui, "Segoe UI", Arial, sans-serif',
            }}
          >
            {projects[0].description}
          </p>
          <span
            className="title-s-regular-none mb-[64px] w-fit border border-[#e7ded9]"
            style={{
              alignItems: "center",
              borderRadius: "clamp(100px, 5.7894736842vw, 57.8947368421px)",
              display: "inline-flex",
              flexGrow: 0,
              gap: "clamp(6px, 0.3473684211vw, 10px)",
              padding:
                "clamp(8px, 0.4631578947vw, 13px) clamp(12px, 0.6947368421vw, 18px)",
            }}
          >
            Brand identity
          </span>
        </div>
      </div>
    </section>
  );
}
