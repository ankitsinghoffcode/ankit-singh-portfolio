'use client'

import { useState, useEffect } from 'react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  FileText,
  BarChart3,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

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

export default function AdminPage() {
  const { data: session } = useSession()
  const [projects, setProjects] = useState<Project[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreate = async (formData: FormData) => {
    setSaving(true)
    try {
      const projectData = {
        caseId: formData.get('caseId') as string,
        client: formData.get('client') as string,
        businessDomain: formData.get('businessDomain') as string,
        caseDescription: formData.get('caseDescription') as string,
        providedByOrg: formData.get('providedByOrg') === 'on',
        timeRating: formData.get('timeRating') === 'on',
        qualityRating: formData.get('qualityRating') === 'on',
        quantityRating: formData.get('quantityRating') === 'on',
        problemStatement: formData.get('problemStatement') as string,
        selectedSolution: formData.get('selectedSolution') as string,
        projectNumber: formData.get('projectNumber') as string,
        projectName: formData.get('projectName') as string,
        businessProblem: formData.get('businessProblem') as string,
        suggestedSolution: formData.get('suggestedSolution') as string,
        valueDelivered: formData.get('valueDelivered') as string,
        featured: formData.get('featured') === 'on',
        technologies: (formData.get('technologies') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
        role: formData.get('role') as string,
        teamSize: formData.get('teamSize') as string,
        duration: formData.get('duration') as string,
        metrics: formData.get('metrics') ? JSON.parse(formData.get('metrics') as string) : {},
      }

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        await fetchProjects()
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Failed to create project:', error)
      alert('Failed to create project')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (formData: FormData, slug: string) => {
    setSaving(true)
    try {
      const projectData = {
        client: formData.get('client') as string,
        businessDomain: formData.get('businessDomain') as string,
        caseDescription: formData.get('caseDescription') as string,
        providedByOrg: formData.get('providedByOrg') === 'on',
        timeRating: formData.get('timeRating') === 'on',
        qualityRating: formData.get('qualityRating') === 'on',
        quantityRating: formData.get('quantityRating') === 'on',
        problemStatement: formData.get('problemStatement') as string,
        selectedSolution: formData.get('selectedSolution') as string,
        projectNumber: formData.get('projectNumber') as string,
        projectName: formData.get('projectName') as string,
        businessProblem: formData.get('businessProblem') as string,
        suggestedSolution: formData.get('suggestedSolution') as string,
        valueDelivered: formData.get('valueDelivered') as string,
        featured: formData.get('featured') === 'on',
        technologies: (formData.get('technologies') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
        role: formData.get('role') as string,
        teamSize: formData.get('teamSize') as string,
        duration: formData.get('duration') as string,
        metrics: formData.get('metrics') ? JSON.parse(formData.get('metrics') as string) : {},
      }

      const response = await fetch(`/api/projects/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        await fetchProjects()
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Failed to update project:', error)
      alert('Failed to update project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setDeleting(slug)
    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete project')
    } finally {
      setDeleting(null)
    }
  }

  const ProjectForm = ({ project, onClose }: { project?: Project; onClose: () => void }) => {
    const isEditing = !!project

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form action={isEditing ? undefined : (formData) => handleCreate(formData)} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Name *
                </label>
                <input
                  name="projectName"
                  defaultValue={project?.projectName}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Client *
                </label>
                <input
                  name="client"
                  defaultValue={project?.client}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Domain *
                </label>
                <input
                  name="businessDomain"
                  defaultValue={project?.businessDomain}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role *
                </label>
                <input
                  name="role"
                  defaultValue={project?.role}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Number *
                </label>
                <input
                  name="projectNumber"
                  defaultValue={project?.projectNumber}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Case ID *
                </label>
                <input
                  name="caseId"
                  defaultValue={project?.caseId}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Team Size
                </label>
                <input
                  name="teamSize"
                  defaultValue={project?.teamSize}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  name="duration"
                  defaultValue={project?.duration}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Case Description
              </label>
              <textarea
                name="caseDescription"
                defaultValue={project?.caseDescription}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Problem *
              </label>
              <textarea
                name="businessProblem"
                defaultValue={project?.businessProblem}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Suggested Solution *
              </label>
              <textarea
                name="suggestedSolution"
                defaultValue={project?.suggestedSolution}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Value Delivered *
              </label>
              <textarea
                name="valueDelivered"
                defaultValue={project?.valueDelivered}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                name="technologies"
                defaultValue={project?.technologies?.join(', ')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none"
                placeholder="Excel, Power BI, VBA, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Metrics (JSON)
              </label>
              <textarea
                name="metrics"
                defaultValue={project?.metrics ? JSON.stringify(project.metrics, null, 2) : ''}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0B6623] focus:border-transparent outline-none resize-none font-mono text-sm"
                placeholder='{"savings": "₹15Cr", "reduction": "80%"}'
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="providedByOrg"
                  defaultChecked={project?.providedByOrg}
                  className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
                />
                <span className="text-sm font-medium text-gray-700">Provided By Organization</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeRating"
                  defaultChecked={project?.timeRating}
                  className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
                />
                <span className="text-sm font-medium text-gray-700">Time Rating (Yes)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="qualityRating"
                  defaultChecked={project?.qualityRating}
                  className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
                />
                <span className="text-sm font-medium text-gray-700">Quality Rating (Yes)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="quantityRating"
                  defaultChecked={project?.quantityRating}
                  className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
                />
                <span className="text-sm font-medium text-gray-700">Quantity Rating (Yes)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  defaultChecked={project?.featured}
                  className="w-5 h-5 text-[#0B6623] border-gray-300 rounded focus:ring-[#0B6623]"
                />
                <span className="text-sm font-medium text-gray-700">Featured Project</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-[#0B6623] hover:bg-[#14532d] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {isEditing ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0B6623] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-[#0B6623] font-bold text-xl">
                Portfolio Admin
              </Link>
              <span className="text-sm text-gray-500">
                | {session?.user?.email}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-[#0B6623] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{projects.length}</p>
              </div>
              <FileText className="w-8 h-8 text-[#0B6623]" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Featured</p>
                <p className="text-3xl font-bold text-[#0B6623]">
                  {projects.filter(p => p.featured).length}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Domains</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(projects.map(p => p.businessDomain)).size}
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-bold text-gray-900">
                  {projects.length > 0
                    ? new Date(projects[0]?.updatedAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <button
            onClick={() => setIsCreating(true)}
            className=" inline-flex items-center gap-2 bg-[#0B6623] hover:bg-[#14532d] text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Project
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Domain
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Featured
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 line-clamp-2 max-w-md">
                          {project.projectName}
                        </div>
                        <div className="text-sm text-gray-500">{project.projectNumber}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{project.client}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {project.businessDomain}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{project.role}</td>
                    <td className="px-6 py-4">
                      {project.featured ? (
                        <span className="text-yellow-600">⭐ Yes</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(project.slug)}
                          disabled={deleting === project.slug}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No projects yet. Add your first project!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {(isCreating || editingProject) && (
        <ProjectForm
          project={editingProject || undefined}
          onClose={() => {
            setIsCreating(false)
            setEditingProject(null)
          }}
        />
      )}
    </div>
  )
}
