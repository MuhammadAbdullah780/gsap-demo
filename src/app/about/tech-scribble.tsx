import { useEffect, useRef } from "react";

interface TechScribbleProps {
  scale: number;
  progress: number; // Add progress prop for scroll-based animation
}

export default function TechScribble({ scale, progress }: TechScribbleProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      // Get the total length of the path for precise animation
      const length = pathRef.current.getTotalLength();
      
      // Set initial state
      pathRef.current.style.strokeDasharray = `${length}`;
      
      // Calculate stroke-dashoffset based on scroll progress
      const offset = length - (length * progress);
      pathRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [progress]);

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
        width: "130%", // Reduced from 160%
        height: "120%", // Reduced from 140%
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <path
        ref={pathRef}
        d="M76.8084 2.10631C234.641 -1.54187 266 100.606 99.3551 100.606C-18.71 100.606 -39.3503 2.10631 99.3553 13.9627"
        stroke="#726965"
        strokeLinecap="round"
        strokeWidth="3" // Reduced from 4 to make it more subtle
        style={{
          opacity: 1,
          transition: "none",
        }}
      />
    </svg>
  );
} 