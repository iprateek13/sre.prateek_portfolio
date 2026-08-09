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
    topMargin=32,
    bottomMargin=32
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
    fontSize=10,
    leading=13,
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

button_text_style = ParagraphStyle(
    "ButtonTextStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9,
    leading=11,
    textColor=colors.white,
    alignment=1,
)

heading_style = ParagraphStyle(
    "HeadingStyle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=13,
    textColor=NAVY,
    spaceBefore=5,
    spaceAfter=2,
)

body_style = ParagraphStyle(
    "BodyStyle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=11,
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
    leftIndent=10,
    firstLineIndent=-6,
    spaceAfter=1.5,
)

story = []

# Header
story.append(Paragraph("PRATEEK GUPTA", title_style))
story.append(Spacer(1, 2))
story.append(Paragraph("Cloud & Infrastructure Engineer &nbsp;|&nbsp; Multi-Cloud (Azure/AWS) &nbsp;|&nbsp; DevSecOps", subtitle_style))
story.append(Spacer(1, 2))
story.append(Paragraph("✉ sre.prateek@gmail.com &nbsp;|&nbsp; ☎ +91-9580991574 &nbsp;|&nbsp; ⚲ Greater Noida, India", contact_style))
story.append(Spacer(1, 4))

# Clickable LinkedIn and GitHub Button Box Table
btn_data = [
    [
        Paragraph('<a href="https://linkedin.com/in/iprateekgupta13" color="#FFFFFF">LinkedIn</a>', button_text_style),
        Paragraph('<a href="https://github.com/iprateek13" color="#FFFFFF">GitHub</a>', button_text_style)
    ]
]
btn_table = Table(btn_data, colWidths=[200, 200], hAlign='CENTER')
btn_table.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), NAVY),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ('GRID', (0,0), (-1,-1), 1, colors.HexColor("#0F2942")),
    ('ROUNDEDCORNERS', [2, 2, 2, 2]),
]))
story.append(btn_table)
story.append(Spacer(1, 6))

def add_section_header(title):
    story.append(Paragraph(title, heading_style))
    story.append(HRFlowable(width="100%", thickness=0.8, color=NAVY, spaceBefore=1, spaceAfter=3))

# Professional Summary
add_section_header("PROFESSIONAL SUMMARY")
summary_text = (
    "Cloud & Infrastructure Engineer with hands-on, multi-cloud experience across Azure and AWS, specializing in Infrastructure as Code "
    "(Terraform), Azure Landing Zone design, and DevSecOps-driven CI/CD pipelines. Skilled at translating business requirements into High-Level "
    "Design (HLD) and Low-Level Design (LLD) for secure, scalable, and cost-efficient network and cloud architectures. Proficient in Azure core "
    "networking (VNet peering, Hub-Spoke topology, ExpressRoute, VPN Gateway, Private Endpoints, Azure Firewall, Application Gateway, Load "
    "Balancer), infrastructure security scanning (tfsec, tflint, Checkov), and cost governance (Infracost, Azure Cost Management). Microsoft Azure "
    "Fundamentals (AZ-900) certified, with growing AWS proficiency, and eager to deliver enterprise-grade cloud solutions in a professional services environment."
)
story.append(Paragraph(summary_text, body_style))
story.append(Spacer(1, 3))

