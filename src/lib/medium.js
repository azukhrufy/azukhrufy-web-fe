import { DateTime } from "luxon";

const MEDIUM_FEED_URL = "https://medium.com/feed/@azukhrufy";

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(html, maxLength = 160) {
  const text = stripHtml(html);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getThumbnail(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function extractCData(block, tag) {
  const match = block.match(new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`));
  return match ? match[1].trim() : null;
}

function extractTag(block, tag) {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return match ? match[1].trim() : null;
}

/**
 * Fetches and parses the Medium RSS feed (no external XML dependency needed
 * since the feed's structure is stable) into a plain list of post summaries.
 * Returns an empty array on any failure so the section can render gracefully.
 */
export async function getMediumPosts(limit = 3) {
  try {
    const response = await fetch(MEDIUM_FEED_URL);
    if (!response.ok) return [];

    const xml = await response.text();
    const items = xml.split("<item>").slice(1).map((chunk) => chunk.split("</item>")[0]);

    return items.slice(0, limit).map((item) => {
      const content = extractCData(item, "content:encoded") || "";
      const pubDate = extractTag(item, "pubDate");
      const categories = [...item.matchAll(/<category>\s*<!\[CDATA\[(.*?)\]\]>\s*<\/category>/g)].map(
        (match) => match[1].trim(),
      );

      return {
        title: extractCData(item, "title") || "Untitled",
        link: extractTag(item, "link"),
        date: pubDate ? DateTime.fromRFC2822(pubDate).toFormat("LLL dd, yyyy") : null,
        excerpt: getExcerpt(content),
        thumbnail: getThumbnail(content),
        categories: categories.slice(0, 2),
      };
    });
  } catch (error) {
    console.error("Failed to fetch Medium posts:", error);
    return [];
  }
}
