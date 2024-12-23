import "./style.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mainHeading = document.querySelectorAll(".main-heading");
const subText = document.getElementById("sub-text");
const stats = document.getElementById("stats");
const socials = document.getElementById("socials");
const mobileButton = document.getElementById("mobile-nav-btn");

// Set initial states
gsap.set([subText, stats, socials], { opacity: 0 });

// Create timeline
const tl = gsap.timeline();

// Add animations to timeline
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
    duration: 0.6,
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
