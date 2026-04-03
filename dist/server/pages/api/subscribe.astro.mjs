export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const corsHeaders = {
    "Content-Type": "application/json"
  };
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { status: 400, headers: corsHeaders }
    );
  }
  const { email } = body;
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
  {
    console.error("[subscribe] RESEND_API_KEY not set");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500, headers: corsHeaders }
    );
  }
};
const GET = () => {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
