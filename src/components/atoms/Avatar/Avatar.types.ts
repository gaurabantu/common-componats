export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  initials?: string;
  icon?: string | React.ReactNode;
  fallback?: React.ReactNode;
  size?: number;
  shape?: "circle" | "rounded" | "square";
  rounded?: "0" | "1" | "2" | "3" | "4" | "5";
  status?: "online" | "offline" | "busy" | "away" | "none";
  statusColor?: string;
  statusPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  color?: string;
  backgroundColor?: string;
  textColor?: string;
  iconColor?: string;
  iconSize?: number;
  preserveColors?: boolean;
  bordered?: boolean;
  borderColor?: string;
  className?: string;
  style?: React.CSSProperties;
}