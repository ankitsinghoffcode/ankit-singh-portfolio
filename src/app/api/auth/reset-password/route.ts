import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json()

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      )
    }

    // Find valid token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    // Check if token expired
    if (new Date() > resetToken.expiresAt) {
      // Delete expired token
      await prisma.passwordResetToken.delete({ where: { token } })
      return NextResponse.json(
        { error: "Token has expired" },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedPassword = await hash(newPassword, 10)

    // Update user password
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword }
    })

    // Delete used token
    await prisma.passwordResetToken.delete({ where: { token } })

    return NextResponse.json(
      { success: true, message: "Password reset successfully" }
    )
  } catch (error) {
    console.error("Error in reset password:", error)
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    )
  }
}
