import Link from 'next/link'
import { Calendar, Users, Clock, Target, ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string
    caseId: string
    client: string
    businessDomain: string
    caseDescription: string
    featured: boolean
    projectNumber: string
    projectName: string
    businessProblem: string
    suggestedSolution: string
    valueDelivered: string
    technologies: string[]
    role: string
    teamSize: string
    duration: string
    metrics?: any
    slug: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card group hover:scale-105 transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-semibold text-[#0B6623] uppercase tracking-wider bg-green-50 px-2 py-1 rounded">
            {project.businessDomain}
          </span>
          {project.featured && (
            <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
              ⭐ Featured
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500 mb-2">
          {project.projectNumber} | {project.caseId}
        </div>
        <h3 className="text-xl font-bold text-gray-900 leading-snug group-hover:text-[#0B6623] transition-colors mb-3">
          {project.projectName}
        </h3>
      </div>

      {/* Problem Statement */}
      <div className="mb-4 flex-grow">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-red-500" />
          Business Problem
        </h4>
        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {project.businessProblem}
        </p>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-4 h-4 text-[#0B6623]" />
          <span className="truncate">{project.teamSize || 'Team'}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-[#0B6623]" />
          <span className="truncate">{project.duration}</span>
        </div>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Metrics if available */}
      {project.metrics && (
        <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
          <div className="text-sm font-semibold text-green-800 mb-1">Key Impact</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
              <span key={key} className="inline-flex items-center px-2 py-1 bg-white rounded text-xs font-medium text-green-700">
                {String(value)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/projects/${project.slug}`}
        className="mt-auto inline-flex items-center justify-center gap-2 w-full bg-[#0B6623] hover:bg-[#14532d] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
      >
        View Case Study
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
