export default function Contact() {
  return `
  <section class="flex flex-col justify-center h-full">
    <h1 class="font-bold text-3xl">Contact Me</h1>
    <form class="flex flex-col gap-4 mt-4 max-w-[60ch]">
      <label class="flex flex-col">
        <span class="font-bold text-xl">Name</span>
        <input type="text" class="border p-2 rounded" placeholder="Your Name" required>
      </label>
      <label class="flex flex-col">
        <span class="font-bold text-xl">Email</span>
        <input type="email" class="border p-2 rounded" placeholder="Your Email" required>
      </label>
      <label class="flex flex-col">
        <span class="font-bold text-xl">Message</span>
        <textarea class="border p-2 rounded" rows="5" placeholder="Your Message" required></textarea>
      </label>
      <button type="submit" class="bg-neutral-500 rounded-xl p-3 text-white font-bold mt-4">
        Send Message
      </button>
    </form>
  </section>`;
}
