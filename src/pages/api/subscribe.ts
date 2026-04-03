import type { APIRoute } from "astro";

export const prerender = false;

interface SubscribeBody {
  email?: string;
}

export const POST: APIRoute = async ({ request }) => {
  const corsHeaders = {
    "Content-Type": "application/json",
  };

  // Parse request body
  let body: SubscribeBody;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const { email } = body;

  // Basic validation
  if (!email || typeof email !== "string") {
    return new Response(
      JSON.stringify({ error: "Email is required" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: "Invalid email format" }),
      { status: 400, headers: corsHeaders }
    );
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const pdfLeadMagnetUrl = import.meta.env.PDF_LEAD_MAGNET_URL;
  const fromEmail = import.meta.env.FROM_EMAIL ?? "hello@example.com";
  const fromName = import.meta.env.FROM_NAME ?? "Example Site";

  if (!resendApiKey) {
    console.error("[subscribe] RESEND_API_KEY not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: corsHeaders }
    );
  }

  if (!pdfLeadMagnetUrl) {
    console.error("[subscribe] PDF_LEAD_MAGNET_URL not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: corsHeaders }
    );
  }

  const htmlBody = `
    <p>Merci pour votre inscription !</p>
    <p>Voici le lien pour télécharger votre guide :</p>
    <p><a href="${pdfLeadMagnetUrl}">Télécharger le guide PDF</a></p>
    <hr />
    <p style="color:#888;font-size:12px;">
      Vous recevez cet e-mail car vous avez demandé notre guide gratuit.
    </p>
  `.trim();

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${fromName} <${fromEmail}>`,
        to: [email],
        subject: "Votre guide PDF gratuit",
        html: htmlBody,
        attachments: [
          {
            filename: "guide.pdf",
            path: pdfLeadMagnetUrl,
          },
        ],
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.json().catch(() => ({}));
      console.error("[subscribe] Resend API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 502, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
};

// Reject non-POST methods
export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
};
