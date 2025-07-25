"use client";

import ProjectsGrid from "./projects-grid";
import { ServicesSection } from "./services-section";
// No import needed for "fusion nue" if it's a system font or already available globally.

const Page = () => {
  return (
    <main
      id="main-about"
      className="about-page bg-white w-full h-full min-h-screen"
    >
      <section className="h-screen bg-[#111] flex items-center justify-center">
        <h1 className="filled-bordered-text">design</h1>
      </section>
      <section className="h-screen flex items-center justify-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Section 2: Our Mission
        </h2>
      </section>
      {/* <AnimatedAbout /> */}
      <ProjectsGrid />
      <ServicesSection />
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
