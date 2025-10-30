import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "soulsatizfier@gmail.com",
        pass: "Deva@2003",
      },
    });

    await transporter.sendMail({
      from: "soulsatizfier@gmail.com",
      to: email,
      subject: "Test Email from Next.js",
      text: "This is a test email sent using Next.js App Router.",
    });

    return Response.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ message: "Failed to send email" }, { status: 500 });
  }
}
