import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import ProjectsPageClient from '@/components/ProjectsPageClient'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // Fetch featured stats
  const [totalProjects, featuredProjects] = await Promise.all([
    prisma.project.count(),
    prisma.project.findMany({
      where: { featured: true },
      take: 3,
      orderBy: { createdAt: 'desc' }
    })
  ])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[#0B6623] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Hi, I'm <span className="text-[#0B6623]">Ankit Singh</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
                Finance & Business Systems Automation
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                4+ years engineering enterprise-grade automation systems, FP&A frameworks, and
                decision-intelligence platforms. Built 27 production systems that process
                200,000+ transaction lines and deliver measurable business impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="btn-primary">
                  View My Projects
                </Link>
                {session ? (
                  <Link href="/admin" className="btn-secondary">
                    Admin Panel
                  </Link>
                ) : (
                  <Link href="/login" className="btn-secondary">
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-[#0B6623] to-[#14532d] rounded-full flex items-center justify-center shadow-2xl">
                <span className="text-8xl">👨‍💼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#0B6623] mb-2">{totalProjects}</div>
              <div className="text-gray-600 font-medium">Projects Built</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0B6623] mb-2">4+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0B6623] mb-2">200K+</div>
              <div className="text-gray-600 font-medium">Transaction Lines</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#0B6623] mb-2">80%</div>
              <div className="text-gray-600 font-medium">Avg Efficiency Gain</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A selection of my most impactful production-deployed systems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <div key={project.id} className="card group hover:scale-105 transition-transform duration-300">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[#0B6623] uppercase tracking-wide">
                    {project.businessDomain}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0B6623] transition-colors">
                  {project.projectName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.businessProblem}
                </p>
                <div className="flex items-center justify-between">
                  <span className="metric-badge">
                    {project.role}
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-[#0B6623] font-semibold hover:underline"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects" className="btn-primary text-lg px-8 py-4">
              View All {totalProjects} Projects
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">What I Do</h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  I specialize in building <strong>enterprise-grade finance systems</strong> that transform
                  manual, spreadsheet-driven processes into automated, intelligent platforms. My work
                  sits at the intersection of finance, technology, and process optimization.
                </p>
                <p>
                  With deep expertise in <strong>SAP S/4HANA</strong>, <strong>Power BI</strong>,
                  <strong> Excel architecture</strong>, and <strong>process automation</strong>,
                  I design solutions that deliver measurable ROI—from 80% reduction in reporting
                  effort to ₹19Cr in working capital unlocked.
                </p>
                <p>
                  Currently targeting <strong>FP&A and Finance Technology roles</strong> with
                  18-30 LPA compensation expectations at top companies in finance analytics.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Core Expertise</h3>
              <div className="space-y-4">
                {[
                  { skill: "FP&A & Financial Systems", level: 95 },
                  { skill: "Power BI & Dashboard Engineering", level: 90 },
                  { skill: "Excel Architecture & VBA", level: 95 },
                  { skill: "Process Automation (Power Automate, Python)", level: 85 },
                  { skill: "SAP S/4HANA Integration", level: 80 },
                  { skill: "SQL & Data Modeling", level: 85 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                      <span className="text-sm font-medium text-[#0B6623]">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#0B6623] h-2 rounded-full"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-[#0B6623] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            I'm always interested in discussing new projects, creative ideas, or opportunities
            to contribute to your organization's success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#0B6623] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg">
              Get in Touch
            </Link>
            <a
              href="mailto:ankit.singh.offcode@gmail.com"
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-[#0B6623] transition-all duration-200"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ankit Singh</h3>
              <p className="text-gray-400">
                Finance & Business Systems Automation Professional
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>ankit.singh.offcode@gmail.com</p>
                <p>+91-6366238177</p>
                <p>Bangalore, India</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Links</h4>
              <div className="space-y-2">
                <Link href="/projects" className="block text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <a
                  href="https://www.linkedin.com/in/Brand-Ankit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Ankit Singh. Built with Next.js & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
