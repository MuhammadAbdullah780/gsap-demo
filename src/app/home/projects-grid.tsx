"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "vio",
    title: "Vio.com",
    description: "We helped Vio.com with a fresh, impactful brand that resonates with deal-seeking travelers and reach into every product detail.",
    image: "/vio.avif",
    imageAlt: "Vio.com interface showing hotel booking in Barcelona",
    tags: ["Brand identity"],
  },
  {
    id: "demo-project",
    title: "Project Two",
    description: "Another amazing project showcasing our capabilities in creating impactful digital experiences.",
    image: "/vio.avif", // Using same image as placeholder
    imageAlt: "Project Two showcase image",
    tags: ["Web Development", "UI/UX"],
  },
  {
    id: "demo-project",
    title: "Project Two",
    description: "Another amazing project showcasing our capabilities in creating impactful digital experiences.",
    image: "/vio.avif", // Using same image as placeholder
    imageAlt: "Project Two showcase image",
    tags: ["Web Development", "UI/UX"],
  },
  {
    id: "demo-project",
    title: "Project Two",
    description: "Another amazing project showcasing our capabilities in creating impactful digital experiences.",
    image: "/vio.avif", // Using same image as placeholder
    imageAlt: "Project Two showcase image",
    tags: ["Web Development", "UI/UX"],
  },
];

type Props = {};

const ProjectsGrid = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Array<{
    image: HTMLDivElement | null;
    text: HTMLDivElement | null;
    wrapper: HTMLDivElement | null;
  }>>(projects.map(() => ({ image: null, text: null, wrapper: null })));

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${100 * projects.length}%`,
        pin: true,
        scrub: 1,
      },
    });

    // Set initial states for all projects
    projectRefs.current.forEach((refs, index) => {
      if (refs.text) {
        gsap.set(refs.text, {
          x: "100%",
        });
      }
      if (refs.wrapper && index > 0) {
        gsap.set(refs.wrapper, {
          xPercent: 100,
        });
      }
    });

    // Create staggered animations for all projects
    projectRefs.current.forEach((refs, index) => {
      const duration = 1 / projects.length;
      const start = index * duration;

      // If not the first project, animate the previous project out
      if (index > 0 && projectRefs.current[index - 1].wrapper) {
        const prevRefs = projectRefs.current[index - 1];
        
        // Animate previous project out
        tl.to(prevRefs.wrapper, {
          xPercent: -100,
          ease: "none",
          duration: duration * 0.5,
        }, start);
      }

      // Animate current project in
      if (refs.wrapper && refs.text && refs.image) {
        // Slide in the wrapper
        tl.to(refs.wrapper, {
          xPercent: 0,
          ease: "none",
          duration: duration * 0.5,
        }, start);

        // After wrapper is in position, animate text and image simultaneously
        const contentStart = start + duration * 0.5;
        tl.to(refs.text, {
          x: 0,
          ease: "none",
          duration: duration * 0.5,
        }, contentStart)
        .to(refs.image, {
          width: "50%",
          ease: "none",
          duration: duration * 0.5,
        }, contentStart); // "<" makes it start at the same time as text
      }
    });

  }, { scope: containerRef });

  return (
    <div className="relative w-full overflow-x-hidden" style={{ height: `${150 * projects.length}vh` }}>
      <div ref={containerRef} className="h-screen relative w-full bg-white">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { if (el) projectRefs.current[index].wrapper = el; }}
            className="absolute top-0 left-0 w-full h-full"
            style={{ visibility: 'visible' }}
          >
            <div 
              ref={el => { if (el) projectRefs.current[index].image = el; }}
              className="h-full w-full relative p-12"
            >
              <div className="h-full w-full overflow-hidden rounded-[clamp(32px,1.8518518519vw,1.8518518519vw)]">
                <div className="h-full min-h-full w-full overflow-hidden relative">
                  <img
                    className="block w-full h-full min-w-full min-h-full max-w-none object-cover object-center"
                    src={project.image}
                    alt={project.imageAlt}
                  />
                </div>
              </div>
            </div>

            <div
              ref={el => { if (el) projectRefs.current[index].text = el; }}
              className="absolute top-0 right-0 min-w-[520px] w-[50%] h-full flex flex-col justify-end p-12"
            >
              <div className="pb-16 pr-8 text-left w-full">
                <h2 className="text-[#131518] mb-4 text-[72px] leading-[100%]">{project.title}</h2>
                <p className="mb-16 text-[#393f46] text-[24px] leading-[150%]">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-3 self-stretch items-start content-start">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full mb-16 w-fit border border-[#e7ded9] px-6 py-3"
                    >
                      {tag}
                    </span>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
