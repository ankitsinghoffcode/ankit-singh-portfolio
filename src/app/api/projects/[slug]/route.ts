import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const project = await prisma.project.findUnique({
      where: { slug }
    })

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error fetching project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { slug } = await params

  try {
    const body = await request.json()
    const {
      client,
      businessDomain,
      caseDescription,
      providedByOrg,
      timeRating,
      qualityRating,
      quantityRating,
      problemStatement,
      selectedSolution,
      projectNumber,
      projectName,
      businessProblem,
      suggestedSolution,
      valueDelivered,
      featured,
    } = body

    const project = await prisma.project.update({
      where: { slug },
      data: {
        client,
        businessDomain,
        caseDescription,
        providedByOrg,
        timeRating,
        qualityRating,
        quantityRating,
        problemStatement,
        selectedSolution,
        projectNumber,
        projectName,
        businessProblem,
        suggestedSolution,
        valueDelivered,
        featured,
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  const { slug } = await params

  try {
    await prisma.project.delete({
      where: { slug }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
