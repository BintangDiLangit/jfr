import { Section, SectionHeading } from "@/components/common";
import { instagramEmbedUrl, tiktokVideoId } from "@/lib/embed";
import type { SocialPost, WithId } from "@/lib/schemas";

export function InstagramFeed({ posts }: { posts: WithId<SocialPost>[] }) {
  if (!posts.length) return null;
  return (
    <Section id="instagram" className="bg-surface/30">
      <SectionHeading eyebrow="Instagram" title="Ikuti Update Terbaru" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <iframe
            key={p.id}
            src={instagramEmbedUrl(p.url)}
            title="Instagram post"
            loading="lazy"
            className="h-[480px] w-full rounded-2xl border border-border bg-white"
          />
        ))}
      </div>
    </Section>
  );
}

export function TikTokFeed({ posts }: { posts: WithId<SocialPost>[] }) {
  const valid = posts.map((p) => ({ id: p.id, vid: tiktokVideoId(p.url) })).filter((p) => p.vid);
  if (!valid.length) return null;
  return (
    <Section id="tiktok">
      <SectionHeading eyebrow="TikTok" title="Lihat Aksi Kami" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {valid.map((p) => (
          <iframe
            key={p.id}
            src={`https://www.tiktok.com/embed/v2/${p.vid}`}
            title="TikTok video"
            loading="lazy"
            allow="encrypted-media"
            className="mx-auto h-[680px] w-full max-w-[340px] rounded-2xl border border-border"
          />
        ))}
      </div>
    </Section>
  );
}
