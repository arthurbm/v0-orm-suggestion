export const NeonLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.1"/>
    <path d="M12 4L4 12L12 20L20 12L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
  </svg>
)

export const SupabaseLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.1"/>
    <path d="M7 17L12 7L17 17H7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

export const PlanetScaleLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="currentColor" fillOpacity="0.1"/>
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
    <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="2"/>
    <path d="M4 12C4 14 7.5 16 12 16C16.5 16 20 14 20 12" stroke="currentColor" strokeWidth="2"/>
  </svg>
)