# Technical Skills Table
add_section_header("TECHNICAL SKILLS")
skills_data = [
    [Paragraph("<b>Cloud Platforms</b>", body_style), Paragraph("Microsoft Azure (Compute, Storage, Networking, IAM) &nbsp;·&nbsp; AWS (EC2, S3, VPC, IAM) &nbsp;·&nbsp; Multi-Cloud Architecture", body_style)],
    [Paragraph("<b>Azure Networking</b>", body_style), Paragraph("VNet, Subnetting, VNet Peering, Hub-and-Spoke Topology, NSG, Azure Firewall, ExpressRoute, VPN Gateway, Private Endpoints, Application Gateway, Load Balancer, Azure DNS, Route Tables", body_style)],
    [Paragraph("<b>Cloud Architecture</b>", body_style), Paragraph("Azure Landing Zone (Hub-Spoke), High-Level Design (HLD) & Low-Level Design (LLD), Well-Architected Framework principles", body_style)],
    [Paragraph("<b>IaC</b>", body_style), Paragraph("Terraform (Modules, State, Workspaces, Remote Backend) — VNet, VM, NSG, Landing Zone provisioning", body_style)],
    [Paragraph("<b>DevSecOps</b>", body_style), Paragraph("tfsec, tflint, Checkov, Infracost, OPA/Policy-as-Code, Trivy, Shift-Left Security Scanning in CI/CD", body_style)],
    [Paragraph("<b>CI/CD Pipelines</b>", body_style), Paragraph("GitHub Actions, Azure Pipelines, Blue-Green Deployments", body_style)],
    [Paragraph("<b>Monitoring</b>", body_style), Paragraph("Azure Monitor, Log Analytics, Alerting & Incident Response", body_style)],
    [Paragraph("<b>Cost Management</b>", body_style), Paragraph("OpenCost, Azure Cost Management, Azure Budgets, Infracost", body_style)],
    [Paragraph("<b>Scripting</b>", body_style), Paragraph("Python, Bash, PowerShell (infrastructure automation & network config scripting)", body_style)],
    [Paragraph("<b>Version Control</b>", body_style), Paragraph("Git, GitHub, Azure Repos", body_style)],
    [Paragraph("<b>Programming</b>", body_style), Paragraph("Java, JavaScript (ES6+)", body_style)],
    [Paragraph("<b>Operating Systems</b>", body_style), Paragraph("Linux (Ubuntu), Windows", body_style)],
]

skills_table = Table(skills_data, colWidths=[115, 425])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 1),
    ('TOPPADDING', (0,0), (-1,-1), 1),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('RIGHTPADDING', (0,0), (-1,-1), 0),
]))
story.append(skills_table)
story.append(Spacer(1, 3))

# Internship Experience
add_section_header("INTERNSHIP EXPERIENCE")
story.append(Paragraph("<b>Cloud Infrastructure Intern | DevOps Insiders</b> &nbsp;&nbsp;&nbsp;&nbsp; <i>Jan 2026 – Present • India</i>", body_style))
story.append(Spacer(1, 1.5))

exp_bullets = [
    "Provisioned and managed Azure resources (Resource Groups, Storage Accounts, Virtual Machines) using Azure CLI and Azure Portal.",
    "Designed and implemented an <b>Azure Landing Zone</b> using a Hub-and-Spoke architecture with Terraform, covering hub/spoke VNets, VNet peering, centralized NSGs, and a remote Azure backend for state management.",
    "Automated cloud infrastructure using Terraform (IaC), writing reusable child modules for consistent, repeatable, and auditable deployments.",
    "Designed and provisioned Azure Virtual Networks (VNet), Subnets, and NSGs using Terraform for secure, segmented infrastructure deployments.",
    "Integrated <b>DevSecOps</b> scanning (tfsec, tflint, Checkov) into IaC workflows to catch misconfigurations and policy violations before deployment.",
    "Built secure file-sharing solutions using Azure Blob Storage with SAS Token-based access control.",
    "Contributed to CI/CD pipeline automation using GitHub Actions and Azure Pipelines for streamlined cloud deployments.",
    "Monitored and optimized cloud resource costs using OpenCost, Infracost, and Azure Cost Management dashboards."
]

for b in exp_bullets:
    story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

story.append(Spacer(1, 3))

# Projects
add_section_header("PROJECTS")

