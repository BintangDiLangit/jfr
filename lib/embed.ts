/** Convert a pasted social URL into embeddable form. No API used. */

export function instagramEmbedUrl(url: string): string {
  // strip query, ensure /embed
  const clean = url.split("?")[0].replace(/\/+$/, "");
  return `${clean}/embed`;
}

/** Extract TikTok video id for the official blockquote embed. */
export function tiktokVideoId(url: string): string | null {
  const m = url.match(/\/video\/(\d+)/);
  return m ? m[1] : null;
}
