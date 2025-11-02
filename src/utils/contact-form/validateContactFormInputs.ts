import validateAndFormatText from "./validateAndFormatText";
import validateAndFormatEmail from "./validateAndFormatEmail";

type ValidationResult =
  | { success: true; data: { name: string; email: string; message: string } }
  | { success: false; status: number; message: string };

export default function validateContactFormInputs(
  name: string,
  email: string,
  message: string,
): ValidationResult {
  const saniName = validateAndFormatText(name);
  if (!saniName || saniName.length < 2 || saniName.length > 50) {
    return {
      success: false,
      message:
        "Name must be 2 - 50 characters long. Allowed characters: letters, spaces, hyphens (-), apostrophes ('), double quotes (\") , question marks (?), ampersands (&), and exclamation marks (!).",
      status: 422,
    };
  }

  const saniEmail = validateAndFormatEmail(email);
  if (!saniEmail) {
    return {
      success: false,
      message: "Invalid email format",
      status: 422,
    };
  }

  const saniMessage = validateAndFormatText(message);
  if (!saniMessage || saniMessage.length < 10 || saniMessage.length > 300) {
    return {
      success: false,
      message:
        "Message must be 10 - 300 characters long. Allowed characters: letters, spaces, hyphens (-), apostrophes ('), double quotes (\") , question marks (?), ampersands (&), and exclamation marks (!).",
      status: 422,
    };
  }

  return {
    success: true,
    data: { name: saniName, email: saniEmail, message: saniMessage },
  };
}
