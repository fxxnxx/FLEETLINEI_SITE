import heroBackgroundHtml from "@/assets/back/index2.html?raw";

export function HeroBackground() {
  return (
    <iframe
      title="Hero background animation"
      srcDoc={heroBackgroundHtml}
      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
