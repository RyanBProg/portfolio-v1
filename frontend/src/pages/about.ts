export default function About() {
  return `
  <section class="flex flex-col justify-center h-full">
    <h1 class="font-bold text-3xl">About Me</h1>
    <p class="text-base mt-2 max-w-[60ch]">
      My programming journey started in 2022, when I began writing small scripts for our CAD software, I discovered how much I enjoyed coding and I've been hooked ever since. What started as a few small scripts turned into a whole suite of tools that helped streamline our work, and that's when I realized it was time for a career change.
    </p>
    <p class="text-base mt-2 max-w-[60ch]">
      I dove head-first into web development, spending my evenings (and plenty of late nights!) learning everything I could. Fast forward to today, and I've earned a few web development qualifications and built several projects that I'm really proud of. For the previous 10 years, I worked as a mechanical design engineer in the world of special-purpose machinery and food processing.
    </p>
    <p class="text-base mt-2 max-w-[60ch]">
      Now, I get to combine my engineering mindset with my passion for coding to build responsive, scalable apps that solve real-world problems. Whether it's crafting a sleek front-end or getting into the nitty-gritty of the back-end, I love what I do—and I'm always up for the next challenge.
    </p>
    <div>
      <h2 class="font-bold text-xl">Technologies I've Used</h2>
      <div class="flex gap-3 text-sm">
        <div class="bg-neutral-500 rounded-md p-2">Typescript</div>
        <div class="bg-orange-500 rounded-md p-2">Next.js</div>
        <div class="bg-red-500 rounded-md p-2">Express.js</div>
        <div class="bg-black rounded-md text-white p-2">Tailwind</div>
      </div>
    </div>
  </section>`;
}
