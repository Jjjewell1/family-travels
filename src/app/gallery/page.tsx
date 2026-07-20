const photos = [
  {
    title: "Cliffside sunset",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Harbor palette",
    className: "",
  },
  {
    title: "Blue hour",
    className: "",
  },
  {
    title: "Coastal road",
    className: "md:col-span-2",
  },
];

export default function GalleryPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Photo gallery</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">A cinematic archive of the places we loved.</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.title} className={`group relative min-h-64 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/70 ${photo.className}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.2),_transparent_45%),linear-gradient(135deg,_rgba(255,255,255,0.08),_transparent_60%)]" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-6">
              <p className="text-lg font-medium text-white">{photo.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