# Project 1
story.append(Paragraph("<b>Azure Landing Zone – Hub & Spoke Architecture</b>", bold_body_style))
story.append(Paragraph("<i>Terraform · Azure VNet Peering · NSG · Remote State Backend · HLD/LLD</i>", ParagraphStyle("Sub1", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p1_bullets = [
    "Authored <b>HLD and LLD</b> documentation for a production-style Azure Landing Zone, defining hub-spoke topology, IP addressing plan, and security boundaries.",
    "Built the Landing Zone end-to-end in Terraform with seven reusable child modules and nested map(object(...)) variables for scalable, multi-environment provisioning.",
    "Implemented hub-spoke VNet peering, centralized NSGs, and route tables to enforce segmented, least-privilege network access.",
    "Configured a remote Azure backend for Terraform state, enabling safe collaborative and repeatable deployments."
]
for b in p1_bullets:
    story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

story.append(Spacer(1, 2.5))

# Project 2
story.append(Paragraph("<b>CI/CD Pipeline with Infrastructure as Code & DevSecOps</b>", bold_body_style))
story.append(Paragraph("<i>Azure Pipelines · Terraform · GitHub Actions · tfsec · Checkov · Infracost · Azure Monitor</i>", ParagraphStyle("Sub2", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p2_bullets = [
    "Designed and deployed a CI/CD pipeline on Azure integrating GitHub with Azure Pipelines for automated builds and deployments.",
    "Embedded <b>DevSecOps</b> gates (tfsec, tflint, Checkov for policy/security scanning and Infracost for cost estimation) directly into the pipeline before every apply.",
    "Automated application deployment to Virtual Machine instances on every code push, reducing manual intervention.",
    "Used Terraform to provision end-to-end infrastructure including VNet, Subnets, NSGs, and VMs — created reusable modules for simplified management.",
    "Stored build artifacts in Azure Blob Storage and implemented a blue-green deployment strategy for zero-downtime releases.",
    "Configured Azure AD roles with least-privilege access and used Azure Monitor for centralized logging and alerting."
]
for b in p2_bullets:
    story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

story.append(Spacer(1, 2.5))

# Project 3
story.append(Paragraph("<b>Azure Billing & Cost Management</b>", bold_body_style))
story.append(Paragraph("<i>Azure Cost Management · Azure Budgets · Infracost · Resource Tagging</i>", ParagraphStyle("Sub3", parent=body_style, fontSize=7.5, textColor=colors.HexColor("#4A5568"))))
story.append(Spacer(1, 1))
p3_bullets = [
    "Analyzed cloud usage, service costs, and billing trends using Azure Cost Management dashboards to identify optimization opportunities.",
    "Configured Azure Budgets with alert rules to monitor spending, control usage, and prevent cost overruns.",
    "Implemented resource tagging strategies to enable accurate cost allocation and better resource management.",
    "Identified unused or underutilized resources and recommended cost-saving actions using Azure Monitor and Infracost estimates."
]
for b in p3_bullets:
    story.append(Paragraph(f"• &nbsp; {b}", bullet_style))

story.append(Spacer(1, 3))

# Education
add_section_header("EDUCATION")
story.append(Paragraph("<b>B.Tech – Computer Science & Engineering</b> &nbsp;&nbsp; 2022 – 2026 • CGPA: 7.8 &nbsp;&nbsp; <i>Dr. A.P.J Abdul Kalam Technical University (AKTU)</i>", body_style))
story.append(Paragraph("12th – PCM | UP Board 2021 • 76% &nbsp;&nbsp;&nbsp;&nbsp; 10th – Mathematics | CBSE 2019 • 79.8%", body_style))
story.append(Spacer(1, 3))

# Certifications
add_section_header("CERTIFICATIONS")
story.append(Paragraph("• &nbsp; <b>Microsoft Certified: Azure Fundamentals (AZ-900)</b> – Microsoft", bullet_style))
story.append(Paragraph("• &nbsp; <b>Data Structures & Algorithms Certification</b> – Apna College", bullet_style))
story.append(Spacer(1, 3))

# Communities & Activities
add_section_header("COMMUNITIES & ACTIVITIES")
story.append(Paragraph("• &nbsp; Active participant in the Microsoft Azure learning ecosystem, including Azure documentation, Microsoft Learn modules, and cloud-based discussions.", bullet_style))
story.append(Paragraph("• &nbsp; Completed hands-on labs and learning paths on Azure Skill Builder (Microsoft Learn) to strengthen cloud fundamentals and services.", bullet_style))

doc.build(story)
print("Updated PDF with Button Links Generated successfully at public/resume.pdf")
