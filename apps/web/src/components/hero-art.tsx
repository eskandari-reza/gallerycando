import { HERO_ART } from "@/lib/art-data";

export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 380"
      role="img"
      aria-label="قلعه‌ی رؤیایی gallerycando Lab"
      className={className}
      dangerouslySetInnerHTML={{ __html: HERO_ART }}
    />
  );
}
