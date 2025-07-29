"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

type Props = {};

const MOCK = [
  {
    id_count: "01",
    title: "How BonBon Works",
    text: "No more messy group chats or indecisive friends. Here’s how BonBon makes planning simple, fast, and actually fun.",
    image: "/proj-1.avif",
  },
  {
    id_count: "02",
    title: "Plan Smarter with BonBon",
    text: "Watch how BonBon transforms chaotic planning into a smooth, shareable experience your whole group will love.",
    image: "/proj-2.avif",
  },
];

gsap.registerPlugin(ScrollTrigger);

const StickyScrollReveal = (props: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const slidesWrapperRef = useRef<HTMLDivElement>(null);
  const imagesWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !slidesWrapperRef.current) return;

    const slides = slidesWrapperRef.current.children;
    const totalSlides = slides.length;

    // Create the scroll trigger animation
    gsap.to(slidesWrapperRef.current, {
      y: () => -(slidesWrapperRef.current!.offsetHeight - window.innerHeight),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (totalSlides - 1)}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Calculate active index based on scroll progress
          const newIndex = Math.round(self.progress * (totalSlides - 1));
          setActiveIndex(newIndex);
        },
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen max-w-[1300px] w-full mx-auto block"
    >
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex flex-col col-span-1 justify-center items-start h-screen relative overflow-hidden">
          <div 
            ref={slidesWrapperRef} 
            className="absolute top-0 left-0 w-full"
          >
            {MOCK.map((item) => (
              <div 
                key={item.id_count} 
                className="h-screen flex flex-col justify-center px-8"
              >
                <p className="mb-5 text-[30px]">{item.id_count}</p>
                <h1 className="mb-5 text-[35px] font-bold max-w-[300px]">
                  {item.title}
                </h1>
                <p className="mb-0 text-[17px] max-w-[500px]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        {/* Right: Vertically translating images */}
        <div className="flex-1 flex items-center justify-center relative h-full">
          <img
            src={MOCK[activeIndex].image}
            alt={MOCK[activeIndex].title}
            className="rounded-lg object-cover"
            style={{
              width: "420px",
              height: "260px",
              boxShadow: "0 4px 32px 0 rgba(0,0,0,0.08)",
              background: "#fff",
              transition: "all 0.5s",
              display: "block",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default StickyScrollReveal;
