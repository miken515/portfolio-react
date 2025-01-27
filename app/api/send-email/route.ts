import nodemailer from "nodemailer";

// POST request handler
export async function POST(req: Request) {
  try {
    // Parse the JSON body from the incoming request
    const { email, subject, message }: { email: string; subject: string; message: string } = await req.json();

    // Validate input fields
    if (!email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: "Validation failed", error: "All fields are required." }),
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use "smtp" for custom configurations
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Send the email
    const mailOptions = {
      from: email, // The sender's email address (user's input)
      to: process.env.RECEIVER_EMAIL, // Your email address to receive messages
      subject: `Contact Form: ${subject}`,
      text: `Message from ${email}:\n\n${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    // Log success
    console.log("Email sent successfully:", info.response);

    // Respond to the client with a success message
    return new Response(
      JSON.stringify({ message: "Your message was sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Something went wrong.", error: "Failed to send email. Please try again later." }),
      { status: 500 }
    );
  }
}