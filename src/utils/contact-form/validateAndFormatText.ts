const STRIP_TAGS_REGEX = /<[^>]*>/g;
const NORMALISE_WHITESPACE_REGEX = /\s+/g;
const STRIP_UNSAFE_SYMBOLS_REGEX = /[^a-zA-Z0-9\s'"?&!.,]/g;

export default function validateAndFormatText(input: string) {
  if (typeof input !== "string") return "";

  const text = input
    .trim()
    .replace(STRIP_TAGS_REGEX, "")
    .replace(STRIP_UNSAFE_SYMBOLS_REGEX, "")
    .replace(NORMALISE_WHITESPACE_REGEX, " ");

  return text;
}
