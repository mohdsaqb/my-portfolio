export default function FloatingBlobs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/30 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-accent/25 blur-[120px] animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-blob [animation-delay:8s]" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    </div>
  );
}
