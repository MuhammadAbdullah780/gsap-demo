"use client";

import { useIsomorphicLayoutEffect } from "@/hooks/use-isomorphic-layout";
import gsap from "gsap";
import { useRef } from "react";

type Props = {};

const Page = (props: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main>
      <section
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <h1 className="hero-title text-6xl font-bold text-gray-900">
          We are Yummygum
        </h1>
      </section>
    </main>
  );
};

export default Page;
