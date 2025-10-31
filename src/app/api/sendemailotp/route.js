import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "devaprasadsakthivel@gmail.com",
        pass: "sgnj furb ywcz qzlw", // Gmail App Password (not real password)
      },
    });

    await transporter.sendMail({
      from: '"MovWise" <devaprasadsakthivel@gmail.com>',
      to: email,
      subject: "Your OTP from MovWise",
      text: "This is a test email from Next.js !",
    });

    return Response.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json(
      { message: "❌ Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
