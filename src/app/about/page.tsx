"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { AnimatedAbout } from "./animated-about";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Page = () => {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".box-c",
        pin: true,
        start: "center center",
        end: "+=300",
        // markers: true,
      });
    },
    { scope: main }
  );

  // useIsomorphicLayoutEffect(() => {
  //   const mainAbout = document.getElementById("main-about");
  //   if (!mainAbout) return;

  //   // Helper to create the ScrollTrigger
  //   const createBgScrollTrigger = () => {
  //     scrollTriggerRef.current = gsap.fromTo(
  //       mainAbout,
  //       { backgroundColor: "#fff" },
  //       {
  //         backgroundColor: "#191d2b",
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: ".about-section",
  //           start: "top bottom",
  //           end: "bottom top",
  //           scrub: 1,
  //           markers: true,
  //           onLeave: () => {
  //             gsap.to(mainAbout, { backgroundColor: "#fff", duration: 0.3 });
  //             scrollTriggerRef.current?.scrollTrigger?.kill();
  //             scrollTriggerRef.current = null;
  //           },
  //           onLeaveBack: () => {
  //             gsap.to(mainAbout, { backgroundColor: "#fff", duration: 0.3 });
  //             scrollTriggerRef.current?.scrollTrigger?.kill();
  //             scrollTriggerRef.current = null;
  //           },
  //           onEnter: () => {
  //             // Re-create the ScrollTrigger when entering from above
  //             if (!scrollTriggerRef.current) createBgScrollTrigger();
  //           },
  //           onEnterBack: () => {
  //             // Re-create the ScrollTrigger when entering from below
  //             if (!scrollTriggerRef.current) createBgScrollTrigger();
  //             gsap.to(mainAbout, {
  //               backgroundColor: "#191d2b",
  //               duration: 0.3,
  //             });
  //           },
  //         },
  //       }
  //     );
  //   };

  //   createBgScrollTrigger();

  //   return () => {
  //     scrollTriggerRef.current?.scrollTrigger?.kill();
  //     scrollTriggerRef.current = null;
  //   };
  // }, []);

  return (
    <main
      id="main-about"
      ref={main}
      className="about-page bg-white w-full h-full min-h-screen"
    >
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Section 1: About Us
        </h2>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Section 2: Our Mission
        </h2>
      </section>
      <AnimatedAbout />
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Section 3: Our Team
        </h2>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">Section 4: Contact</h2>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">Section 5: Careers</h2>
      </section>
    </main>
  );
};

export default Page;
