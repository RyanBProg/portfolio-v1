export default function Home() {
  return `
  <section class="flex flex-col justify-center h-full">
    <h1 class="font-bold text-3xl">Hi, I'm Ryan Bowler</h1>
    <p class="text-xl mt-2 max-w-[60ch]">
      A passionate <span class="font-bold">Full Stack Developer</span> and
      professional problem solver who loves to build things!
    </p>
    <div class="mt-16 flex gap-5">
      <div>
        <h2 class="font-bold text-xl">3+ Years</h2>
        <p>Coding experience</p>
      </div>
      <div>
        <h2 class="font-bold text-xl">10+ Years</h2>
        <p>Engineering experience</p>
      </div>
      <div>
        <h2 class="font-bold text-xl">5+ Projects</h2>
        <p>Project delivered</p>
      </div>
    </div>
    <div class="flex gap-5 mt-6">
      <button class="bg-neutral-500 rounded-xl block h-20 w-20 text-xs">
        GitHub
      </button>
      <button class="bg-neutral-500 rounded-xl block h-20 w-20 text-xs">
        LinkedIn
      </button>
      <button class="bg-neutral-500 rounded-xl block h-20 w-20 text-xs">
        Resume
      </button>
    </div>
  </section>`;
}
