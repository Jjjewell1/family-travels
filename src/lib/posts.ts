import { getAlbumAssets } from "./immich";

export type BlogPost = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  excerpt: string;
  content: string[];
};

const blogPosts: BlogPost[] = [
  {
    slug: "santorini",
    title: "Golden hour in Santorini",
    blurb: "A slow evening spent chasing the sun across whitewashed cliffs and cobalt water.",
    excerpt: "A slow evening spent chasing the sun across whitewashed cliffs and cobalt water.",
    image: "",
    content: [
      "The island held the last light like a secret. Every white wall glowed amber, and the sea beneath it turned from blue to silver as the sun slipped lower.",
      "We followed the winding path above the caldera until the breeze carried the scent of salt and citrus. Each turn felt cinematic, and the evening unfolded in patient, luminous frames.",
    ],
  },
  {
    slug: "kyoto",
    title: "Rain-drenched streets of Kyoto",
    blurb: "Lanterns, tea houses, and the hush of a city waking beneath a silver sky.",
    excerpt: "Lanterns, tea houses, and the hush of a city waking beneath a silver sky.",
    image: "",
    content: [
      "Kyoto arrived in layers: first the rain, then the glow, then the stillness. Streets shimmered under umbrellas and temple roofs while soft light gathered in the alleys.",
      "The city felt intimate in the hush between showers, where every doorway seemed to hold a story waiting to be discovered.",
    ],
  },
];

export async function getAllPosts() {
  const albumId = process.env.IMMICH_BLOG_ALBUM_ID || process.env.NEXT_PUBLIC_IMMICH_ALBUM_ID || "family-travels";
  const assets = await getAlbumAssets(albumId);

  return blogPosts.map((post, index) => ({
    ...post,
    image: assets[index]?.id || post.image,
  }));
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugList() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
