export interface Project {
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
  metrics: Record<string, any> | null
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  createdAt: string
}

export interface User {
  id: string
  email: string
  name: string | null
  password: string
  createdAt: string
  updatedAt: string
}

export interface Resume {
  id: string
  filename: string
  url: string
  content: string | null
  updatedAt: string
}

export interface ApiResponse<T = any> {
  success?: boolean
  data?: T
  error?: string
}
