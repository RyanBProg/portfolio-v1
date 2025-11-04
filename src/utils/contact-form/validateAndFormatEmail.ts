export default function validateAndFormatEmail(input: string) {
  if (typeof input !== "string") return "";

  const email = input.trim().toLowerCase();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  return emailRegex.test(email) ? email : "";
}
