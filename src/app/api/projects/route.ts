import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const domain = searchParams.get("domain")
  const featured = searchParams.get("featured")

  const where: any = {}

  if (search) {
    where.OR = [
      { client: { contains: search, mode: 'insensitive' } },
      { projectName: { contains: search, mode: 'insensitive' } },
      { businessProblem: { contains: search, mode: 'insensitive' } }
    ]
  }

  if (domain) {
    where.businessDomain = domain
  }

  if (featured === "true") {
    where.featured = true
  }

  try {
    const projects = await prisma.project.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const {
      caseId,
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
      valueDelivered
    } = body

    // Generate slug from project name
    const slug = projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const project = await prisma.project.create({
      data: {
        caseId,
        client,
        businessDomain,
        caseDescription,
        providedByOrg: providedByOrg ?? false,
        timeRating: timeRating ?? false,
        qualityRating: qualityRating ?? false,
        quantityRating: quantityRating ?? false,
        problemStatement,
        selectedSolution,
        projectNumber,
        projectName,
        businessProblem,
        suggestedSolution,
        valueDelivered,
        slug,
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}
