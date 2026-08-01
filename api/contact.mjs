const RESEND_API_URL = "https://api.resend.com/emails";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clean(value, maxLength = 500) {
  return String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return json({ error: "Unsupported request format." }, 415);
    }

    const body = await request.json();

    // Honeypot field. Bots commonly complete hidden fields.
    if (clean(body.website, 200)) {
      return json({ success: true });
    }

    const name = clean(body.name, 100);
    const email = clean(body.email, 180).toLowerCase();
    const company = clean(body.company, 160);
    const size = clean(body.size, 40);
    const message = clean(body.message, 3000);

    if (!name || !email || !company || !size) {
      return json({ error: "Please complete all required fields." }, 400);
    }

    if (!isEmail(email)) {
      return json({ error: "Please enter a valid email address." }, 400);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "hello@estavo.io";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Estavo Website <enquiries@mail.estavo.io>";

    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return json({ error: "The enquiry service is temporarily unavailable." }, 503);
    }

    const subjectCompany = company.replace(/[\r\n]+/g, " ").slice(0, 80);
    const submittedAt = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/London"
    }).format(new Date());

    const emailHtml = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#17233f;max-width:680px;margin:0 auto">
        <h1 style="font-size:24px;margin-bottom:6px">New Estavo website enquiry</h1>
        <p style="color:#667085;margin-top:0">Submitted ${escapeHtml(submittedAt)}</p>
        <table style="width:100%;border-collapse:collapse;margin:24px 0">
          <tr><td style="padding:10px;border-bottom:1px solid #e4e8ef;font-weight:700;width:150px">Name</td><td style="padding:10px;border-bottom:1px solid #e4e8ef">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e4e8ef;font-weight:700">Email</td><td style="padding:10px;border-bottom:1px solid #e4e8ef"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e4e8ef;font-weight:700">Company</td><td style="padding:10px;border-bottom:1px solid #e4e8ef">${escapeHtml(company)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e4e8ef;font-weight:700">Team size</td><td style="padding:10px;border-bottom:1px solid #e4e8ef">${escapeHtml(size)}</td></tr>
        </table>
        <h2 style="font-size:18px">How can we help?</h2>
        <div style="white-space:pre-wrap;background:#f7f8fb;border:1px solid #e4e8ef;border-radius:10px;padding:16px">${escapeHtml(message || "No message provided.")}</div>
        <p style="margin-top:24px;color:#667085">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
      </div>`;

    const resendResponse = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New Estavo enquiry - ${subjectCompany}`,
        html: emailHtml,
        text: [
          "New Estavo website enquiry",
          `Submitted: ${submittedAt}`,
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company}`,
          `Team size: ${size}`,
          "",
          "How can we help?",
          message || "No message provided."
        ].join("\n")
      })
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error("Resend contact email failed:", resendData);
      return json({ error: "Your enquiry could not be sent. Please email hello@estavo.io." }, 502);
    }

    return json({ success: true, id: resendData.id });
  } catch (error) {
    console.error("Contact function failed:", error);
    return json({ error: "Your enquiry could not be sent. Please try again." }, 500);
  }
}

export function GET() {
  return json({ status: "ok", service: "Estavo contact form" });
}
