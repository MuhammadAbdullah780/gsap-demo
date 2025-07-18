"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import CodeSvg from "./code-svg"; // Import the SVG component

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AnimatedAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLSpanElement>(null); // Ref for the SVG wrapper
  const [lastWhiteIndex, setLastWhiteIndex] = useState(-1);

  const highlightColor = "#fff";
  const baseColor = "#1A1C1F";

  // Array of words in the headline
  const arr = [
    "We",
    "help",
    "ambitious",
    "tech",
    "scale-ups",
    "thrive,",
    "through",
    "design",
    "and",
    "development",
  ];

  // Calculate the index of the last char in the first word
  const firstWordLastCharIndex = arr[0].length - 1;

  // Find the index of "and", "development", and "design"
  const andIdx = arr.findIndex((w) => w === "and");
  const developmentIdx = arr.findIndex((w) => w === "development");
  const designIdx = arr.findIndex((w) => w === "design");

  // --- SVG Animation Start: when the first char of "and" is revealed ---
  // Calculate the global char index of the first char of "and"
  let svgAnimStartCharIdx = 0;
  for (let i = 0; i < andIdx; i++) {
    svgAnimStartCharIdx += arr[i].length;
  }
  // svgAnimStartCharIdx is the global char index of the first char of "and"

  // The SVG animation should end when all chars are revealed
  const svgAnimEndCharIdx = arr.reduce((acc, w) => acc + w.length, 0) - 1;

  // Track SVG scale for width hiding
  const [svgScale, setSvgScale] = useState(0);

  // --- For "design" word: calculate its global char indices ---
  let designStartCharIdx = 0;
  for (let i = 0; i < designIdx; i++) {
    designStartCharIdx += arr[i].length;
  }
  const designEndCharIdx = designStartCharIdx + arr[designIdx].length - 1;

  // --- NEW: Calculate the global char index where "design" starts revealing ---
  // We'll reveal all chars up to the end of "through", then reveal "design" one-by-one as the cursor crosses it
  let throughIdx = arr.findIndex((w) => w === "through");
  let designRevealStartCharIdx = 0;
  for (let i = 0; i <= throughIdx; i++) {
    designRevealStartCharIdx += arr[i].length;
  }
  // designRevealStartCharIdx is the global char index where "design" should start revealing

  useGSAP(
    () => {
      const chars = gsap.utils.toArray<HTMLSpanElement>(".headline .char");
      if (!chars.length) return;

      let triggers: ScrollTrigger[] = [];

      const section = sectionRef.current;
      if (!section) return;

      chars.forEach((el) => {
        gsap.set(el, { color: baseColor, background: "none", WebkitTextStroke: "", textStroke: "" });
      });

      // Set initial SVG state: scale 0 (hidden)
      if (svgRef.current) {
        gsap.set(svgRef.current, { scale: 0 });
        setSvgScale(0);
      }

      // Timeline: 
      // 1. Reveal up to "through" char-by-char
      // 2. Reveal "design" char-by-char as the cursor crosses it
      // 3. Continue revealing "and" and "development" char-by-char

      const charsBeforeDesign = designRevealStartCharIdx;
      const designCharsCount = arr[designIdx].length;
      const charsAfterDesign = chars.length - (designRevealStartCharIdx + designCharsCount);

      const perCharDuration = 0.35;
      const totalDuration =
        charsBeforeDesign * perCharDuration +
        designCharsCount * perCharDuration +
        charsAfterDesign * perCharDuration;

      // SVG scaling should start when we start highlighting the first char of "and"
      // But since the timeline is now non-linear, we need to recalculate the time offset for SVG
      // Find the timeline time when "and" starts
      let andStartCharIdx = 0;
      for (let i = 0; i < andIdx; i++) {
        andStartCharIdx += arr[i].length;
      }
      let svgAnimStart =
        andStartCharIdx <= designRevealStartCharIdx
          ? andStartCharIdx * perCharDuration
          : charsBeforeDesign * perCharDuration +
            (andStartCharIdx - (designRevealStartCharIdx + designCharsCount)) * perCharDuration;
      const svgAnimEnd = totalDuration;
      const svgAnimDuration = svgAnimEnd - svgAnimStart;

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
        onUpdate: () => {
          let lastWhite = -1;

          const prog = tl.progress();
          const timelineTotal = totalDuration;
          const currentTime = prog * timelineTotal;

          // 1. Reveal up to "through" char-by-char
          // 2. Reveal "design" char-by-char as the cursor crosses it
          // 3. Continue revealing rest

          let whiteCharCount = 0;
          if (currentTime < charsBeforeDesign * perCharDuration) {
            // Still revealing up to "through"
            whiteCharCount = Math.floor(currentTime / perCharDuration);
          } else if (
            currentTime >= charsBeforeDesign * perCharDuration &&
            currentTime < (charsBeforeDesign + designCharsCount) * perCharDuration
          ) {
            // Revealing "design" one-by-one
            const designTime = currentTime - charsBeforeDesign * perCharDuration;
            const designCharsRevealed = Math.floor(designTime / perCharDuration);
            whiteCharCount = designRevealStartCharIdx + designCharsRevealed;
          } else {
            // After "design", continue revealing rest
            const afterDesignTime =
              currentTime - (charsBeforeDesign + designCharsCount) * perCharDuration;
            const afterDesignChars = Math.floor(afterDesignTime / perCharDuration);
            whiteCharCount = designRevealStartCharIdx + designCharsCount + afterDesignChars;
          }

          // Clamp to total chars
          if (whiteCharCount > chars.length) whiteCharCount = chars.length;

          // Set color for all chars
          chars.forEach((el, i) => {
            // For "design" chars, only reveal as the cursor crosses them
            if (i < whiteCharCount) {
              gsap.set(el, { color: highlightColor, background: "none", WebkitTextStroke: "", textStroke: "" });
              lastWhite = i;
            } else {
              gsap.set(el, { color: baseColor, background: "none", WebkitTextStroke: "", textStroke: "" });
            }
          });

          setLastWhiteIndex(lastWhite);

          // Update svgScale state for width hiding
          if (svgRef.current) {
            // Get current scale from gsap
            const scale = gsap.getProperty(svgRef.current, "scale") as number;
            setSvgScale(scale ?? 0);
          }

          // --- When "design" is fully revealed, apply special styles to its chars ---
          if (lastWhite >= designEndCharIdx) {
            for (let i = designStartCharIdx; i <= designEndCharIdx; i++) {
              gsap.set(chars[i], {
                color: "#131518",
                WebkitTextStroke: "1px #D1D1D1",
                textStroke: "1px #D1D1D1",
              });
            }
          } else {
            // Remove the special styles if not fully revealed
            for (let i = designStartCharIdx; i <= designEndCharIdx; i++) {
              // Only set color to highlight if the char is revealed, otherwise baseColor
              if (i < whiteCharCount) {
                gsap.set(chars[i], {
                  color: highlightColor,
                  WebkitTextStroke: "",
                  textStroke: "",
                });
              } else {
                gsap.set(chars[i], {
                  color: baseColor,
                  WebkitTextStroke: "",
                  textStroke: "",
                });
              }
            }
          }
        },
      });

      // Animate up to "through" char-by-char
      if (charsBeforeDesign > 0) {
        tl.to(
          {},
          { duration: charsBeforeDesign * perCharDuration }
        );
      }
      // Reveal "design" char-by-char
      if (designCharsCount > 0) {
        tl.to({}, { duration: designCharsCount * perCharDuration });
      }
      // Animate the rest char-by-char
      if (charsAfterDesign > 0) {
        tl.to(
          {},
          { duration: charsAfterDesign * perCharDuration }
        );
      }

      // Animate SVG: from scale 0 to scale 1, only scale, no transformOrigin, no rotation, no width change
      if (svgRef.current) {
        tl.fromTo(
          svgRef.current,
          { scale: 0 },
          {
            scale: 1,
            duration: svgAnimDuration,
            ease: "expo.out",
            onUpdate: () => {
              if (svgRef.current) {
                const scale = gsap.getProperty(
                  svgRef.current,
                  "scale"
                ) as number;
                setSvgScale(scale ?? 0);
              }
            },
          },
          svgAnimStart // start when the first char of "and" is revealed
        );
      }

      // Start animation when section top reaches top of viewport
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        // markers: true,
        onUpdate: (self) => {
          tl.progress(self.progress);
        },
        onLeaveBack: () => {
          chars.forEach((el) => {
            gsap.set(el, { color: baseColor, background: "none", WebkitTextStroke: "", textStroke: "" });
          });
          tl.progress(0);
          setLastWhiteIndex(-1);
          if (svgRef.current) {
            gsap.set(svgRef.current, { scale: 0 });
            setSvgScale(0);
          }
        },
        onLeave: () => {
          chars.forEach((el) => {
            gsap.set(el, { color: highlightColor, background: "none", WebkitTextStroke: "", textStroke: "" });
          });
          // Also apply the special style to "design" chars when fully revealed
          for (let i = designStartCharIdx; i <= designEndCharIdx; i++) {
            gsap.set(chars[i], {
              color: "#131518",
              WebkitTextStroke: "1px #D1D1D1",
              textStroke: "1px #D1D1D1",
            });
          }
          tl.progress(1);
          setLastWhiteIndex(chars.length - 1);
          if (svgRef.current) {
            gsap.set(svgRef.current, { scale: 1 });
            setSvgScale(1);
          }
        },
      });

      triggers.push(trigger);

      return () => {
        triggers.forEach((t) => t.kill());
        tl.kill();
        chars.forEach((el) => {
          gsap.set(el, { color: baseColor, background: "none", WebkitTextStroke: "", textStroke: "" });
        });
        setLastWhiteIndex(-1);
        if (svgRef.current) {
          gsap.set(svgRef.current, { scale: 0 });
          setSvgScale(0);
        }
      };
    },
    { scope: sectionRef }
  );

  let globalCharIdx = 0;

  // The headline is invisible (opacity: 0) until the first word is fully white
  // That is, lastWhiteIndex >= firstWordLastCharIndex
  const headlineVisible = lastWhiteIndex >= firstWordLastCharIndex;

  return (
    <section
      ref={sectionRef}
      className="h-screen about-section flex flex-col justify-center items-center px-6 transition-colors duration-700 bg-[#111] text-white"
    >
      <div
        className="headline text-3xl md:text-5xl font-bold flex flex-wrap justify-center mb-4 text-center leading-[76px]"
        style={{
          opacity: headlineVisible ? 1 : 0,
          transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {arr.map((word, idx) => (
          <span
            key={`headline-word-${idx}`}
            className="flex items-center whitespace-nowrap"
            style={{
              // Remove mx-1 for all, and add custom margin for all except SVG
              marginRight:
                idx === andIdx
                  ? 0 // No margin after "and" (SVG will be inserted)
                  : idx !== arr.length - 1 && idx !== andIdx
                  ? "0.32em"
                  : undefined,
            }}
          >
            {word.split("").map((char, charIdx) => {
              const thisCharIdx = globalCharIdx;
              globalCharIdx++;

              // SLOW DOWN: Increase color transition duration from 0.2s to 0.4s
              // For "design" chars, we want to keep the same size, but allow the color/stroke to be animated
              let style: React.CSSProperties = { transition: "color 0.4s" };

              // Only the last white (highlighted) char shows the indicator
              const showCursor = thisCharIdx === lastWhiteIndex;

              // SLOW DOWN: Make cursor blink slower (from 1s to 1.5s)
              let cursorStyle: React.CSSProperties = {
                boxShadow: "0 0 10px 2px #ff69b4, 0 0 6px 1.5px #ff69b4",
                animation: "blink-cursor 1.5s steps(1) infinite",
                opacity: showCursor ? 1 : 0,
                pointerEvents: "none",
                right: "-0.08em",
                left: "auto",
                transform: "translateY(-50%)",
                top: "50%",
                transition: "left 0.05s linear",
              };

              // Optionally, for "design" chars, add a transition for text-stroke
              if (
                thisCharIdx >= designStartCharIdx &&
                thisCharIdx <= designEndCharIdx
              ) {
                style.transition =
                  "color 0.4s, -webkit-text-stroke 0.4s, text-stroke 0.4s";
              }

              return (
                <span
                  key={`headline1-${idx}-char-${charIdx}`}
                  className="char inline-block text-[#1A1C1F] text-5xl relative"
                  style={style}
                >
                  {char}
                  {/* Blinking cursor: only visible at the last highlighted position */}
                  <span
                    className="cursor-blink z-10 absolute h-[0.85em] w-[0.055em] bg-pink-400 rounded blink"
                    style={cursorStyle}
                  />
                </span>
              );
            })}
            {/* Render SVG between "and" and "development" */}

            <span
              className={`${
                svgScale > 0 ? "w-fit" : idx === andIdx ? "w-5" : "w-0"
              } flex items-center`}
            >
              {idx === andIdx && (
                <span
                  className="flex items-center"
                  style={{
                    marginLeft: "0.32em",
                    marginRight: "0.32em",
                    // vertical alignment and shadow to match the screenshot
                    position: "relative",
                    top: "0.08em",
                    filter:
                      "drop-shadow(0 4px 12px #0a0a0a88) drop-shadow(0 1.5px 0 #0a0a0a44)",
                    width: 50,
                    transform: `scale(${svgScale || 0})`,
                    minWidth: 50,
                    maxWidth: 50,
                    overflow: "hidden",
                    display: "inline-flex",
                    willChange: "transform,width",
                    transition:
                      "width 0.18s cubic-bezier(0.4,0,0.2,1), min-width 0.18s cubic-bezier(0.4,0,0.2,1), max-width 0.18s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  ref={svgRef}
                >
                  <span
                    className="inline-block align-middle"
                    style={{ width: "fit-content" }}
                  >
                    <CodeSvg />
                  </span>
                </span>
              )}
            </span>

            {/* Only add space if not last word and not before SVG */}
            {idx !== arr.length - 1 && idx !== andIdx && null}
          </span>
        ))}
      </div>
    </section>
  );
}
