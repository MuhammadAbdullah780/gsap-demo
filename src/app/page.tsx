"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

// List of all existing animation routes
const SHOWCASE_ROUTES = [
  { path: "/bonbon", title: "Sticky Scroll Reveal (BonBon)" },
  { path: "/home", title: "Home Page Scroll Effects" },
  { path: "/about", title: "About Page Complex Scroll" },
  { path: "/demo", title: "Simple GSAP Demo" },
];

const ShowcaseLandingPage = () => {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(".showcase-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.2,
    });
  }, { scope: container });

  return (
    <div ref={container} className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 p-8 sm:p-16">
      <header className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-4">
          GSAP Animation Portfolio
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A collection of high-fidelity web animations built with Next.js, TypeScript, and GSAP.
          Click on any section below to view the live demonstration of the animation technique.
        </p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-12">
        {SHOWCASE_ROUTES.map((route, index) => (
          <Link
            key={route.path}
            href={route.path}
            className="showcase-item block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {route.title}
              </h2>
              <span className="text-blue-500 dark:text-blue-400 text-3xl font-light">
                →
              </span>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              View the full-page animation experience.
            </p>
          </Link>
        ))}
      </main>

      <footer className="max-w-4xl mx-auto pt-12 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Developed by Muhammad Abdullah | Showcase built with Next.js and GSAP.</p>
      </footer>
    </div>
  );
};

export default ShowcaseLandingPage;
