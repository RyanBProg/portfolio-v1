export default function Header(): string {
  return `
    <header class="z-20 p-[5px] h-[50px] md:p-5 md:h-fit" id="header">
      <nav class="absolute h-[calc(100dvh-10px)] w-[200px] flex items-center pl-5 bg-black rounded-xl transform -translate-x-[225px] md:relative md:bg-transparent md:rounded-none md:translate-x-0" id="nav">
        <ul class="list-none">
          <li>
            <a href="#" class="active text-white font-medium transition-colors md:text-black hover:text-neutral-500" id="home-nav-button">Home</a>
          </li>
          <li>
            <a href="#" class="text-white font-medium transition-colors md:text-black hover:text-neutral-500" id="about-nav-button">About</a>
          </li>
          <li>
            <a href="#" class="text-white font-medium transition-colors md:text-black hover:text-neutral-500" id="portfolio-nav-button">Portfolio</a>
          </li>
          <li>
            <a href="#" class="text-white font-medium transition-colors md:text-black hover:text-neutral-500" id="contact-nav-button">Contact</a>
          </li>
        </ul>
      </nav>
      <button class="block w-10 h-10 rounded-md text-white bg-black border-none transition-colors translate-x-0 hover:cursor-pointer hover:text-neutral-500 md:hidden" id="mobile-nav-btn">X</button>
    </header>
  `;
}
