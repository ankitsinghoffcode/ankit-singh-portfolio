import { Metadata } from "next"
import ProjectsPageClient from "@/components/ProjectsPageClient"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Projects - Ankit Singh Portfolio",
  description: "Browse 27+ production-deployed finance automation and analytics systems built by Ankit Singh. Filter by domain, industry, or technology.",
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const domain =typeof searchParams.domain === 'string' ? searchParams.domain : undefined
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined
  const featured = searchParams.featured === 'true'

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

  if (featured) {
    where.featured = true
  }

  const projects = await prisma.project.findMany({
    where,
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Get unique domains for filter
  const domains = await prisma.project.groupBy({
    by: ['businessDomain'],
    _count: {
      businessDomain: true
    },
    orderBy: {
      businessDomain: 'asc'
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="section-heading">All Projects</h1>
          <p className="text-lg text-gray-600">
            {projects.length} production-deployed systems across finance, analytics, automation, and operations
          </p>
        </div>

        {/* Filters */}
        <ProjectsPageClient
          initialProjects={projects}
          domains={domains.map(d => d.businessDomain)}
          currentDomain={domain}
          currentSearch={search}
          currentFeatured={featured}
        />
      </div>
    </div>
  )
}
