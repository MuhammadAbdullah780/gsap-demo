"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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

  //   useGSAP(
  //     () => {
  //       if (
  //         !sectionRef.current ||
  //         !slidesWrapperRef.current ||
  //         !imagesWrapperRef.current
  //       )
  //         return;

  //       // Animate vertical translation of slides and images in sync with scroll
  //       const slideHeight = window.innerHeight * 0.7; // or a fixed value, adjust as needed
  //       const totalSlides = MOCK.length;
  //       const totalScroll = slideHeight * (totalSlides - 1);

  //       // Slides vertical translation
  //       gsap.to(slidesWrapperRef.current, {
  //         y: () => `-${totalScroll}px`,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: () => `+=${totalScroll}`,
  //           scrub: true,
  //           pin: true,
  //         },
  //       });

  //       // Images vertical translation
  //       gsap.to(imagesWrapperRef.current, {
  //         y: () => `-${totalScroll}px`,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: () => `+=${totalScroll}`,
  //           scrub: true,
  //           pin: false,
  //         },
  //       });
  //     },
  //     { dependencies: [] }
  //   );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen max-w-[1300px] w-full mx-auto block"
    >
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex flex-col col-span-1 justify-center items-start h-full">
          <p className="mb-5 text-[30px] text-center">{MOCK[0].id_count}</p>
          <h1 className="mb-5 text-[35px] font-bold max-w-[300px]">
            {MOCK[0].title}
          </h1>
          <p className="mb-0 text-[17px] max-w-[500px]">
            {MOCK[0].text}
          </p>
        </div>
        {/* Right: Vertically translating images */}
        <div className="flex-1 flex items-center justify-center relative h-full">
          <img
            src={MOCK[0].image}
            alt={MOCK[0].title}
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
