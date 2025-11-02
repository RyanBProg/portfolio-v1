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
      body: JSON.stringify({
        name,
        email,
        message,
        token,
      }),
    });

    if (!res.ok) throw new Error("Interal Server Error");

    return await res.json();
  } catch (error) {
    return new Error("Interal Server Error");
  }
}
