"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Map } from "lucide-react";
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // Refs for animations
  const textBlock1Ref = useRef<HTMLDivElement | null>(null);
  const polaroid1Ref = useRef<HTMLDivElement | null>(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  
  const guidesHeaderRef = useRef<HTMLDivElement | null>(null);
  const guidesColsRef = useRef<HTMLDivElement | null>(null);
  
  const connectTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Set everything to final state immediately using scoped queries
        const scope = sectionRef.current;
        if (scope) {
          gsap.set(scope.querySelectorAll(".about-reveal-text"), { opacity: 1, y: 0 });
          const mainPol = scope.querySelector(".about-polaroid-main");
          if (mainPol) gsap.set(mainPol, { opacity: 1, scale: 1, rotate: "4deg", filter: "blur(0px)" });
          gsap.set(scope.querySelectorAll(".about-path"), { strokeDashoffset: 0 });
        }
        return;
      }

      // ─── Animation 1: About Me Block (Text & Main Polaroid & Path) ───
      if (textBlock1Ref.current) {
        const textElements = textBlock1Ref.current.querySelectorAll(".about-reveal-text");
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textBlock1Ref.current,
              start: "top 80%",
            },
          }
        );
      }

      if (polaroid1Ref.current) {
        gsap.fromTo(
          polaroid1Ref.current,
          { opacity: 0, scale: 0.92, rotate: "8deg", filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            rotate: "4deg",
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: polaroid1Ref.current,
              start: "top 75%",
            },
          }
        );
      }

      if (path1Ref.current) {
        const path = path1Ref.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: textBlock1Ref.current,
            start: "top 70%",
          },
        });
      }

      // ─── Animation 2: What Guides Me Block ───
      if (guidesHeaderRef.current) {
        gsap.fromTo(
          guidesHeaderRef.current.querySelectorAll(".about-reveal-guides-hdr"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: guidesHeaderRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (guidesColsRef.current) {
        gsap.fromTo(
          guidesColsRef.current.querySelectorAll(".about-guide-col"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: guidesColsRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // ─── Animation 3: Let's Connect Block ───
      if (connectTextRef.current) {
        const textElements = connectTextRef.current.querySelectorAll(".about-reveal-connect");
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: connectTextRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      {/* Background paper texture overlay */}
      <div className="about-paper-grain" aria-hidden="true" />

      {/* ─── BLOCK 1: About Me ─── */}
      <div className="about-container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        
        {/* Trajectory Path behind Block 1 */}
        <svg className="about-trajectory-svg" aria-hidden="true" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            ref={path1Ref}
            className="about-path"
            d="M 40,820 C 100,550 120,280 300,280 C 450,280 580,680 750,600 C 900,530 980,320 1150,300"
            fill="none"
            stroke="rgba(196, 154, 71, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 14"
          />
          {/* Hand-drawn styled arrowhead near the end */}
          <path
            className="about-arrow"
            d="M 1140,292 L 1150,300 L 1138,308"
            fill="none"
            stroke="#c49a47"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="about-me-row flex flex-col lg:flex-row justify-between items-start">
          {/* Left Column: Biography Text (45% Width) */}
          <div ref={textBlock1Ref} className="about-text-column flex flex-col items-start relative z-20">
            <span className="about-eyebrow about-reveal-text">ABOUT ME</span>
            <h2 id="about-heading" className="about-title about-reveal-text">
              Telling stories<br />that stay.
            </h2>
            
            {/* Gold Decorative Divider exactly matching Stories */}
            <div className="about-divider about-reveal-text" aria-hidden="true">
              <span className="divider-star">✦</span>
            </div>

            <div className="about-bio-container max-w-[480px] about-reveal-text">
              <p className="about-bio-paragraph">
                I'm Jose Vincent, a photographer based in New Zealand.
              </p>
              <p className="about-bio-paragraph">
                My work is about connection—honest moments, real people, and the beauty found in everyday places.
              </p>
              <p className="about-bio-paragraph">
                I travel, I listen, and I look for the be-between moments that often go unnoticed. The ones that become the stories we hold onto.
              </p>
              <p className="about-bio-paragraph about-bio-footer">
                This is my way of paying attention.
              </p>
            </div>
          </div>

          {/* Right Column: Floating Portrait Polaroid (35% Width) */}
          <div className="about-image-column flex justify-center lg:justify-end relative z-20">
            <div ref={polaroid1Ref} className="about-polaroid-main polaroid-card">
              <div className="polaroid-image-wrapper">
                <Image
                  src="/images/jose.jpeg"
                  alt="Jose Vincent holding a camera at the beach"
                  width={320}
                  height={400}
                  priority
                  className="polaroid-image"
                  sizes="(max-width: 768px) 90vw, 320px"
                />
              </div>
              <div className="polaroid-footer">
                <span className="polaroid-signature">Jose Vincent</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BLOCK 2: What Guides Me ─── */}
      <div className="about-guides-section relative z-10">
        <div className="about-container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div ref={guidesHeaderRef} className="flex flex-col items-center mb-10">
            <span className="about-eyebrow text-center about-reveal-guides-hdr">WHAT GUIDES ME</span>
            <div className="about-divider about-reveal-guides-hdr justify-center w-[240px] mt-4" aria-hidden="true">
              <span className="divider-star">✦</span>
            </div>
          </div>

          <div ref={guidesColsRef} className="about-guides-container flex flex-col md:flex-row justify-center items-stretch relative">
            {/* Guide 1: Story First */}
            <div className="about-guide-card about-guide-col flex flex-col items-center text-center relative">
              <div className="guide-icon-circle">
                {/* Thin-line camera SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3L14.5 4Z" />
                  <circle cx="12" cy="13" r="3" />
                  <path d="M18.5 9h.01" />
                </svg>
              </div>
              <h3 className="guide-title">STORY FIRST</h3>
              <p className="guide-desc">Every photograph begins with curiosity and respect for the moment.</p>
              {/* Vertical divider */}
              <div className="guide-vertical-divider hidden md:block" aria-hidden="true" />
            </div>

            {/* Guide 2: People Always */}
            <div className="about-guide-card about-guide-col flex flex-col items-center text-center relative">
              <div className="guide-icon-circle">
                {/* Thin-line heart SVG */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <h3 className="guide-title">PEOPLE ALWAYS</h3>
              <p className="guide-desc">The people I photograph are at the heart of every story.</p>
              {/* Vertical divider */}
              <div className="guide-vertical-divider hidden md:block" aria-hidden="true" />
            </div>

            {/* Guide 3: Place Matters */}
            <div className="about-guide-card about-guide-col flex flex-col items-center text-center relative">
              <div className="guide-icon-circle">
                {/* Thin-line mountains SVG */}
                <svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="#c49a47"
  strokeWidth="1.2"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.5-6 11-6 11Z" />
  <circle cx="12" cy="10" r="2.5" />
</svg>
              </div>
              <h3 className="guide-title">PLACE MATTERS</h3>
              <p className="guide-desc">I seek out places that shape us and the stories we remember.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BLOCK 3: Let's Connect ─── */}
      <div id="contact" className="about-connect-section relative z-10">
        <div className="about-container max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative">
          
          <div className="flex flex-col items-start w-full">
            {/* Left Column: Connect Details */}
            <div ref={connectTextRef} className="flex flex-col items-start relative z-20 w-full max-w-[600px]">
              <span className="about-eyebrow about-reveal-connect">LET'S CONNECT</span>
              <h2 className="about-title about-title--connect about-reveal-connect">
                Let's create<br />something meaningful.
              </h2>

              {/* Gold Decorative Divider exactly matching Stories */}
              <div className="about-divider about-reveal-connect" aria-hidden="true">
                <span className="divider-star">✦</span>
              </div>

              {/* Contact List with new typography hierarchy */}
              <div className="about-contact-list w-full max-w-[460px] mt-8 about-reveal-connect">
                
                {/* Contact Item: Email */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">EMAIL</span>
                    <a href="mailto:josevincentphoto@gmail.com" className="contact-link"> jkclicks2@gmail.com</a>
                  </div>
                </div>

                {/* Contact Item: Phone */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">PHONE</span>
                    <a href="tel:+64220957125" className="contact-link">+64 22 095 7125</a>
                  </div>
                </div>

                {/* Contact Item: Location */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">LOCATION</span>
                    <span className="contact-value">Auckland, New Zealand</span>
                  </div>
                </div>

                {/* Contact Item: Instagram */}
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c49a47" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div className="contact-details">
                    <span className="contact-label">INSTAGRAM</span>
                    <a href="https://www.instagram.com/jk_clicks13?utm_source=qr&igsh=OHl4YTcybWVkcHFp#" target="_blank" rel="noopener noreferrer" className="contact-link">@jk_clicks13</a>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
