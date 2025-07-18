import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface TechScribbleProps {
  progress: number;
}

export default function TechScribble({ progress }: TechScribbleProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        // Set the dasharray once
        pathRef.current.style.strokeDasharray = `${length}`;
        // Animate the dashoffset with gsap
        gsap.to(pathRef.current, {
          strokeDashoffset: length - length * progress,
          duration: 0.4,
          overwrite: "auto",
          ease: "power1.out",
        });
      }
    },
    { dependencies: [progress] }
  );

  return (
    <svg
      fill="none"
      height="103"
      width="213"
      viewBox="0 0 213 103"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        left: "-15%",
        top: "-10%",
        width: "130%",
        height: "120%",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <path
        ref={pathRef}
        d="M76.8084 2.10631C234.641 -1.54187 266 100.606 99.3551 100.606C-18.71 100.606 -39.3503 2.10631 99.3553 13.9627"
        stroke="#726965"
        strokeLinecap="round"
        strokeWidth="3"
        style={{
          opacity: 1,
          transition: "none",
        }}
      />
    </svg>
  );
}