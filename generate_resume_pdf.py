import sys
import subprocess

try:
    import reportlab
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])
    import reportlab

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = "public/resume.pdf"
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=30,
    bottomMargin=30
)

styles = getSampleStyleSheet()

# Custom Colors
NAVY = colors.HexColor("#1A365D")
DARK_GRAY = colors.HexColor("#2D3748")

# Custom Paragraph Styles
title_style = ParagraphStyle(
    "TitleStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=18,
    leading=20,
    textColor=NAVY,
    alignment=1,
)

subtitle_style = ParagraphStyle(
    "SubtitleStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.5,
    leading=12,
    textColor=DARK_GRAY,
    alignment=1,
)

contact_style = ParagraphStyle(
    "ContactStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=11.5,
    textColor=DARK_GRAY,
    alignment=1,
)

link_bar_style = ParagraphStyle(
    "LinkBarStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.5,
    leading=11,
    textColor=NAVY,
    alignment=1,
)

heading_style = ParagraphStyle(
    "HeadingStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    textColor=NAVY,
    spaceBefore=4,
    spaceAfter=2,
)

body_style = ParagraphStyle(
    "BodyStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.0,
    leading=10.8,
    textColor=DARK_GRAY,
)

bold_body_style = ParagraphStyle(
    "BoldBodyStyle",
    parent=body_style,
    fontName="Helvetica-Bold",
)

bullet_style = ParagraphStyle(
    "BulletStyle",
    parent=body_style,
    leftIndent=8,
    firstLineIndent=-5,
    spaceAfter=1.2,
)

story = []

# Header
story.append(Paragraph("PRATEEK GUPTA", title_style))
story.append(Spacer(1, 2))
story.append(Paragraph("Associate DevOps Engineer &nbsp;|&nbsp; Multi-Cloud (Azure/AWS) &nbsp;|&nbsp; DevSecOps", subtitle_style))
story.append(Spacer(1, 2))
story.append(Paragraph("sre.prateek@gmail.com &nbsp;|&nbsp; +91-9580991574 &nbsp;|&nbsp; Greater Noida, India", contact_style))
story.append(Spacer(1, 2))
story.append(Paragraph('<a href="https://github.com/iprateek13" color="#1A365D">Portfolio</a> &nbsp;|&nbsp; <a href="https://linkedin.com/in/iprateekgupta13" color="#1A365D">LinkedIn</a> &nbsp;|&nbsp; <a href="https://github.com/iprateek13" color="#1A365D">GitHub</a>', link_bar_style))
story.append(Spacer(1, 4))

def add_section_header(title):
    story.append(Paragraph(title, heading_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=NAVY, spaceBefore=1, spaceAfter=3))

# Professional Summary
add_section_header("PROFESSIONAL SUMMARY")
summary_text = (
    "Associate DevOps Engineer with hands-on, multi-cloud experience across Azure and AWS, specializing in Infrastructure as Code "
    "(Terraform), Azure Landing Zone design, and DevSecOps-driven CI/CD pipelines. Skilled at translating business requirements into HLD/LLD "
    "for secure, scalable, cost-efficient network and cloud architectures. Proficient in Azure core networking (VNet peering, Hub-Spoke topology, "
    "ExpressRoute, VPN Gateway, Private Endpoints, Azure Firewall, Application Gateway, Load Balancer), infrastructure security scanning (tfsec, tflint, "
    "Checkov), and cost governance (Infracost, Azure Cost Management). Growing AWS proficiency."
)
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 3))

# Technical Skills Table
add_section_header("TECHNICAL SKILLS")
skills_data = [
    [Paragraph("<b>Cloud Platforms</b>", body_style), Paragraph("Microsoft Azure (Compute, Storage, Networking, IAM) · AWS (EC2, S3, VPC, IAM) · Multi-Cloud Architecture", body_style)],
    [Paragraph("<b>Azure Networking</b>", body_style), Paragraph("VNet, Subnetting, VNet Peering, Hub-and-Spoke Topology, NSG, Azure Firewall, ExpressRoute, VPN Gateway, Private Endpoints, Application Gateway, Load Balancer, Azure DNS, Route Tables", body_style)],
    [Paragraph("<b>Cloud Architecture</b>", body_style), Paragraph("Azure Landing Zone (Hub-Spoke), HLD & LLD, Well-Architected Framework principles", body_style)],
    [Paragraph("<b>IaC</b>", body_style), Paragraph("Terraform (Modules, State, Workspaces, Remote Backend) — VNet, VM, NSG, Landing Zone provisioning", body_style)],
    [Paragraph("<b>DevSecOps</b>", body_style), Paragraph("tfsec, tflint, Checkov, Gitleaks, Infracost", body_style)],
    [Paragraph("<b>CI/CD</b>", body_style), Paragraph("GitHub Actions, Azure Pipelines, Blue-Green Deployments", body_style)],
    [Paragraph("<b>Monitoring & Cost</b>", body_style), Paragraph("Azure Monitor, Azure Cost Management, Infracost, OpenCost", body_style)],
    [Paragraph("<b>Scripting</b>", body_style), Paragraph("Python, Bash, PowerShell (infrastructure automation & network config scripting)", body_style)],
    [Paragraph("<b>Version Control</b>", body_style), Paragraph("Git, GitHub, Azure Repos", body_style)],
    [Paragraph("<b>Operating Systems</b>", body_style), Paragraph("Linux (Ubuntu), Windows", body_style)],
]

skills_table = Table(skills_data, colWidths=[110, 430])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 0.8),
    ('TOPPADDING', (0,0), (-1,-1), 0.8),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
story.append(skills_table)
story.append(Spacer(1, 3))

