import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  variant?: 'Linear' | 'Bold' | 'Bulk';
  color?: string;
  className?: string;
}

// Helper to render icon wrappers
export function IconWrapper({
  children,
  size = 20,
  color = 'currentColor',
  className = '',
  viewBox = '0 0 24 24',
  ...props
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={color}
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 ${className}`}
      {...props}
    >
      {children}
    </svg>
  );
}

// 1. Home2 (Beranda)
export function Home2({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  if (variant === 'Bold') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <path d="M2 12.31V19C2 20.66 3.34 22 5 22H19C20.66 22 22 20.66 22 19V12.31C22 11.23 21.47 10.22 20.59 9.61L13.59 4.77C12.63 4.11 11.37 4.11 10.42 4.77L3.41 9.61C2.53 10.22 2 11.23 2 12.31Z" fill={color} stroke="none" />
        <path d="M9.5 22V16C9.5 14.62 10.62 13.5 12 13.5C13.38 13.5 14.5 14.62 14.5 16V22H9.5Z" fill="#F7F5FF" stroke="none" />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.02 2.84 3.63 7.04c-1.03.8-1.63 2.05-1.63 3.37v8.59c0 1.66 1.34 3 3 3h14c1.66 0 3-1.34 3-3v-8.59c0-1.32-.6-2.57-1.63-3.37L14.98 2.84c-1.74-1.36-4.22-1.36-5.96 0Z" />
      <path d="M12 17.5v-4" />
    </IconWrapper>
  );
}

// 2. SearchNormal1 (Cari)
export function SearchNormal1({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={variant === 'Bold' ? 2.5 : 1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11.5" cy="11.5" r="8" />
      <path d="m20 20-3.5-3.5" />
    </IconWrapper>
  );
}

// 3. ReceiptText (Pesanan)
export function ReceiptText({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  if (variant === 'Bold') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <path d="M19 2H5C3.34 2 2 3.34 2 5V21C2 21.6 2.65 21.96 3.12 21.61L5.5 19.82L7.88 21.61C8.24 21.88 8.76 21.88 9.12 21.61L11.5 19.82L13.88 21.61C14.24 21.88 14.76 21.88 15.12 21.61L17.5 19.82L19.88 21.61C20.35 21.96 21 21.6 21 21V5C21 3.34 19.66 2 19 2ZM8 8H16C16.41 8 16.75 8.34 16.75 8.75C16.75 9.16 16.41 9.5 16 9.5H8C7.59 9.5 7.25 9.16 7.25 8.75C7.25 8.34 7.59 8 8 8ZM14 13H8C7.59 13 7.25 12.66 7.25 12.25C7.25 11.84 7.59 11.5 8 11.5H14C14.41 11.5 14.75 11.84 14.75 12.25C14.75 12.66 14.41 13 14 13Z" fill={color} stroke="none" />
      </IconWrapper>
    );
  }
  if (variant === 'Bulk') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <rect x="3" y="2" width="18" height="20" rx="3" fill="#EFEBFF" stroke="none" />
        <path d="M8 7h8M8 11h8M8 15h5" stroke={color} strokeWidth={2} strokeLinecap="round" />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 2v18l3-1.5 3 1.5 3-1.5 3 1.5 4-2V2H4Z" />
      <path d="M8 7h8M8 11h8M8 15h4" />
    </IconWrapper>
  );
}

// 4. ProfileCircle (Akun / Profil)
export function ProfileCircle({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  if (variant === 'Bold') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <circle cx="12" cy="12" r="10" fill={color} stroke="none" />
        <circle cx="12" cy="8.5" r="3.2" fill="#F7F5FF" stroke="none" />
        <path d="M6 18.5C6.5 15.8 8.8 14 12 14C15.2 14 17.5 15.8 18 18.5" stroke="#F7F5FF" strokeWidth={2} strokeLinecap="round" />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="9" r="3" />
      <path d="M6.168 18.849a6.002 6.002 0 0 1 11.664 0" />
    </IconWrapper>
  );
}

// 5. ShieldTick (Aman / Rekber)
export function ShieldTick({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  if (variant === 'Bulk') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" fill="#EFEBFF" stroke="none" />
        <path d="m9 12 2 2 4-4" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
      <path d="m9 12 2 2 4-4" />
    </IconWrapper>
  );
}

// 6. Verify (Terverifikasi)
export function Verify({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} {...props}>
      <path
        d="m10.29 2.3 1.06-1.06a.996.996 0 0 1 1.41 0l1.06 1.06c.38.38.98.54 1.5.4l1.45-.37a.997.997 0 0 1 1.22.71l.37 1.45c.14.53.59.92 1.13.98l1.49.19a.994.994 0 0 1 .86 1.12l-.19 1.49c-.06.54.19 1.08.64 1.39l1.24.87c.43.3.56.88.3 1.33l-.87 1.24c-.31.45-.31 1.05 0 1.5l.87 1.24c.26.45.13 1.03-.3 1.33l-1.24.87c-.45.31-.7.85-.64 1.39l.19 1.49c.07.54-.32 1.05-.86 1.12l-1.49.19c-.54.06-.99.45-1.13.98l-.37 1.45c-.14.54-.7.85-1.22.71l-1.45-.37c-.52-.14-1.12.02-1.5.4l-1.06 1.06a.996.996 0 0 1-1.41 0l-1.06-1.06c-.38-.38-.98-.54-1.5-.4l-1.45.37c-.52.14-1.08-.17-1.22-.71l-.37-1.45c-.14-.53-.59-.92-1.13-.98l-1.49-.19a.994.994 0 0 1-.86-1.12l.19-1.49c.06-.54-.19-1.08-.64-1.39l-1.24-.87a.996.996 0 0 1-.3-1.33l.87-1.24c.31-.45.31-1.05 0-1.5l-.87-1.24a.996.996 0 0 1 .3-1.33l1.24-.87c.45-.31.7-.85.64-1.39l-.19-1.49c-.07-.54.32-1.05.86-1.12l1.49-.19c.54-.06.99-.45 1.13-.98l.37-1.45c.14-.54.7-.85 1.22-.71l1.45.37c.52.14 1.12-.02 1.5-.4Z"
        fill={variant === 'Bold' ? color : 'none'}
        stroke={color}
        strokeWidth={1.5}
      />
      <path d="m8.5 12 2.5 2.5 5-5" stroke={variant === 'Bold' ? '#FFF' : color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </IconWrapper>
  );
}

// 7. Crown1 (Plus)
export function Crown1({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m2 8 4 12h12l4-12-6 4-4-6-4 6-6-4z" fill={variant === 'Bold' ? color : 'none'} />
      <circle cx="12" cy="4" r="1" fill={color} />
      <circle cx="2" cy="8" r="1" fill={color} />
      <circle cx="22" cy="8" r="1" fill={color} />
    </IconWrapper>
  );
}

// 8. Location & Map
export function Location({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z" fill={variant === 'Bold' ? color : 'none'} />
      <circle cx="12" cy="9" r="2.5" fill={variant === 'Bold' ? '#FFF' : 'none'} />
    </IconWrapper>
  );
}

// 9. Clock & Calendar
export function Calendar1({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconWrapper>
  );
}

export function Clock({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </IconWrapper>
  );
}

// 10. ArrowLeft2, ArrowRight, ArrowDown2
export function ArrowLeft2({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15 19-7-7 7-7" />
    </IconWrapper>
  );
}

export function ArrowRight({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </IconWrapper>
  );
}

export function ArrowDown2({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconWrapper>
  );
}

// 11. TickCircle & CloseCircle
export function TickCircle({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  if (variant === 'Bold') {
    return (
      <IconWrapper size={size} color={color} className={className} {...props}>
        <circle cx="12" cy="12" r="10" fill={color} stroke="none" />
        <path d="m8.5 12 2.5 2.5 5-5" stroke="#FFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </IconWrapper>
    );
  }
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </IconWrapper>
  );
}

export function CloseCircle({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6M9 9l6 6" />
    </IconWrapper>
  );
}

// 12. Warning2 & InfoCircle
export function Warning2({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 2 10 18H2L12 2z" />
      <path d="M12 9v4M12 17h.01" />
    </IconWrapper>
  );
}

export function InfoCircle({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </IconWrapper>
  );
}

// 13. Camera & Gallery
export function Camera({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </IconWrapper>
  );
}

// 14. Whatsapp
export function Whatsapp({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} viewBox="0 0 24 24" fill={color} stroke="none" {...props}>
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.78 14.12c-.24.68-1.39 1.3-1.93 1.38-.49.07-1.12.1-3.23-.77-2.69-1.12-4.44-3.84-4.57-4.02-.13-.18-1.09-1.45-1.09-2.77 0-1.32.69-1.97.94-2.23.24-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.57.82 2 .89 2.15.07.15.12.33.02.53-.09.2-.14.33-.29.5-.15.18-.31.4-.44.53-.15.15-.3.32-.13.62.17.3 1.05 1.73 2.27 2.82 1.57 1.4 2.89 1.83 3.3 2 .41.17.65.15.89-.13.24-.28 1.03-1.2 1.3-1.62.27-.41.54-.35.91-.21.36.14 2.32 1.09 2.71 1.29.39.2.65.3.75.47.1.17.1.98-.14 1.66z" />
    </IconWrapper>
  );
}

// 15. Sms & Lock
export function Sms({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </IconWrapper>
  );
}

export function Lock({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconWrapper>
  );
}

export function Eye({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </IconWrapper>
  );
}

export function EyeSlash({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m2 2 20 20M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    </IconWrapper>
  );
}

// 16. Category Icons
export function Drop({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill={variant === 'Bulk' ? '#EFEBFF' : 'none'} stroke={color} />
    </IconWrapper>
  );
}

export function Brush2({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m14 17 6-6-3-3-6 6" />
      <path d="M10 21H3v-7l7-7 7 7-7 7z" fill={variant === 'Bulk' ? '#EFEBFF' : 'none'} />
    </IconWrapper>
  );
}

export function Ruler({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m21.7 8.3-5-5a2.4 2.4 0 0 0-3.4 0l-11 11a2.4 2.4 0 0 0 0 3.4l5 5a2.4 2.4 0 0 0 3.4 0l11-11a2.4 2.4 0 0 0 0-3.4zM7.5 10.5l2 2M11.5 6.5l2 2M15.5 2.5l2 2M3.5 14.5l2 2" />
    </IconWrapper>
  );
}

export function Wind({ size = 20, color = 'currentColor', variant = 'Linear', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2M19.4 12.3a2.5 2.5 0 1 1 1.8 4.3H2M15 17.5a2.5 2.5 0 1 1 1.8 4.3H2" />
    </IconWrapper>
  );
}

// 17. Misc helpers: Filter, Sort, Copy, Trash, Edit2, LogoutCurve, Sun, Sun1, CloudSunny
export function Filter({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </IconWrapper>
  );
}

export function Sort({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 16 4 4 4-4M7 20V4M21 8l-4-4-4 4M17 4v16" />
    </IconWrapper>
  );
}

export function Copy({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </IconWrapper>
  );
}

export function LogoutCurve({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </IconWrapper>
  );
}

export function Sun({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </IconWrapper>
  );
}

export function Sun1(props: IconProps) {
  return <Sun {...props} />;
}

export function CloudSunny({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2v2M4.93 4.93l1.41 1.41M2 12h2M20 10a4 4 0 0 0-4-4 4 4 0 0 0-3.8 2.7" />
      <path d="M17.5 19H9a5 5 0 0 1 0-10c.2 0 .5 0 .7.1A6 6 0 0 1 21 14.5a4.5 4.5 0 0 1-3.5 4.5Z" />
    </IconWrapper>
  );
}

export function User({ size = 20, color = 'currentColor', className, ...props }: IconProps) {
  return (
    <IconWrapper size={size} color={color} className={className} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconWrapper>
  );
}
