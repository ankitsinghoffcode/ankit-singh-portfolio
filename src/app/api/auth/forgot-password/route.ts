import { NextResponse } from "next/server"
import { Resend } from 'resend'
import { prisma } from "@/lib/prisma"
import { randomBytes } from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // For security, don't reveal that user doesn't exist
      return NextResponse.json(
        { success: true, message: "If the email exists, a reset link has been sent." }
      )
    }

    // Generate token
    const token = randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Save token
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt,
      }
    })

    // Send email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`

    try {
      await resend.emails.send({
        from: 'Portfolio Admin <onboarding@resend.dev>',
        to: [email],
        subject: 'Password Reset - Ankit Singh Portfolio',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0B6623;">Password Reset Request</h2>
            <p>You requested a password reset for your admin account.</p>
            <p>Click the button below to reset your password. This link is valid for 1 hour.</p>
            <div style="margin: 30px 0;">
              <a href="${resetUrl}"
                 style="background-color: #0B6623; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this reset, please ignore this email. Your password will remain unchanged.
            </p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
            <p style="color: #999; font-size: 12px;">
              Ankit Singh Portfolio Admin System
            </p>
          </div>
        `
      })
    } catch (emailError) {
      console.error("Email failed to send:", emailError)
      // Clean up token if email fails? For now we keep it.
    }

    return NextResponse.json(
      { success: true, message: "If the email exists, a reset link has been sent." }
    )
  } catch (error) {
    console.error("Error in forgot password:", error)
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
