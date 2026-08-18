"use client";

import React from "react";

interface BrandIconProps {
  name: string;
  className?: string;
}

export function BrandIcon({ name, className = "w-4 h-4" }: BrandIconProps) {
  const lower = name.toLowerCase();

  // 🔷 Azure Official Logo SVG
  if (lower.includes("azure") || lower.includes("entra") || lower.includes("vnet")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.05 2.25L4.5 16.5L1.5 21.75H8.25L13.05 2.25Z" fill="#0078D4" />
        <path d="M13.05 2.25H19.5L12 21.75H5.25L13.05 2.25Z" fill="#50E6FF" />
        <path d="M11.7 13.5H22.5L17.25 21.75H6.45L11.7 13.5Z" fill="#0078D4" />
      </svg>
    );
  }

  // 🟧 AWS Official Logo SVG
  if (lower.includes("aws") || lower.includes("amazon")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.75 14.25C6.75 13.2 7.5 12.45 8.7 12.45C9.45 12.45 10.05 12.75 10.5 13.2V11.1C10.05 10.65 9.15 10.35 8.1 10.35C5.7 10.35 4.35 12 4.35 14.25C4.35 16.5 5.85 18.15 8.1 18.15C9.3 18.15 10.2 17.7 10.65 17.25V15.15C10.05 15.6 9.45 16.05 8.55 16.05C7.5 16.05 6.75 15.3 6.75 14.25Z" fill="#FF9900" />
        <path d="M18.75 18L13.5 6H11.25L6 18H8.4L9.45 15.45H15.3L16.35 18H18.75ZM10.35 13.2L12.375 8.1L14.4 13.2H10.35Z" fill="#FF9900" />
        <path d="M2.25 19.5C6 21.75 11.25 22.5 15.75 21C18.45 20.1 20.85 18.45 22.5 16.5C22.65 16.35 22.5 16.05 22.2 16.2C20.4 17.4 18.15 18.3 15.75 18.6C11.55 19.2 6.75 18.6 3 16.65C2.55 16.35 2.1 16.8 2.55 17.1C2.45 17.1 2.25 19.5 2.25 19.5Z" fill="#FF9900" />
      </svg>
    );
  }

  // 💜 Terraform Official Logo SVG
  if (lower.includes("terraform") || lower.includes("hcl") || lower.includes("iac")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 3L8.5 7V15L1.5 11V3Z" fill="#844FBA" />
        <path d="M9.5 7.5L16.5 11.5V19.5L9.5 15.5V7.5Z" fill="#844FBA" />
        <path d="M9.5 16.5L16.5 20.5V23.5L9.5 19.5V16.5Z" fill="#844FBA" opacity="0.8" />
        <path d="M17.5 12L22.5 9V17L17.5 20V12Z" fill="#844FBA" />
        <path d="M17.5 3.5L22.5 0.5V8.5L17.5 11.5V3.5Z" fill="#844FBA" />
      </svg>
    );
  }

  // ☸️ Kubernetes Official Logo SVG
  if (lower.includes("kubernetes") || lower.includes("k8s") || lower.includes("aks") || lower.includes("eks")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2Z" fill="#326CE5" />
        <path d="M12 5.5L6 9V15L12 18.5L18 15V9L12 5.5Z" fill="white" opacity="0.3" />
        <circle cx="12" cy="12" r="3.5" fill="white" />
      </svg>
    );
  }

  // 🟧 Prometheus Official Logo SVG
  if (lower.includes("prometheus")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C8 6 6 9 6 13C6 16.5 8.5 19.5 12 20.5C15.5 19.5 18 16.5 18 13C18 9 16 6 12 2Z" fill="#E6522C" />
        <path d="M12 7C10 9.5 9 11.5 9 14C9 16 10.5 17.5 12 18.5C13.5 17.5 15 16 15 14C15 11.5 14 9.5 12 7Z" fill="#FFAE1A" />
      </svg>
    );
  }

  // 📊 Grafana Official Logo SVG
  if (lower.includes("grafana")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#F46800" />
        <circle cx="12" cy="12" r="6" fill="#FFF" opacity="0.8" />
        <path d="M12 8L15 14H9L12 8Z" fill="#F46800" />
      </svg>
    );
  }

  // 🐋 Docker Official Logo SVG
  if (lower.includes("docker") || lower.includes("container")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.9 11.2h2v1.9h-2v-1.9zm-3 0h2v1.9h-2v-1.9zm-3 0h2v1.9h-2v-1.9zm-3 0h2v1.9h-2v-1.9zm9-2.9h2v1.9h-2V8.3zm-3 0h2v1.9h-2V8.3zm-3 0h2v1.9h-2V8.3zm3-2.9h2v1.9h-2V5.4z" fill="#2496ED"/>
        <path d="M22.5 12.3c-.6-.4-1.9-.5-2.9-.2-.3-.6-.8-1.2-1.5-1.6l-.4-.2-.2.4c-.4.9-.3 2.1.2 2.9-.4.3-1 .5-1.7.6-3.8.3-7.5.3-11.3 0-1.1 0-2.1-.3-3.1-.7l-.5-.2-.2.5c-.3 1.1.2 2.4.9 3.2 1.4 1.7 3.6 2.6 5.8 2.6 6.3 0 11.2-3.3 12.9-7.3z" fill="#2496ED"/>
      </svg>
    );
  }

  // 🛡️ OPA / Policy Agent Official SVG
  if (lower.includes("opa") || lower.includes("policy") || lower.includes("sec")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2Z" fill="#00B4D8" />
        <path d="M12 4.5L18 7.25V11C18 15.35 15.45 19.4 12 20.45V4.5Z" fill="#90E0EF" opacity="0.6" />
      </svg>
    );
  }

  // 📜 Python Official SVG
  if (lower.includes("python") || lower.includes("scripting") || lower.includes("automation")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 2c-5.2 0-4.9 2.3-4.9 2.3v2.3h5v.7H4.9s-2.3-.3-2.3 4.9c0 5.2 2 5 2 5h1.2v-1.7c0-2 1.7-3.7 3.7-3.7h5s2.2.1 2.2-2.1V4.2c.1-2.2-2.1-2.2-4.8-2.2zM9.4 3.6a.8.8 0 110 1.6.8.8 0 010-1.6z" fill="#3776AB"/>
        <path d="M12.1 22c5.2 0 4.9-2.3 4.9-2.3v-2.3h-5v-.7h7.1s2.3.3 2.3-4.9c0-5.2-2-5-2-5h-1.2v1.7c0 2-1.7 3.7-3.7 3.7h-5s-2.2-.1-2.2 2.1v4.8c-.1 2.2 2.1 2.2 4.8 2.2zm2.5-1.6a.8.8 0 110-1.6.8.8 0 010 1.6z" fill="#FFD43B"/>
      </svg>
    );
  }

  // 🐙 ArgoCD Official SVG
  if (lower.includes("argo") || lower.includes("cicd") || lower.includes("gitops")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" fill="#EF7B45" />
        <circle cx="12" cy="12" r="5" fill="#FFF" opacity="0.9" />
        <circle cx="12" cy="12" r="2.5" fill="#EF7B45" />
      </svg>
    );
  }

  // Default Fallback
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0284C7" />
      <path d="M2 17L12 22L22 17" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
