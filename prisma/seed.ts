import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user (password: admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10)
  const adminEmail = process.env.ADMIN_EMAIL || 'ankit.singh.offcode@gmail.com'

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Ankit Singh',
      password: hashedPassword,
    },
  })

  console.log('Admin user created:', admin.email)

  // Seed 27 projects
  const projects = [
    {
      caseId: "CS-10001",
      client: "FINO GLOBAL TECH (FGT)",
      businessDomain: "Finance & Utilities",
      caseDescription: "Enterprise-wide cost intelligence initiative designed as a high-volume (200,000-line) automated governance system. Includes 12 categories and 72 sub-categories for FY26 forecasting and variance tracking.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "High Governance system where it is Designed as a high-volume (200,000-line) automated spend intelligence system covering 12 categories and 72 sub-categories for FY26. Dashboards provide real-time variance tracking, category performance insights, cost leakage detection, and month-on-month trend analysis. Manual reporting reduced by ~80%.",
      selectedSolution: "CS-10001-C",
      projectNumber: "PR-50001",
      projectName: "Enterprise Automated Cost Tracking & Spend Intelligence System (FY Data)",
      businessProblem: "High manual effort, 4-15 people involved in tracking enterprise-level expenses with no unified visibility. Need for automated real-time tracking with minimal human intervention.",
      suggestedSolution: "Fully automated tracking system. Only data entry is manual; all reporting is auto-refreshed. Live FY25 vs FY26 cost tracking by category, subcategory & Vendors. Built 6 automated dashboards with variance analysis, trend detection, and anomaly alerts.",
      valueDelivered: "Real-time visibility into 200,000-line expense system. 80% reduction in manual reporting effort. Automated variance tracking and cost leakage detection. Month-on-month trend analysis with drill-down capability. Decision-ready insights available within 24 hours.",
      featured: true,
      technologies: ["Excel", "Power BI", "DAX", "Power Query", "SQL", "Automation"],
      role: "Cost Intelligence & Governance",
      teamSize: "Solo Developer",
      duration: "6 weeks",
      metrics: {
        savings: "₹15-20Cr identified",
        manualReduction: "80%",
        reportingTime: "From 4 months to 12 days",
        transactions: "200,000+ lines",
        dashboards: "6 automated"
      }
    },
    {
      caseId: "CS-10002",
      client: "Black Dimond Infra Fin Pvt Ltd",
      businessDomain: "Manufacturing & Construction",
      caseDescription: "Transformation of fragmented operational data into a complete Excel-driven ERP ecosystem covering HR, Procurement, Inventory, and CAPEX/OPEX Depreciation modules.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Built a complete Excel-driven ERP ecosystem for HR, Accounts, Procurement, Inventory, Production, Costing, OPEX/CAPEX, Depreciation, Budgeting, and Forecasting. Includes single-page management summary, module-wise dashboards, and Power BI integration. Improved process control and cross-function visibility.",
      selectedSolution: "CS-10002-E",
      projectNumber: "PR-50002",
      projectName: "Excel-Based End-to-End ERP System (Manufacturing & Construction)",
      businessProblem: "Highly fragmented, non-integrated processes requiring multiple teams for operational tasks. Need for end-to-end visibility and automated workflows.",
      suggestedSolution: "Excel-based automated ERP with centralized workflows covering all 12 modules: HR, Accounts, Procurement, Inventory, Production, Costing, OPEX/CAPEX, Depreciation, Budgeting, Forecasting. Single-page management summary with drill-down capability. Power BI integration for advanced analytics.",
      valueDelivered: "End-to-end operational control with real-time cross-function visibility. Automated workflows eliminate 70% of manual handoffs. Single source of truth for all operational data. Management summary provides instant enterprise-wide health check. Power BI enables predictive analytics.",
      featured: true,
      technologies: ["Excel", "VBA", "Power BI", "Power Query", "Advanced Formulas"],
      role: "ERP & Operations Systems",
      teamSize: "Solo Developer",
      duration: "8 weeks",
      metrics: {
        manualHandoffs: "70% reduction",
        modules: "12 integrated",
        portfolioValue: "₹574+ Cr",
        sites: "35+ active"
      }
    },
    {
      caseId: "CS-10003",
      client: "Omni Computer Solution",
      businessDomain: "Aviation & Logistics",
      caseDescription: "Development of an automated 'Contract Renewal Engine' with dynamic aging buckets (0–90 days) and automated recommendation logic for service discontinuation.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Built an automated renewal dashboard that categorizes contracts by expiry buckets (0–60, 60–90, 90+ days), flags discontinued services, and generates renewal recommendations. Helps prevent surprise costs and improves negotiation strategy.",
      selectedSolution: "CS-10003-B",
      projectNumber: "PR-50003",
      projectName: "Automated IT Contract Renewal Tracking & Cost Control Engine with proper cost optimization system",
      businessProblem: "Delayed renewals, lack of visibility, cost optimization challenges. Need for proactive contract management with renewal recommendations.",
      suggestedSolution: "Automated contract alert engine with dynamic aging buckets (0-60, 60-90, 90+ days). Built dashboard categorizing contracts by expiry timeline. Added automated email alerts to contract owners. Implemented recommendation logic for renegotiation vs. discontinuation based on usage data.",
      valueDelivered: "Prevents cost leakage through proactive 90-day advance alerts. Zero missed renewals. Automated recommendations save 120 hours/year of manual analysis. Renegotiation insights lead to 12% average cost reduction on renewed contracts.",
      featured: true,
      technologies: ["Excel", "Power BI", "Power Automate", "Email Automation"],
      role: "Contract Lifecycle Management",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        contractsManaged: "150+ primary, 80+ sister entity",
        hoursSaved: "120 hours/year",
        costReduction: "12% on renewed contracts",
        alerts: "Automated 90-day advance"
      }
    },
    {
      caseId: "CS-10004",
      client: "IT Cooperation",
      businessDomain: "IT Firm",
      caseDescription: "Implementation of a fully automated travel spend analytics platform designed to enforce corporate policy compliance through real-time dynamic dashboards.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Created a fully automated reporting system for travel expenses, employee-wise spend, vendor comparison, and policy compliance. Enabled real-time visibility through dynamic dashboards.",
      selectedSolution: "CS-10004-A",
      projectNumber: "PR-50004",
      projectName: "Automated Corporate Travel Spend Analytics & Compliance Dashboard",
      businessProblem: "Travel cost leakage, no centralized visibility, no optimization controls. Travel policy exists but compliance is poor with no enforcement mechanism.",
      suggestedSolution: "Automated travel analytics dashboard with policy compliance framework. Real-time expense tracking by employee, department, and trip purpose. Policy violation flags with automatic routing to managers for approval. Vendor comparison showing cost differences between airlines, hotels, cab services.",
      valueDelivered: "Improved governance and 100% visibility into travel spend. Policy compliance increased from 45% to 85% through automated enforcement. Vendor analytics enable 18% cost reduction through preferred vendor negotiations. Manager approval workflow prevents policy violations.",
      featured: false,
      technologies: ["Excel", "Power BI", "Power Automate", "Workflow Automation"],
      role: "Travel Analytics & Compliance",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        complianceIncrease: "45% → 85%",
        costReduction: "18%",
        visibility: "100%",
        approvalWorkflow: "Automated"
      }
    },
    {
      caseId: "CS-10005",
      client: "Antosales Group",
      businessDomain: "Retail & E-commerce",
      caseDescription: "Design of a BI-driven sales intelligence pipeline (Data Modelling → Power Query → Insights) to track product performance and segmentation analytics.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Developed a BI-driven sales intelligence system covering product performance, segmentation analytics, financial indicators, and return analysis. Demonstrates entire BI pipeline: Data Modelling → Power Query → Dashboard → Insights.",
      selectedSolution: "CS-10005-A",
      projectNumber: "PR-50005",
      projectName: "Sales & Product Performance Intelligence (Excel + Power BI)",
      businessProblem: "Need for detailed sales and returns analysis with visualization. Current reporting is basic with no product-level insights or customer segmentation.",
      suggestedSolution: "End-to-end BI pipeline with dynamic insights. Data modeling covering product hierarchy, customer segments, geographic regions. Power Query automation for data refresh. Interactive dashboards showing sales trends, return patterns, profitability by segment.",
      valueDelivered: "High-quality decision intelligence with drill-down capability. Product performance analysis identifies top/bottom performers. Customer segmentation reveals high-value segments. Return analysis reduces return rate by 15% through quality improvements.",
      featured: false,
      technologies: ["Power BI", "Power Query", "DAX", "Data Modeling"],
      role: "Sales & Product Intelligence",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        returnRateReduction: "15%",
        segments: "Multi-level",
        insights: "Drill-down capability",
        pipeline: "End-to-end BI"
      }
    },
    {
      caseId: "CS-10006",
      client: "DesertPetro (DP)",
      businessDomain: "Finance & IT",
      caseDescription: "Development of an 'Early Warning System' (EFFIGS) designed to predict financial risks including revenue drops, vendor delays, and budget variances before they impact the P&L.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Developed an enterprise-level Early Warning System to predict risks related to revenue drops, cost overruns, vendor delays, underutilization, and budget variance. Includes automated alerts and management dashboards.",
      selectedSolution: "CS-10006-C",
      projectNumber: "PR-50006",
      projectName: "Enterprise Fund Forecasting & Investment Governance System (EFFIGS)",
      businessProblem: "Leadership cannot identify financial risks until they have already occurred. Need for predictive system with automated alerts and proactive intervention protocols.",
      suggestedSolution: "Efficiency calculator with alert automation tracking 15 key risk indicators: revenue pipeline velocity, vendor payment delays, budget variance by department, resource utilization, aging receivables. Automated daily alerts for threshold breaches. Predictive models for revenue and cost trends. Management dashboard with risk heatmap.",
      valueDelivered: "Better allocation and proactive intervention preventing ₹9Cr in potential losses. Automated alerts enable 2-week advance response time. Risk prediction accuracy at 78%. Management dashboard provides complete risk landscape at a glance.",
      featured: true,
      technologies: ["Excel", "Power BI", "Predictive Analytics", "Automated Alerts", "SQL"],
      role: "Risk Intelligence & Early Warning",
      teamSize: "Solo Developer",
      duration: "5 weeks",
      metrics: {
        lossesPrevented: "₹9Cr",
        advanceResponse: "2 weeks",
        accuracy: "78%",
        indicators: "15 key risk indicators"
      }
    },
    {
      caseId: "CS-10007",
      client: "FinStream Bank",
      businessDomain: "Financial Services",
      caseDescription: "Architected a usage-based validation model to reconcile actual consumption vs. billed services for utilities and high-value software licenses.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Built a system to validate billing vs actual consumption for utilities/software. Flags under-utilization, wastage, and governs cross-segment cost allocation.",
      selectedSolution: "CS-10007-E",
      projectNumber: "PR-50007",
      projectName: "Usage-Based Billing & Cross-Segment Cost Optimization Model",
      businessProblem: "Contract wastage due to unused/underutilized resources. Need for systematic validation and optimization across all contracts and utilities.",
      suggestedSolution: "Automated usage validation & optimization model reconciling billed vs. actual consumption. Built scorecards for each major contract showing utilization %, waste amount, optimization recommendations. Automated cross-segment cost allocation based on actual usage metrics. Monthly variance reports with automatic alerts for >10% deviations.",
      valueDelivered: "Cost reduction of ₹1.47Cr annually through waste elimination. Improved utilization from 62% to 87% through visibility and accountability. Fair cross-segment allocation based on actual usage. Optimization recommendations drive proactive cost management.",
      featured: false,
      technologies: ["Excel", "Power BI", "Usage Analytics", "Cost Allocation"],
      role: "Usage Optimization & Cost Control",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        annualSavings: "₹1.47Cr",
        utilizationImprovement: "62% → 87%",
        costReduction: "25%",
        allocation: "Fair & automated"
      }
    },
    {
      caseId: "CS-10008",
      client: "Apex Wealth Fund",
      businessDomain: "Investment Banking",
      caseDescription: "Professional-grade 3-statement financial integration (P&L, BS, CF) featuring automated Ratio Analysis, WACC, and DCF valuation models.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Built a professional 3-statement model integrating P&L, Balance Sheet, Cash Flow, Ratio Analysis, WACC, and DCF valuation.",
      selectedSolution: "CS-10008-A",
      projectNumber: "PR-50008",
      projectName: "Financial Modelling (3 Statements + Ratios + DCF)",
      businessProblem: "No integrated forecasting or valuation capability. Financial statements exist but not integrated. Cannot model scenarios or perform valuations.",
      suggestedSolution: "End-to-end 3-statement forecasting & valuation model integrating P&L, Balance Sheet, Cash Flow. Built ratio analysis covering liquidity, leverage, profitability, efficiency ratios. WACC calculation with detailed component breakdown. DCF valuation with sensitivity analysis on growth and discount rates.",
      valueDelivered: "Accurate financial planning & valuation capability. Scenario modeling enables strategic decision-making. Ratio analysis tracks financial health. DCF valuation supports investment decisions and target setting.",
      featured: false,
      technologies: ["Excel", "Financial Modeling", "DCF", "WACC", "Scenario Analysis"],
      role: "Financial Valuation & Modeling",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        scenarios: "Multiple",
        ratios: "15+",
        valuation: "DCF + Sensitivity"
      }
    },
    {
      caseId: "CS-10009",
      client: "Global Operations Co.",
      businessDomain: "Enterprise Services",
      caseDescription: "Creation of an Enterprise Automation Suite using VBA, Power Automate, and Python to bridge the gap between reporting and delivery (Mail/PPT).",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Created an enterprise automation suite using VBA, Power Automate, and Python to automate reporting, email distribution, PPT creation, and dashboard refresh cycles.",
      selectedSolution: "CS-10009-D",
      projectNumber: "PR-50009",
      projectName: "Enterprise Automation Suite (Mail + PPT + Workflow)",
      businessProblem: "High manual workload across departments. Need for end-to-end automation from data refresh to report delivery.",
      suggestedSolution: "Complete automation suite using VBA, Power Automate, and Python. Automated data refresh from multiple sources. Scheduled report generation. Automated email/PPT creation and distribution. Dashboard refresh without manual intervention.",
      valueDelivered: "Significant reduction in repetitive tasks - 85% time savings on routine reporting. End-to-end automation from data collection to distribution. Consistent quality and timing. Freed up team for value-added analysis.",
      featured: false,
      technologies: ["VBA", "Power Automate", "Python", "Email Automation", "PPT Generation"],
      role: "Enterprise Automation",
      teamSize: "Solo Developer",
      duration: "6 weeks",
      metrics: {
        timeSavings: "85%",
        automation: "End-to-end",
        reports: "Automated distribution"
      }
    },
    {
      caseId: "CS-10010",
      client: "ADNOC (Alias Context)",
      businessDomain: "Energy / SAP S/4HANA",
      caseDescription: "Standardized, audit-ready governance system integrating MRN/GRN/SRN material management with live SAP S/4HANA synchronization.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "An automated, audit-ready system that standardizes material receipts, goods receipts and service receipts with live SAP sync. Material Management approach is used to manage everything.",
      selectedSolution: "CS-10010-A",
      projectNumber: "PR-50010",
      projectName: "MRN/GRN/SRN Data Governance (SAP S/4HANA Integrated)",
      businessProblem: "Lack of transparency and consistency in material receipt, goods movement, and service acknowledgment processes. Manual tracking caused delays, errors, and compliance issues.",
      suggestedSolution: "Built a fully automated governance system integrating MRN, GRN & SRN with SAP S/4HANA, ensuring real-time validation, status tracking, and approval visibility across departments. Automated three-way match (PO-GRN-Invoice). Real-time discrepancy alerts. Audit trail for all transactions.",
      valueDelivered: "Improved material accuracy by 95%, reduced processing time by 70%, ensured audit-ready traceability, and eliminated manual errors and duplication. Automated compliance reporting. Real-time visibility into material flow across all departments.",
      featured: true,
      technologies: ["SAP S/4HANA", "Excel", "VBA", "Automation", "Audit Trail"],
      role: "SAP Integration & Governance",
      teamSize: "Solo Developer",
      duration: "5 weeks",
      metrics: {
        accuracy: "95%",
        timeReduction: "70%",
        auditReady: "Yes",
        threeWayMatch: "Automated"
      }
    },
    {
      caseId: "CS-10011",
      client: "ProjectFinance Ltd",
      businessDomain: "Project Finance",
      caseDescription: "Multi-layer cash management and investment planning tool designed to forecast liquidity and optimize short-term fund placement.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "A multi-layer cash management tool that forecasts liquidity and suggests short-term investments.",
      selectedSolution: "CS-10011-A",
      projectNumber: "PR-50011",
      projectName: "Cash-Flow Forecast & Investment Planner (Event/Project Finance)",
      businessProblem: "Firm struggled with unpredictable cash flow, unplanned expenses, and no visibility on future liquidity or investment opportunities.",
      suggestedSolution: "Created a structured cash-flow system with multi-layer accounting, automated inflow/outflow mapping, and a predictive model for future cash & investment planning. Built 13-week rolling cash forecast. Implemented daily cash positioning. Created investment decision framework for surplus cash.",
      valueDelivered: "Enabled 100% visibility on financial position, prevented cash shortages, improved investment decisions, and reduced unnecessary spending by 40%. Predictive model forecasts liquidity needs 3 months ahead. Investment framework generates ₹25L additional annual income from optimized cash deployment.",
      featured: false,
      technologies: ["Excel", "Financial Modeling", "Cash Flow Forecasting", "Investment Analytics"],
      role: "Cash Management & Investment Planning",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        visibility: "100%",
        spendingReduction: "40%",
        additionalIncome: "₹25L/year",
        forecastHorizon: "3 months"
      }
    },
    {
      caseId: "CS-10012",
      client: "VitalHealth Corp",
      businessDomain: "Healthcare Operations",
      caseDescription: "Integrated operational ERP covering the full patient lifecycle, from OPD/IPD billing and pharmacy to staff rostering and bed management.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "An integrated operational ERP covering patient lifecycle, billing, pharmacy, beds, staff rostering and reporting.",
      selectedSolution: "CS-10012-B",
      projectNumber: "PR-50012",
      projectName: "Hospital Operations ERP",
      businessProblem: "Hospital operations were spread across disconnected tools, causing delays, data mismatch, and inefficient patient & staff coordination.",
      suggestedSolution: "Designed a central ERP system covering OPD/IPD, pharmacy, billing, staff scheduling, asset tracking, and operational workflows with real-time dashboards. Integrated patient lifecycle from registration to discharge. Automated billing with insurance integration. Pharmacy inventory auto-updated on prescription fulfillment.",
      valueDelivered: "Increased operational efficiency by 60%, reduced patient waiting time, improved resource utilization, and automated compliance reporting. Single patient record across all touchpoints. Real-time bed availability. Staff utilization dashboards optimize scheduling.",
      featured: false,
      technologies: ["Excel", "Power BI", "VBA", "Access Database", "Workflow Automation"],
      role: "Healthcare ERP & Operations",
      teamSize: "Solo Developer",
      duration: "8 weeks",
      metrics: {
        efficiencyImprovement: "60%",
        waitingTime: "Reduced",
        resourceUtilization: "Improved",
        patientRecord: "Single unified"
      }
    },
    {
      caseId: "CS-10013",
      client: "WorkForce Analytics",
      businessDomain: "HR Tech / IT Services",
      caseDescription: "High-frequency productivity and task-tracking system designed to surface operational bottlenecks through automated scoring.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Daily activity and task-tracking system that scores productivity and surfaces bottlenecks for managers.",
      selectedSolution: "CS-10013-E",
      projectNumber: "PR-50013",
      projectName: "Staff Productivity & Task Tracker",
      businessProblem: "No structured way to track employee performance, tasks, work hours, or productivity. Manual monitoring caused bias and inefficiency.",
      suggestedSolution: "Built a detailed staff management platform capturing tasks, completion time, delays, attendance, and productivity scores with auto-generated dashboards. Automated daily activity tracking. Task completion velocity metrics. Bottleneck identification through delay pattern analysis. Real-time attendance integration.",
      valueDelivered: "Improved employee productivity by 45%, established transparency, reduced manual supervision, and improved overall team performance. Objective performance measurement eliminates bias. Proactive bottleneck identification prevents delays. Productivity trends visible at individual and team level.",
      featured: false,
      technologies: ["Excel", "Power BI", "VBA", "HR Analytics", "Scoring System"],
      role: "Workforce Productivity Analytics",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        productivityIncrease: "45%",
        transparency: "Objective",
        bottlenecks: "Proactive",
        trends: "Individual + Team"
      }
    },
    {
      caseId: "CS-10014",
      client: "LuxuryRetail (Chalhoub)",
      businessDomain: "Luxury Retail",
      caseDescription: "Live inventory and sales control platform featuring performance-linked salary adjustments and automated loss/damage tracking.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Live inventory and sales platform with loss/damage tracking and performance-linked salary adjustments.",
      selectedSolution: "CS-10014-A",
      projectNumber: "PR-50014",
      projectName: "Inventory & Sales Control with Risk & Salary Integration",
      businessProblem: "Inventory mismatches, losses due to damage/audit errors/theft, and no real-time visibility of stock or profit. Salary calculations disconnected from sales performance.",
      suggestedSolution: "Developed a unified system covering live sales, net profit, inventory levels, discrepancy reporting, damage tracking, and integrated salary computation based on KPIs. Real-time stock updates on every sale. Automated variance alerts. Loss categorization. Performance-linked incentive calculation.",
      valueDelivered: "Reduced stock losses by 55%, increased sales visibility, improved profit accuracy, and ensured fair performance-linked salary payouts. Zero inventory surprises during audits. Real-time profit visibility. Transparent incentive system drives performance.",
      featured: false,
      technologies: ["Excel", "Power BI", "VBA", "Real-time Tracking", "KPI Integration"],
      role: "Retail Inventory & Performance",
      teamSize: "Solo Developer",
      duration: "5 weeks",
      metrics: {
        lossReduction: "55%",
        visibility: "Real-time",
        profitAccuracy: "Improved",
        salaryIntegration: "KPI-based"
      }
    },
    {
      caseId: "CS-10015",
      client: "EduGlobal Uni",
      businessDomain: "Higher Education",
      caseDescription: "Centralized Student Lifecycle Management Suite covering exams, hostels, fee collection, and automated parent/student alert systems.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Centralized system for classes, attendance, exams, hostels, fees, ID issuance and parent/student alerts.",
      selectedSolution: "CS-10015-B",
      projectNumber: "PR-50015",
      projectName: "University Management & Student Tracking Suite",
      businessProblem: "Universities lacked centralized control over classes, students, exams, fees, alerts, complaints, hostel, attendance, and ID issuance. Processes were manual and time-consuming.",
      suggestedSolution: "Built a complete university management suite covering student records, class scheduling, exam planning, hostel management, fee tracking, service requests, ID creation, and real-time alerts. Integrated student lifecycle from admission to graduation. Automated parent/student SMS/email alerts. Digital attendance with analytics.",
      valueDelivered: "Reduced admin workload by 70%, improved student service quality, automated fee reminders & ID issuance, and enabled data-driven academic planning. Single student record across all systems. Zero missed fee payments through automated reminders. Parent satisfaction increased 45%.",
      featured: false,
      technologies: ["Excel", "Access", "Power BI", "VBA", "Workflow Automation"],
      role: "University Management System",
      teamSize: "Solo Developer",
      duration: "7 weeks",
      metrics: {
        adminReduction: "70%",
        feeCollections: "100%",
        parentSatisfaction: "45% increase",
        studentRecord: "Unified"
      }
    },
    {
      caseId: "CS-10016",
      client: "VendorGuard Solutions",
      businessDomain: "Supply Chain & Procurement",
      caseDescription: "Development of a multi-dimensional vendor risk assessment and scoring framework to prevent supply chain disruptions and optimize vendor portfolio management across 200+ suppliers.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Company manages 200+ vendors with no structured risk assessment methodology. Last fiscal year, 3 critical vendors failed mid-contract causing $2M in project delays and emergency sourcing costs at 40% premium. No visibility into vendor financial health, delivery reliability, or compliance status. Board demands proactive risk management framework.",
      selectedSolution: "CS-10016-A",
      projectNumber: "PR-50016",
      projectName: "Multi-Dimensional Vendor Risk & Resilience Framework",
      businessProblem: "Company manages 200+ vendors with no structured risk assessment. 3 critical vendors failed last year causing $2M losses. No visibility into vendor health.",
      suggestedSolution: "Built multi-criteria vendor scoring: Financial Stability (30%), Delivery Performance (25%), Compliance (20%), Pricing (15%), Relationship (10%). Automated risk dashboard with traffic lights. Quarterly vendor reviews for high-risk suppliers. Diversification recommendations for single-source items.",
      valueDelivered: "Prevented $2M in supply disruptions through early warnings. 23 high-risk vendors identified. Single-source risk reduced from 15 to 3 critical items. Automated quarterly reviews save 120 hours/year.",
      featured: true,
      technologies: ["Excel", "Power BI", "Scoring Model", "Risk Analytics"],
      role: "Vendor Risk Management",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        lossesPrevented: "$2M",
        highRiskVendors: "23 identified",
        singleSourceItems: "15 → 3",
        reviewsAutomated: "120 hours/year saved"
      }
    },
    {
      caseId: "CS-10017",
      client: "CloudSync Technologies",
      businessDomain: "SaaS / Enterprise Software",
      caseDescription: "Strategic pricing architecture redesign for B2B SaaS platform transitioning from single-tier to value-based multi-tier pricing model to capture enterprise and SMB segments effectively.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "SaaS company has flat pricing ($99/month) for all customers regardless of size or usage. Losing 60% of enterprise deals ($500K+ ARR) to competitors offering dedicated tiers, while leaving money on table with 2,000+ SMB customers who would pay $150-200/month for enhanced features. Revenue growth stagnant at 8% vs. industry average of 25%.",
      selectedSolution: "CS-10017-C",
      projectNumber: "PR-50017",
      projectName: "Value-Based SaaS Pricing Architecture & ARPU Optimization",
      businessProblem: "Flat pricing leaves money on table. Need data-driven pricing strategy based on customer segments and value delivered.",
      suggestedSolution: "Designed value-based 3-tier architecture: Starter $149 (SMBs, 25 users), Professional $499 (power users, 100 users, API), Enterprise custom (unlimited, dedicated AM). Van Westendorp analysis on 500 customers. 6-month grandfather period.",
      valueDelivered: "Projected 40% revenue increase ($3.5M ARR) with same customer base. Enterprise win rate 45% vs 20%. SMB ARPU up 50%. Power users captured at Professional tier. Clear upgrade path drives expansion revenue.",
      featured: true,
      technologies: ["Excel", "Pricing Analytics", "Van Westendorp", "Segmentation"],
      role: "Pricing Strategy & Monetization",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        revenueIncrease: "40% ($3.5M ARR)",
        enterpriseWinRate: "20% → 45%",
        smbArpu: "+50%",
        customers: "500 analyzed"
      }
    },
    {
      caseId: "CS-10018",
      client: "Apex Manufacturing Ltd",
      businessDomain: "Manufacturing & Industrial",
      caseDescription: "Implementation of comprehensive working capital optimization program targeting cash conversion cycle reduction through inventory, receivables, and payables management.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Manufacturing company has 50 Crore locked in working capital (28Cr inventory, 18Cr receivables, 4Cr payables). Cash conversion cycle is 120 days vs. industry benchmark of 75 days. Company paying 12% interest on working capital loans while cash sits idle in slow-moving inventory and overdue receivables. CFO estimates 6Cr annual opportunity cost.",
      selectedSolution: "CS-10018-A",
      projectNumber: "PR-50018",
      projectName: "Enterprise Working Capital & Cash Conversion Cycle (CCC) Optimizer",
      businessProblem: "₹50Cr locked in working capital. CCC 120 days vs. 75 industry average. Paying 12% interest on working capital loans. ₹6Cr opportunity cost.",
      suggestedSolution: "Implemented systematic CCC reduction: DIO 90→60 days (ABC analysis, JIT for A items, VMI), DSO 75→50 days (2% early payment discount, automated collections), DPO 30→45 days (negotiated terms). Weekly CCC dashboard.",
      valueDelivered: "CCC reduced to 82 days, unlocking ₹19Cr working capital. Inventory carrying costs down ₹2.3Cr annually. ₹8Cr credit line reduction saving ₹96L interest. Improved cash predictability.",
      featured: true,
      technologies: ["Excel", "Cash Flow Modeling", "Working Capital Analytics", "Dashboard"],
      role: "Working Capital Optimization",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        cccReduction: "120 → 82 days",
        capitalUnlocked: "₹19Cr",
        carryingCosts: "-₹2.3Cr/year",
        interestSaved: "₹96L/year"
      }
    },
    {
      caseId: "CS-10019",
      client: "NexGen Cloud Systems",
      businessDomain: "Technology Infrastructure",
      caseDescription: "Strategic make-vs-buy analysis for cloud infrastructure with Total Cost of Ownership comparison between building private cloud vs. continuing public cloud services over 5-year horizon.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Tech company spends $5M annually on AWS/Azure for 500+ servers. Internal infrastructure team proposes building private data centre for $8M upfront capex claiming 40% cost savings within 3 years. No structured TCO analysis exists. CTO Favors build (control), CFO Favors buy (flexibility). Board needs data-driven recommendation with risk assessment.",
      selectedSolution: "CS-10019-D",
      projectNumber: "PR-50019",
      projectName: "Hybrid Cloud TCO & Infrastructure Strategic Make-vs-Buy Model",
      businessProblem: "Security concerns about public cloud. Regulatory requirements may mandate on-premise for sensitive data. Need compliant architecture.",
      suggestedSolution: "Designed hybrid architecture: sensitive data on-premise, non-sensitive in public cloud. Implemented encrypted connectivity between environments. Built compliance documentation for audits.",
      valueDelivered: "Compliance requirements met through hybrid approach. Sensitive data secured on-premise. Non-sensitive data benefits from cloud agility. Added complexity in managing two environments.",
      featured: false,
      technologies: ["Excel", "TCO Modeling", "Cloud Cost Analysis", "Risk Assessment"],
      role: "Cloud Infrastructure Strategy",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        annualSpend: "$5M",
        capex: "$8M",
        projectedSavings: "40% in 3 years",
        servers: "500+"
      }
    },
    {
      caseId: "CS-10020",
      client: "MetroBank Financial",
      businessDomain: "Banking & Financial Services",
      caseDescription: "Customer profitability segmentation and lifetime value analysis to identify high-value customers and optimize resource allocation across 100,000 retail banking customers.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Retail bank has 100,000 customers but no customer-level profitability tracking. Marketing spends equally across all segments. Suspects 80/20 rule applies but can't prove it. Cross-sell efforts yield 2% conversion vs. industry 8%. Customer acquisition cost is $5,000 but retention/expansion strategy is spray-and-pray. Need data-driven customer strategy.",
      selectedSolution: "CS-10020-C",
      projectNumber: "PR-50020",
      projectName: "Data-Driven Customer Lifetime Value (CLV) & Propensity Engine",
      businessProblem: "Cross-sell conversion is poor at 2%. Need better targeting of cross-sell campaigns based on customer propensity.",
      suggestedSolution: "Built cross-sell propensity model using historical data. Scored all customers on likelihood to buy each product. Targeted campaigns to high-propensity customers only.",
      valueDelivered: "Cross-sell conversion increased to 6% through better targeting. Marketing efficiency up 3x. Propensity scores guide sales prioritization. Model accuracy 72% - continues to improve with data.",
      featured: false,
      technologies: ["Excel", "Power BI", "Predictive Modeling", "Customer Analytics"],
      role: "Customer Analytics & CLV",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        conversionRate: "2% → 6%",
        marketingEfficiency: "3x",
        modelAccuracy: "72%",
        customers: "100,000"
      }
    },
    {
      caseId: "CS-10021",
      client: "GlobalTech Mergers Inc",
      businessDomain: "Private Equity / M&A",
      caseDescription: "Post-merger integration synergy tracking and realization framework to monitor $10M promised cost synergies across operations, procurement, technology, and corporate functions.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Company acquired competitor for $50M with board commitment of $10M annual synergies (20% ROI justification). Six months post-merger, no systematic tracking exists. Integration team claims 'progress' but CFO has no data for board. Investor relations under pressure to prove deal thesis. Need enterprise synergy governance system.",
      selectedSolution: "CS-10021-A",
      projectNumber: "PR-50021",
      projectName: "Post-Merger Integration (PMI) Synergy Tracking & Governance Suite",
      businessProblem: "Acquired competitor for $50M promising $10M synergies. 6 months later, no tracking exists. Integration team claims progress but CFO has no data. Investors want proof.",
      suggestedSolution: "Established synergy governance: $10M across Revenue $2M, Cost $6M, Tax $1M, Working Capital $1M. Waterfall tracking: Identified $12M→Approved $10M→In-flight $7M→Realized $4M→At-risk $3M. Red/Amber/Green status. Monthly steering committee.",
      valueDelivered: "Board transparency on $4M realized (40% of target). $3M at-risk identified early for corrective action. Realization accelerated 3 months through clear accountability. Deal thesis validated with investors.",
      featured: false,
      technologies: ["Excel", "Power BI", "Synergy Tracking", "Governance Framework"],
      role: "PMI Synergy Governance",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        synergyTarget: "$10M",
        realized: "$4M (40%)",
        atRisk: "$3M",
        acceleration: "3 months"
      }
    },
    {
      caseId: "CS-10022",
      client: "Horizon Growth Partners",
      businessDomain: "Diversified Conglomerate",
      caseDescription: "Strategic capital allocation framework for ₹100 Crore free cash flow distribution across five competing investment opportunities using multi-criteria decision analysis.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Conglomerate generated 100Cr free cash flow. Board debating 5 options: (1) Build new factory (60Cr, 18% IRR), (2) Acquire competitor (80Cr, strategic), (3) Special dividend (100Cr, shareholder pressure), (4) Share buyback (100Cr, EPS accretive), (5) R&D investment (40Cr, uncertain ROI). No structured framework exists. Each business unit lobbying for their project. CEO needs objective decision model.",
      selectedSolution: "CS-10022-E",
      projectNumber: "PR-50022",
      projectName: "Multi-Criteria Capital Allocation & Risk-Adjusted NPV Model",
      businessProblem: "Factory expansion has 18% IRR but execution risk. Need to assess risk-adjusted return and downside scenarios.",
      suggestedSolution: "Built detailed project risk assessment. Identified key risk factors: demand forecast, construction timeline, cost overruns, technology changes. Scenario analysis with risk probabilities. Expected value calculation.",
      valueDelivered: "Risk-adjusted NPV lower than base case but still attractive. Downside scenarios modeled. Contingency plans developed. Risk mitigation strategies identified. Informed go/no-go decision.",
      featured: false,
      technologies: ["Excel", "Financial Modeling", "Scenario Analysis", "Risk Assessment"],
      role: "Capital Allocation Strategy",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        cashAllocated: "₹100Cr",
        optionsEvaluated: "5",
        scenarios: "Multiple risk-adjusted",
        decision: "Data-driven"
      }
    },
    {
      caseId: "CS-10023",
      client: "Pinnacle Holdings Group",
      businessDomain: "Multi-Industry Conglomerate",
      caseDescription: "Business unit portfolio optimization using BCG Growth-Share Matrix to rationalize 12 business units and develop strategic investment allocation roadmap.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Diversified conglomerate operates 12 business units across manufacturing, retail, services, and technology. No clear portfolio strategy—treating all BUs equally in capital allocation. Some high-growth units starved of cash while declining units overfunded due to legacy relationships. Activist investor demanding portfolio rationalization and 15% ROIC improvement. Board needs data-driven BU strategy.",
      selectedSolution: "CS-10023-E",
      projectNumber: "PR-50023",
      projectName: "Strategic Portfolio Rationalization & BCG Growth-Share Matrix System",
      businessProblem: "Capital allocation process is bottom-up. BUs submit proposals and fight for capital. Need top-down strategic portfolio allocation.",
      suggestedSolution: "Implemented top-down capital allocation aligned to portfolio strategy. Stars get 60% of capital, Questions 25%, Cash Cows 10%, Dogs 5%. BUs compete within their quadrant allocation.",
      valueDelivered: "Top-down approach ensures strategic alignment. Stars receive disproportionate investment to maintain leadership. Questions get funding for scale. Dogs minimize investment. Strategy drives capital, not lobbying.",
      featured: false,
      technologies: ["Excel", "Power BI", "Portfolio Analytics", "BCG Matrix"],
      role: "Portfolio Strategy & BCG Analysis",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        businessUnits: "12 analyzed",
        capitalAllocation: "60/25/10/5",
        roicTarget: "15% improvement",
        strategy: "Top-down"
      }
    },
    {
      caseId: "CS-10024",
      client: "PetroMax Energy Corp",
      businessDomain: "Oil & Gas / Energy",
      caseDescription: "Enterprise scenario planning and financial stress testing framework to model business resilience across five macroeconomic scenarios from severe downturn to boom conditions.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Oil & gas company operates in volatile commodity market. Oil prices swung $40-$120/barrel in 24 months. Current FP&A only models 'base case' budget. No structured scenario planning or trigger-based contingency plans exist. CEO wants to know: 'At what oil price do we break even? When do we cut capex? When do we expand?' Need dynamic scenario framework with action protocols.",
      selectedSolution: "CS-10024-B",
      projectNumber: "PR-50024",
      projectName: "Dynamic Macro-Economic Stress Testing & Scenario Response Protocol",
      businessProblem: "Business planning uses single base case assumption. Reality deviates and plan becomes obsolete. Need for multiple scenarios.",
      suggestedSolution: "Created 3 scenarios: Optimistic, Base, Pessimistic. Modeled revenue and cost implications. Contingency plans outlined for each scenario.",
      valueDelivered: "Multiple scenarios provide range of outcomes. Contingency plans prepared. Planning more resilient to volatility. Three scenarios may not cover full range of possibilities.",
      featured: false,
      technologies: ["Excel", "Scenario Modeling", "Stress Testing", "Oil & Gas Analytics"],
      role: "Scenario Planning & Stress Testing",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        priceVolatility: "$40-120/barrel",
        scenarios: "3 (Optimistic/Base/Pessimistic)",
        resilience: "Improved"
      }
    },
    {
      caseId: "CS-10025",
      client: "GreenFuture Industries",
      businessDomain: "Manufacturing / Heavy Industry",
      caseDescription: "Design and implementation of ESG (Environmental, Social, Governance) reporting framework aligned with GRI/SASB standards to meet investor and regulatory disclosure requirements.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "€500M revenue manufacturing company facing pressure from institutional investors (40% ownership) and EU regulations to report ESG metrics. Currently tracking nothing systematically. Investors threatening to divest if no ESG roadmap by Q4. Customers (B2B) now requiring supplier ESG scorecards in RFPs. Company at risk of losing €50M in contracts. Need comprehensive ESG measurement and reporting framework.",
      selectedSolution: "CS-10025-A",
      projectNumber: "PR-50025",
      projectName: "Enterprise ESG Governance & Regulatory Disclosure Framework (GRI/SASB)",
      businessProblem: "€500M manufacturer, 40% institutional investors, EU regulations require ESG reporting. No systematic tracking. Investors threatening divest by Q4. Customers require ESG scorecards. Risk losing €50M contracts.",
      suggestedSolution: "Designed comprehensive ESG framework: Environmental (12 metrics - Scope 1/2/3 GHG, energy, water, waste), Social (8 metrics - diversity, safety, training), Governance (5 metrics - board independence, ethics). GRI/SASB aligned. Baseline data methodology. Board dashboard. 3-year roadmap.",
      valueDelivered: "Prevented €50M contract losses through ESG disclosure. ESG rating D→B- in 18 months attracting ESG investors. Identified €8M energy savings. 15% turnover reduction through diversity/safety focus. EU taxonomy and CSRD ready.",
      featured: true,
      technologies: ["Excel", "Power BI", "ESG Framework", "GRI/SASB", "Carbon Accounting"],
      role: "ESG Reporting & Governance",
      teamSize: "Solo Developer",
      duration: "5 weeks",
      metrics: {
        contractsRisk: "€50M",
        rating: "D → B-",
        energySavings: "€8M",
        turnoverReduction: "15%"
      }
    },
    {
      caseId: "CS-10026",
      client: "Techno Time LLC",
      businessDomain: "IT & Finance",
      caseDescription: "A MNC which has a dench ownership structure can't be managed with proper documentation. Even though we covered most of the info in excel, All structure are needed to be made manually resulting in lots of problem like false structure. Software in market cost $25,000 per year.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "Company is losing time and money when it comes to repeated work. Data management is also a problem for company. To solve the problem company, need an internal system which can make all these solutions quickly",
      selectedSolution: "CS-10026-B",
      projectNumber: "PR-50026",
      projectName: "Organization Ownership VBA & Heat Map",
      businessProblem: "Entity master data, directors, share classes, resolutions need controlled documents.",
      suggestedSolution: "A Zero Cost structure in Excel itself that can use VBA Code and make Structure in seconds. The Heat Map can be 100% Formulated and Pivot Charts can Make a Visual Impact. Minutes via templates & snapshots",
      valueDelivered: "Minutes via templates & snapshots",
      featured: false,
      technologies: ["Excel", "VBA", "Heat Map", "Pivot Charts"],
      role: "Ownership Structure Management",
      teamSize: "Solo Developer",
      duration: "4 weeks",
      metrics: {
        softwareCostSaved: "$25,000/year",
        automation: "VBA-powered",
        visualization: "Heat Map + Pivot Charts"
      }
    },
    {
      caseId: "CS-10027",
      client: "Decon FINO Industries",
      businessDomain: "IT & Finance",
      caseDescription: "Decon FINO Industries is a multinational organization with multiple subsidiary entities operating across different regions. The company regularly performs a large volume of intercompany transactions, including internal billing, cost allocations, and cross-entity payments. Currently, these transactions are recorded and tracked manually through multiple spreadsheets maintained by different finance teams. Due to the absence of a centralized system, the organization faces challenges such as data inconsistency, delayed reconciliations, duplicate entries, and difficulty in identifying mismatched intercompany balances between entities. The manual consolidation process also consumes significant time and increases the risk of reporting errors during financial closing periods.",
      providedByOrg: true,
      timeRating: true,
      qualityRating: true,
      quantityRating: true,
      problemStatement: "The organization is experiencing inefficiencies in managing intercompany transactions due to manual tracking and fragmented data sources. This leads to time delays, reconciliation errors, and lack of visibility in financial reporting. Management requires a centralized dashboard-based solution that can automatically track transactions, highlight mismatches between entities, and provide clear reporting for faster decision-making and financial control.",
      selectedSolution: "CS-10027-A",
      projectNumber: "PR-50027",
      projectName: "Intercompany Balance Dashboard",
      businessProblem: "Intercompany transactions between subsidiaries are recorded in multiple spreadsheets maintained by different finance teams, leading to data inconsistency and duplication.",
      suggestedSolution: "Develop a centralized Intercompany Dashboard in Excel that automatically consolidates transaction data from all entity ledgers.",
      valueDelivered: "Reduce manual reconciliation time by providing automated balance comparison and reporting.",
      featured: false,
      technologies: ["Excel", "VBA", "Dashboard", "Reconciliation"],
      role: "Intercompany Reconciliation",
      teamSize: "Solo Developer",
      duration: "3 weeks",
      metrics: {
        reconciliationTime: "Reduced",
        consistency: "Automated",
        visibility: "Centralized"
      }
    }
  ]

  for (const projectData of projects) {
    const slug = projectData.projectName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    await prisma.project.upsert({
      where: { caseId: projectData.caseId },
      update: projectData,
      create: {
        ...projectData,
        slug,
      }
    })
  }

  console.log(`Created/updated ${projects.length} projects`)

  // Create resume entry
  await prisma.resume.upsert({
    where: { id: 'default' },
    update: {
      filename: 'Ankit_Singh_Resume.pdf',
      url: '/resume/Ankit_Singh_Resume.pdf',
      updatedAt: new Date(),
    },
    create: {
      id: 'default',
      filename: 'Ankit_Singh_Resume.pdf',
      url: '/resume/Ankit_Singh_Resume.pdf',
      content: `# ANKIT SINGH

Finance & Business Systems Automation | FP&A | Finance Technology

Bangalore, India • +91-6366238177 • Ankit.singh.offcode@gmail.com • www.linkedin.com/in/Brand-Ankit

## PROFESSIONAL SUMMARY

Finance & Technology professional with 4+ years of experience engineering enterprise-grade automation systems, FP&A frameworks, and decision-intelligence platforms across IT services and infrastructure sectors. Track record of building production-deployed systems that process 200,000+ transaction lines, govern 150+ active contracts, and compress reporting cycles from months to days. Currently contributing to a confidential M&A due diligence engagement while managing analytics ecosystems supporting stakeholders across India, USA, UAE, and Nepal. Rated Exceptional Performer (5/5) by management — recognized specifically for excellence in dashboard engineering, process automation, proactive problem-solving, and continuous self-learning. Deep hands-on expertise with SAP S/4HANA, SAP Concur, Power BI, SQL and modular Excel architecture (Advanced). Actively advancing in Python to expand automation capabilities.

## CORE COMPETENCIES

| Finance & FP&A | - FP&A • Budgeting • Forecasting • Variance Analysis • Run-Rate Analytics • M&A Due Diligence • Scenario Modeling • Cost Optimization • Working Capital Analysis • Costing |
|---|---|
| Data & Analytics | - SQL (Advanced — CTEs, Window Functions, Query Optimization) • Power BI • DAX • Power Query • Data Modeling • Python (Active Development) |
| Systems & Automation | - VBA • Power Automate • SharePoint • Enterprise Excel Architecture • Modular ERP Design • ETL (Light) • Automated Dashboard Engineering |
| Enterprise Tools | - SAP S/4HANA (PP, MM, PM) • SAP Concur • Jira • Advanced Excel (Validation-Driven Architecture) |

## PROFESSIONAL EXPERIENCE

### Infinite Computer Solutions

Sep 2025 – Present

### Executive — FP&A & Automation Analytics | Bangalore, India

- Contributing to a confidential M&A due diligence engagement — built comprehensive financial review covering contract inventory, revenue project mapping, location-wise cost structure analysis, salary payment tracking, CAPEX/OPEX breakdown, ongoing project assessment, and a formal due diligence checklist supporting senior management decision-making. (Active, undisclosed deal.)
- FY26 - Architected and deployed Enterprise Spend Intelligence System processing 200,000+ transaction lines across 12 categories and 72 sub-categories — delivered 80% reduction in manual reporting effort with real-time cost leakage detection and automated month-on-month trend analysis using more than 5 different and 100% automated dashboards.
- Engineered Contract Lifecycle Intelligence Platform governing 150+ active contracts (primary entity) and 80+ contracts (sister entity) with automated aging classification (0–60 / 60–90 / 90+ days), vendor KPI tracking, and renewal risk flags — enabling multi-million-dollar cost avoidance through proactive contract governance.
- Designed Organizational Ownership & Director Heatmap System replacing a ~$25,000/year external software solution with an internally built modular engine — received direct recognition from director-level leadership.
- Designed and implemented Intercompany Balances Automated Dashboard with action tracker, enabling automated mismatch detection, entity-level reconciliation visibility, and management-level reporting across all intercompany transactions.
- Compressed finance reporting timeline from 4 months to 12 days via validation-driven automation architecture with auto-refreshing dashboards.
- Architected a 30+ dashboard finance analytics ecosystem supporting stakeholders across India, USA, UAE, and Nepal — delivering real-time cost visibility, automated variance reporting, and cross-business-unit performance intelligence.
- Trained and supported business users on dashboard adoption, analytical interpretation, and reporting workflows — rated 'Excellent in automating redundant process, leading to enhanced efficiency' and 'Excellent in creating dashboards' by manager in formal appraisal.

### SRC Infrastructure

Jul 2022 – Sep 2025

# Associate — Finance Operations | Infrastructure & Construction Sector

- Led the migration SAP S/4HANA implementation as the organization migrated from Excel-based operations — led costing configuration, variance testing, and reporting workflow design across Production Planning (PP), Materials Management (MM), and Plant Maintenance (PM) modules.
- Engineered a modular Excel-based ERP system (12 integrated modules: HR, Accounts, Procurement, Inventory, Production, Costing, OPEX/CAPEX, Depreciation, Budgeting, Forecasting) with Power BI integration and single-page management summary — eliminated 70% of manual cross-department handoffs.
- Managed finance operations for a ₹574+ Cr infrastructure portfolio spanning 35+ active sites, covering procurement processing, GRN management, inventory tracking, and multi-vendor payment reconciliation.
- Designed and built multi-location FP&A models on Excel covering annual budgeting, rolling forecasts, job costing, and variance analysis across all 35+ construction and infrastructure sites — serving as the core financial planning engine before SAP implementation.
- Reduced reconciliation cycle time by 60% through automation templates, structured validation workflows, and systematic elimination of manual consolidation — rated 'Excellent in automating redundant processes, leading to enhanced efficiency' in formal appraisal.
- Built Automated Audit & Reporting Engine with 100% validation-controlled workflows — reduced monthly financial close from days to hours with self-refreshing audit trails and structured reconciliation logic.

## KEY PROJECTS — PRODUCTION-DEPLOYED SYSTEMS

### Confidential M&A Due Diligence Engagement | Infinite Computer Solutions | Active

- Leading structured financial due diligence for an active IT acquisition — covering contract inventory, revenue project analysis, location-wise cost modeling, salary payment audit, CAPEX/OPEX review, and a formal due diligence checklist. Supporting acquisition decision-making at senior management level. (Deal is active and confidential; details available upon NDA.)

### Enterprise Spend Intelligence System (PR-50001) | Infinite Computer Solutions

- Fully automated cost governance system processing 200,000+ transaction lines across 12 categories and 72 sub-categories. Six automated dashboards with live FY variance tracking, anomaly alerts, and trend analysis. Delivered 80% reduction in manual reporting effort and collapsed a 4-month reporting backlog to 12 days.

### Contract Lifecycle Intelligence Platform (PR-50003) | Infinite Computer Solutions

- Centralized contract governance covering 150+ active contracts (primary entity) and 80+ (sister entity) with automated aging buckets, vendor KPI scorecards, renewal risk classification, and renegotiation recommendations. Enabled multi-million-dollar cost avoidance. Seven automated dashboards with real-time decision intelligence.

### Organizational Ownership & Director Heatmap System (PR-50026) | Infinite Computer Solutions

- Replaced ~$25,000/year commercial software with an internally built multi-entity ownership modeling engine featuring automated director-level heatmaps and governance workflows. Received direct recognition from director-level leadership. Fully deployed in active production.

### Excel-Based End-to-End ERP System (PR-50002) | SRC Infrastructure

- Twelve-module integrated ERP (HR → Accounts → Procurement → Inventory → Production → Costing → OPEX/CAPEX → Depreciation → Budgeting → Forecasting) with Power BI integration. Eliminated 70% of manual handoffs and delivered end-to-end operational control across a ₹574+ Cr infrastructure portfolio.

### Intercompany Balance Dashboard (PR-50027) | Infinite Computer Solutions

- Developed a centralized Intercompany Dashboard in Excel that automatically consolidates transaction data from all entity ledgers. The dashboard features a clear heatmap visualization and a transaction tracker that simulates the virtual flow of funds between companies. This provides management with enhanced visibility into ledger impacts, enabling more efficient fund allocation and better planning of future intercompany transactions.

## EDUCATION

MBA — Finance & Marketing
Mangalayatan University
2021 – 2023

B.Tech — Mechanical Engineering
Lovely Professional University
2015 – 2019

Rated Exceptional Performer (5/5) • 20+ Production-Grade Finance Systems Built`,
    }
  })

  console.log('Resume entry created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
