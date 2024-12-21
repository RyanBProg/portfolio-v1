import "./style.css";
import Header from "./components/header.ts";
import Home from "./pages/home.ts";
import Projects from "./pages/projects.ts";
import About from "./pages/about.ts";
import Contact from "./pages/contact.ts";

document.getElementById("header-cont")!.innerHTML = Header();
document.querySelector<HTMLDivElement>("#app")!.innerHTML = Home();

const header = document.getElementById("header");
const mobileButton = document.getElementById("mobile-nav-btn");

mobileButton?.addEventListener("click", () => {
  if (header?.classList.contains("mobile-nav-open")) {
    header?.classList.remove("mobile-nav-open");
  } else {
    header?.classList.add("mobile-nav-open");
  }
});

const navButtons = document.querySelectorAll("[id$='nav-button']");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    switch (button.id) {
      case "home-nav-button":
        document.querySelector<HTMLDivElement>("#app")!.innerHTML = Home();
        break;
      case "about-nav-button":
        document.querySelector<HTMLDivElement>("#app")!.innerHTML = About();
        break;
      case "portfolio-nav-button":
        document.querySelector<HTMLDivElement>("#app")!.innerHTML = Projects();
        break;
      case "contact-nav-button":
        document.querySelector<HTMLDivElement>("#app")!.innerHTML = Contact();
        break;
    }
  });
});
