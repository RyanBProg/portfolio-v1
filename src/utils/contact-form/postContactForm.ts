export default async function postContactForm(
  name: string,
  email: string,
  message: string,
  token: string | null,
  fetchFn = fetch,
) {
  try {
    const res = await fetchFn("/api/sendEmail.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        token,
      }),
    });

    if (!res.ok) {
      throw new Error("Internal Server Error");
    }

    return await res.json();
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Internal Server Error");
  }
}
