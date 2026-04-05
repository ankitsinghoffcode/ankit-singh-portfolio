'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProjectCard from './ProjectCard'

interface Project {
  id: string
  caseId: string
  client: string
  businessDomain: string
  caseDescription: string
  providedByOrg: boolean
  timeRating: boolean
  qualityRating: boolean
  quantityRating: boolean
  problemStatement: string
  selectedSolution: string
  projectNumber: string
  projectName: string
  businessProblem: string
  suggestedSolution: string
  valueDelivered: string
  featured: boolean
  technologies: string[]
  role: string
  teamSize: string
  duration: string
  metrics: any
  slug: string
  createdAt: string
  updatedAt: string
}

interface Props {
  initialProjects: Project[]
  domains: string[]
  currentDomain?: string
  currentSearch?: string
  currentFeatured?: boolean
}

export default function ProjectsPageClient({
  initialProjects,
  domains,
  currentDomain,
  currentSearch,
  currentFeatured,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentSearch || '')
  const [domain, setDomain] = useState(currentDomain || '')
  const [featuredOnly, setFeaturedOnly] = useState(currentFeatured || false)

  const filteredProjects = useMemo(() => {
    let filtered = initialProjects

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.client.toLowerCase().includes(searchLower) ||
          p.projectName.toLowerCase().includes(searchLower) ||
          p.businessProblem.toLowerCase().includes(searchLower) ||
          p.role.toLowerCase().includes(searchLower)
      )
    }

    if (domain) {
      filtered = filtered.filter((p) => p.businessDomain === domain)
    }

    if (featuredOnly) {
      filtered = filtered.filter((p) => p.featured)
    }

    return filtered
  }, [initialProjects, search, domain, featuredOnly])

  const updateFilters = (newSearch?: string, newDomain?: string, newFeatured?: boolean) => {
    const params = new URLSearchParams()

    if (newSearch) params.set('search', newSearch)
    if (newDomain) params.set('domain', newDomain)
    if (newFeatured) params.set('featured', 'true')

    const query = params.toString()
    router.push(`/projects${query ? `?${query}` : ''}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    updateFilters(value || undefined, domain || undefined, featuredOnly)
  }

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setDomain(value)
    updateFilters(search || undefined, value || undefined, featuredOnly)
  }

  const handleFeaturedToggle = () => {
    const newValue = !featuredOnly
    setFeaturedOnly(newValue)
    updateFilters(search || undefined, domain || undefined, newValue)
  }

  const clearFilters = () => {
    setSearch('')
    setDomain('')
    setFeaturedOnly(false)
    router.push('/projects')
  }

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid md:grid-cols-4 gap-4 items-end">
          {/* Search */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Projects
            </label>
            <input
              type="text"
              placeholder="Search by client, project name, or role..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Domain Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Domain
            </label>
            <select
              value={domain}
              onChange={handleDomainChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">All Domains</option>
              {domains.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Filter */}
          <div>
            <label className="flex items-center cursor-pointer h-full py-2">
              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={handleFeaturedToggle}
                className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                Featured Only
              </span>
            </label>
          </div>
        </div>

        {/* Active Filters */}
        {(search || domain || featuredOnly) && (
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm font-medium text-gray-600">Active filters:</span>
            {search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: {search}
                <button
                  onClick={() => {
                    setSearch('')
                    updateFilters(undefined, domain || undefined, featuredOnly)
                  }}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {domain && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                Domain: {domain}
                <button
                  onClick={() => {
                    setDomain('')
                    updateFilters(search || undefined, undefined, featuredOnly)
                  }}
                  className="ml-2 hover:text-green-900"
                >
                  ×
                </button>
              </span>
            )}
            {featuredOnly && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                Featured
                <button
                  onClick={() => {
                    setFeaturedOnly(false)
                    updateFilters(search || undefined, domain || undefined, false)
                  }}
                  className="ml-2 hover:text-yellow-900"
                >
                  ×
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredProjects.length} of {initialProjects.length} projects
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
          <button
            onClick={clearFilters}
            className="btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