# Internship Experience
add_section_header("INTERNSHIP EXPERIENCE")
story.append(Paragraph("<b>Associate DevOps Engineer — DevOps Insiders</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>May 2026 – Present</b>", body_style))
story.append(Paragraph("<i>India</i>", ParagraphStyle("SubLocation", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1.5))

exp_bullets = [
    "Designed and built an Azure Landing Zone using reusable parent-child Terraform modules with a Hub-and-Spoke network topology — hub/spoke VNets, VNet peering, centralized NSGs, and a remote Azure backend for state management.",
    "Deployed and managed diverse workloads on the Landing Zone, including monolithic applications, Virtual Machines, VM Scale Sets (VMSS), App Service & App Service Plans, and Kubernetes (AKS) based services.",
    "Automated runtime configuration and infrastructure provisioning using Linux, Bash, and PowerShell scripting integrated with Terraform (IaC), and provisioned core Azure resources (Resource Groups, Storage Accounts, VMs) via Azure CLI/Portal.",
    "Used Git and GitHub for version control, and managed work items, sprints, and backlogs using Azure Repos and Azure Boards.",
    "Implemented a CI/CD pipeline following a trunk-based development strategy and branching best practices, with a dedicated infrastructure pipeline enforcing DevSecOps scanning (tfsec, tflint, Checkov) before every merge — delivering an error-free, secure, and cost-efficient automated Landing Zone pipeline.",
    "Built secure file-sharing solutions using Azure Blob Storage with SAS Token-based access control, and monitored/optimized cloud costs using OpenCost, Infracost, and Azure Cost Management dashboards."
]

for b in exp_bullets:
    story.append(Paragraph(f"◆ &nbsp; {b}", bullet_style))

story.append(Spacer(1, 3))

# Projects
add_section_header("PROJECTS")

# Project 1
story.append(Paragraph("<b>Azure Landing Zone – Hub & Spoke Architecture</b>", bold_body_style))
story.append(Paragraph("<i>Terraform · Azure VNet Peering · NSG · Remote State Backend · HLD/LLD</i>", ParagraphStyle("Sub1", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p1_bullets = [
    "Authored HLD and LLD documentation for a production-style Azure Landing Zone, defining hub-spoke topology, IP addressing plan, and security boundaries.",
    "Built the Landing Zone end-to-end in Terraform with seven reusable child modules and nested map(object(...)) variables for scalable, multi-environment provisioning.",
    "Implemented hub-spoke VNet peering, centralized NSGs, and route tables to enforce segmented, least-privilege network access.",
    "Configured a remote Azure backend for Terraform state, enabling safe collaborative and repeatable deployments."
]
for b in p1_bullets:
    story.append(Paragraph(f"◆ &nbsp; {b}", bullet_style))

story.append(Spacer(1, 2.5))

# Project 2
story.append(Paragraph("<b>CI/CD Pipeline with Infrastructure as Code & DevSecOps</b>", bold_body_style))
story.append(Paragraph("<i>Azure Pipelines · Terraform · GitHub Actions · tfsec · Checkov · Infracost · Azure Monitor</i>", ParagraphStyle("Sub2", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p2_bullets = [
    "Designed and deployed a CI/CD pipeline on Azure integrating GitHub with Azure Pipelines for automated builds and deployments.",
    "Embedded DevSecOps gates (tfsec, tflint, Checkov for policy/security scanning and Infracost for cost estimation) directly into the pipeline before every apply.",
    "Automated application deployment to VM instances on every code push, reducing manual intervention, and used reusable Terraform modules to provision VNet, Subnets, NSGs, and VMs.",
    "Stored build artifacts in Azure Blob Storage and implemented a blue-green deployment strategy for zero-downtime releases; configured least-privilege Azure AD roles and Azure Monitor for centralized logging and alerting."
]
for b in p2_bullets:
    story.append(Paragraph(f"◆ &nbsp; {b}", bullet_style))

story.append(Spacer(1, 2.5))

# Project 3
story.append(Paragraph("<b>Azure Billing & Cost Management</b>", bold_body_style))
story.append(Paragraph("<i>Azure Cost Management · Azure Budgets · Infracost · Resource Tagging</i>", ParagraphStyle("Sub3", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p3_bullets = [
    "Analyzed cloud usage, service costs, and billing trends using Azure Cost Management dashboards to identify optimization opportunities.",
    "Configured Azure Budgets with alert rules to monitor spending and prevent cost overruns, and implemented resource tagging for accurate cost allocation.",
    "Identified unused/underutilized resources and recommended cost-saving actions using Azure Monitor and Infracost estimates."
]
for b in p3_bullets:
    story.append(Paragraph(f"◆ &nbsp; {b}", bullet_style))

story.append(Spacer(1, 3))

# Education
add_section_header("EDUCATION")
story.append(Paragraph("<b>B.Tech – Computer Science & Engineering</b>, Dr. A.P.J Abdul Kalam Technical University (AKTU) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>2022 – 2026</b>", body_style))
story.append(Paragraph("<i>CGPA: 7.8</i>", body_style))
story.append(Spacer(1, 1))
story.append(Paragraph("12th – PCM, UP Board &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>2021 · 76%</b>", body_style))
story.append(Paragraph("10th – Mathematics, CBSE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>2019 · 79.8%</b>", body_style))
story.append(Spacer(1, 3))

# Certifications
add_section_header("CERTIFICATIONS")
story.append(Paragraph("◆ &nbsp; Data Structures & Algorithms Certification – Apna College", bullet_style))

doc.build(story)
import shutil
shutil.copyfile("public/resume.pdf", "public/sre.prateek_resume.pdf")
print("Updated PDF Generated successfully at public/resume.pdf and public/sre.prateek_resume.pdf")
