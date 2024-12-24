import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Smooth scrolling
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

requestAnimationFrame(raf);

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

const mainHeading = document.querySelectorAll(".main-heading");
const subText = document.getElementById("sub-text");
const stats = document.getElementById("stats");
const socials = document.getElementById("socials");
const mobileButton = document.getElementById("mobile-nav-btn");

gsap.set([subText, stats, socials], { opacity: 0 });
const tl = gsap.timeline();
tl.fromTo(
  mobileButton,
  {
    x: "-100%",
    opacity: 0,
  },
  {
    x: "0%",
    opacity: 1,
    duration: 0.8,
    stagger: 1,
    ease: "back.out",
  }
)
  .fromTo(
    mainHeading,
    {
      y: "100%",
      opacity: 0,
    },
    {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      stagger: 0.8,
      ease: "sine.inOut",
    }
  )
  .fromTo(
    [subText, stats, socials],
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
      ease: "sine.out",
    }
  );

// more button animation
document.querySelectorAll(".more-button").forEach((button) => {
  gsap.to(button, {
    y: -8,
    repeat: -1,
    yoyo: true,
    duration: 1,
  });
});

// Projects section animations
document.querySelectorAll(".section_projects").forEach((section) => {
  let triggers = section.querySelectorAll(".scroll-trigger-img");
  let items = section.querySelectorAll(".scroll-item");

  triggers.forEach((trigger, index) => {
    let background = trigger.querySelector(".scroll-img-bg");
    let item = items[index];

    if (index === 0) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        defaults: {
          ease: "none",
        },
      });
      tl.fromTo(
        item,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
      );
    } else if (index === items.length - 1) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
        defaults: {
          ease: "none",
        },
      });
      tl.fromTo(
        item,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      );
    } else {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        defaults: {
          ease: "none",
        },
      });
      tl.fromTo(
        item,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
      );
      tl.to(item, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
    }

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      defaults: {
        ease: "none",
      },
    });
    tl2.to(background, { yPercent: 50 });
  });
});

// Nav animation

const nav = document.getElementById("nav");
const navLinks = document.getElementById("nav-list");
let isNavOpen = false;

mobileButton?.addEventListener("click", () => {
  isNavOpen = !isNavOpen;

  if (isNavOpen) {
    // Open animation
    const tl = gsap.timeline();
    tl.set(nav, {
      display: "flex",
    })
      .to(nav, {
        scale: 1,
        duration: 0.6,
        ease: "sine.inOut",
      })
      .to(
        navLinks,
        {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .to(
        mobileButton,
        {
          innerHTML: "✕",
          duration: 0.1,
        },
        "-=0.3"
      );
  } else {
    // Close animation
    const tl = gsap.timeline();
    tl.to(navLinks, {
      opacity: 0,
      duration: 0.3,
      ease: "sine.inOut",
    })
      .to(nav, {
        scale: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .set(nav, { display: "none" })
      .to(
        mobileButton,
        {
          innerHTML: "☰",
          duration: 0.1,
        },
        "-=0.6"
      );
  }
});
