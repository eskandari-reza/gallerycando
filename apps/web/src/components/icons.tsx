import { ICONS, categoryIconName } from "@/lib/icon-data";
import type { IconName } from "@/lib/icon-data";

// The markup comes from our own static icon file, never from user input.
export function Icon({
  name,
  size = 32,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
    />
  );
}

export function CategoryIcon({
  number,
  size = 40,
  className,
}: {
  number: number;
  size?: number;
  className?: string;
}) {
  return <Icon name={categoryIconName(number)} size={size} className={className} />;
}
