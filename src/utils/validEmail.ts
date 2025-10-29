export default function validEmail(email: string): boolean {
  if (email.trim() === "") {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return false;
  } else {
    return true;
  }
}
