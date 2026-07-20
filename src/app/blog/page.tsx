import Link from "next/link";

const posts = [
  {
    title: "Golden hour in Santorini",
    blurb: "A slow evening spent chasing the sun across whitewashed cliffs and cobalt water.",
    href: "/blog/santorini",
  },
  {
    title: "Rain-drenched streets of Kyoto",
    blurb: "Lanterns, tea houses, and the hush of a city waking beneath a silver sky.",
    href: "/blog/kyoto",
  },
];

export default function BlogPage() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:px-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Travel journal</p>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Notes from the road, written in light and motion.</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.title} className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-white">{post.title}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">{post.blurb}</p>
            <Link href={post.href} className="mt-6 inline-flex text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
              Read story →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
