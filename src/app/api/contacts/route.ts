import { NextResponse } from "next/server"
import { Resend } from 'resend'
import { prisma } from "@/lib/prisma"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || null,
        message,
      }
    })

    // Send email notification
    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL || 'ankit.singh.offcode@gmail.com'],
        subject: subject || 'New Portfolio Contact',
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <h3>Message:</h3>
          <p>${message}</p>
        `
      })
    } catch (emailError) {
      console.error("Email failed but contact saved:", emailError)
      // Continue even if email fails
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error processing contact:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
