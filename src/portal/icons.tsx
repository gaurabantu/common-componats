import React from "react";

/** Portal icon set — 24px grid, 1.75 stroke, currentColor (lucide-style, inline, no dependency). */
type IconProps = React.SVGProps<SVGSVGElement>;

const base = (children: React.ReactNode) =>
  function PortalIcon(props: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        focusable="false"
        {...props}
      >
        {children}
      </svg>
    );
  };

export const IconLayers = base(<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /><path d="m3 17.5 9 5 9-5" opacity={0.5} /></>);
export const IconPackage = base(<><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>);
export const IconPalette = base(<><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.3-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Z" /><circle cx="7.5" cy="10.5" r="1" /><circle cx="10.5" cy="7" r="1" /><circle cx="15" cy="7.5" r="1" /></>);
export const IconHook = base(<><path d="M18 4v6a6 6 0 0 1-12 0V9" /><path d="m3 12 3-3 3 3" /><circle cx="18" cy="4" r="1.5" /></>);
export const IconWind = base(<><path d="M3 8h11a3 3 0 1 0-3-3" /><path d="M3 12h16a3 3 0 1 1-3 3" /><path d="M3 16h7" /></>);
export const IconDownload = base(<><path d="M12 4v11" /><path d="m7 10 5 5 5-5" /><path d="M5 20h14" /></>);
export const IconFile = base(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6" /></>);
export const IconFileCode = base(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" /><path d="M14 3v6h6" /><path d="m10 13-2 2 2 2M14 13l2 2-2 2" /></>);
export const IconShield = base(<><path d="M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>);
export const IconAccessibility = base(<><circle cx="12" cy="4.5" r="1.5" /><path d="M5 8.5 12 10l7-1.5" /><path d="M12 10v4l-3 6.5M12 14l3 6.5" /></>);
export const IconDevices = base(<><rect x="2" y="4" width="14" height="11" rx="1.5" /><path d="M6 19h6" /><rect x="17" y="8" width="5" height="12" rx="1" /></>);
export const IconSparkle = base(<><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><path d="m6.3 6.3 2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" /></>);
export const IconRocket = base(<><path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.1 2.1 0 0 0-2.9-.1Z" /><path d="M12 15 9 12c1.5-4.5 5-8.5 11-9-.5 6-4.5 9.5-9 11Z" /><path d="M9 12H5l2-4h5M12 15v4l4-2v-5" /></>);
export const IconBook = base(<><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></>);
export const IconTerminal = base(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>);
export const IconType = base(<><path d="M4 7V5h16v2" /><path d="M12 5v14M9 19h6" /></>);
export const IconRuler = base(<><path d="M3 15 15 3l6 6L9 21l-6-6Z" /><path d="m7 11 2 2M10 8l2 2M13 5l2 2" /></>);
export const IconSquare = base(<><rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 20v-4a4 4 0 0 1 4-4h8" opacity={0.5} /></>);
export const IconMotion = base(<><path d="M3 12h4l3-7 4 14 3-7h4" /></>);
export const IconSwatch = base(<><rect x="3" y="3" width="8" height="18" rx="2" /><path d="M11 7.5 15 4l5 5-9 9" /><path d="M7 17h.01" /></>);
export const IconTable = base(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M3 15h18M9 4v16" /></>);
export const IconGrid = base(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconCheck = base(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const IconCheckCircle = base(<><circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.8 2.8L16 10" /></>);
export const IconArrowRight = base(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>);
export const IconExternal = base(<><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>);
export const IconForm = base(<><rect x="3" y="4" width="18" height="5" rx="1.5" /><rect x="3" y="12" width="18" height="5" rx="1.5" /><path d="M6 6.5h4M6 14.5h6" /></>);
export const IconCursor = base(<><path d="m4 4 7 17 2.5-7.5L21 11 4 4Z" /></>);
export const IconLayout = base(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></>);
export const IconBell = base(<><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>);
export const IconChart = base(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>);
export const IconPanel = base(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /></>);
export const IconLock = base(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
export const IconKeyboard = base(<><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></>);
export const IconEye = base(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const IconContrast = base(<><circle cx="12" cy="12" r="9" /><path d="M12 3v18a9 9 0 0 0 0-18Z" fill="currentColor" stroke="none" /></>);
export const IconFocus = base(<><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3" /><circle cx="12" cy="12" r="3" /></>);
export const IconTouch = base(<><path d="M9 11V5a2 2 0 1 1 4 0v5" /><path d="M13 10a2 2 0 1 1 4 0v1a2 2 0 1 1 4 0v3a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L5 15.5a2 2 0 0 1 3-2.6l1 1" /></>);
export const IconClock = base(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const IconTag = base(<><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="7.5" cy="7.5" r="1.5" /></>);
export const IconGit = base(<><circle cx="6" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="9" r="2" /><path d="M6 8v8M18 11c0 4-6 3-12 5" /></>);
export const IconUsers = base(<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" /></>);
export const IconCopy = base(<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" /></>);
export const IconSearch = base(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>);
export const IconMoon = base(<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />);
export const IconScale = base(<><path d="M12 3v18M7 21h10M5 7h14" /><path d="m5 7-3 7a3 3 0 0 0 6 0L5 7ZM19 7l-3 7a3 3 0 0 0 6 0l-3-7Z" /></>);
