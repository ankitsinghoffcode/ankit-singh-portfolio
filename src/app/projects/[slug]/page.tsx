import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { prisma } from "@/lib/prisma"
import { ArrowLeft, Calendar, Users, Clock, Target, CheckCircle, ChevronRight, Award } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
    select: {
      projectName: true,
      businessDomain: true,
      client: true,
      valueDelivered: true,
    }
  })

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.projectName} - Ankit Singh Portfolio`,
    description: project.valueDelivered.substring(0, 160),
    openGraph: {
      title: project.projectName,
      description: `Case study in ${project.businessDomain} for ${project.client}`,
      type: 'article',
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params

  const project = await prisma.project.findUnique({
    where: { slug }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#0B6623] to-[#14532d] text-white py-16">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  {project.businessDomain}
                </span>
                {project.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Featured
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {project.projectName}
              </h1>

              <div className="text-xl text-white/90 mb-6">
                Client: <span className="font-semibold">{project.client}</span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.projectNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{project.role}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <div className="text-sm text-white/70 mb-2">Team Size</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {project.teamSize || 'Solo Developer'}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                <div className="text-sm text-white/70 mb-2">Duration</div>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {project.duration}
                </div>
              </div>

              {project.metrics && (
                <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                  <div className="text-sm text-white/70 mb-2">Key Metric</div>
                  <div className="text-2xl font-bold">
                    {Object.values(project.metrics)[0]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Problem Statement */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Business Problem</h2>
                  <p className="text-gray-600">The challenge that needed solving</p>
                </div>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">
                  {project.businessProblem}
                </p>
              </div>
            </section>

            {/* Selected Solution */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Implemented Solution</h2>
                  <p className="text-gray-600">My approach and implementation</p>
                </div>
              </div>
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.suggestedSolution}
                </ReactMarkdown>
              </div>
            </section>

            {/* Value Delivered */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Value Delivered</h2>
                  <p className="text-gray-600">Measurable business impact</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.valueDelivered}
                </ReactMarkdown>
              </div>
            </section>

            {/* Technologies Used */}
            {project.technologies && project.technologies.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Technologies & Tools</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Info */}
            <div className="sticky top-8 space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Client</dt>
                    <dd className="text-gray-900 font-semibold">{project.client}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Project Code</dt>
                    <dd className="text-gray-900 font-mono text-sm">{project.projectNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Case ID</dt>
                    <dd className="text-gray-900 font-mono text-sm">{project.caseId}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Role</dt>
                    <dd className="text-gray-900">{project.role}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Team</dt>
                    <dd className="text-gray-900">{project.teamSize || 'Solo Developer'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-600">Duration</dt>
                    <dd className="text-gray-900">{project.duration}</dd>
                  </div>
                </dl>
              </div>

              {/* Metrics */}
              {project.metrics && (
                <div className="bg-[#0B6623] text-white rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {Object.entries(project.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-white/80 text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="font-bold text-xl">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="space-y-3">
                <Link
                  href="/projects"
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  All Projects
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-[#0B6623] hover:bg-[#14532d] text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  Discuss Similar Project
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
