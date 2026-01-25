import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const dynamic = "force-dynamic";

// Helper to unwrap Google News links (get real publisher URL)
function unwrapGoogleLink(link: string): string {
  if (!link) return "";
  try {
    const url = new URL(link);
    return url.searchParams.get("url") || link;
  } catch {
    return link;
  }
}

const parser = new Parser();

// Cache Google News
let cachedNews: any[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 0; // Cache disabled to force refresh

export async function GET() {
  const now = Date.now();
  if (cachedNews && (now - lastFetchTime) < CACHE_DURATION) {
    return NextResponse.json({ news: cachedNews });
  }

  try {
    // Google News RSS feeds for educational topics
    const topics = [
      "IELTS exam",
      "TOEFL exam", 
      "GRE exam",
      "GMAT exam",
      "study abroad",
    ];

    const allNews: any[] = [];
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 40); // Last 40 days

    // Fetch from Google News RSS for each topic
    for (const topic of topics) {
      try {
        const url = `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=en-US&gl=US&ceid=US:en`;
        const feed = await parser.parseURL(url);
        
        if (feed.items) {
          allNews.push(...feed.items);
        }
      } catch (err) {
        console.error(`Failed to fetch news for ${topic}:`, err);
      }
    }

    // ======================================================
    // ❌ BLOCK ACADEMY/COACHING PROMOTIONAL CONTENT
    // ======================================================
    const BLOCK_WORDS = [
      // Academy/Coaching promotions
      "coaching center",
      "coaching classes",
      "coaching institute",
      "academy classes",
      "join our",
      "enroll now",
      "apply now",
      "register now",
      "admission open",
      "limited seats",
      "book your seat",
      "free demo",
      "demo class",
      "discount",
      "offer",
      "batch starting",
      
      // Completely unrelated
      "cryptocurrency",
      "bitcoin",
      "gaming",
      "esports",
      "celebrity",
      "bollywood",
      "hollywood",
      "sports score",
      "cricket",
      "football match",
    ];

    const seen = new Set<string>();

    const cleanNews = allNews
      .filter((item: any) => {
        if (!item?.title || !item?.link) return false;

        const title = item.title.toLowerCase();
        const description = (item.contentSnippet || item.content || "").toLowerCase();
        const fullText = `${title} ${description}`;

        // 1️⃣ DATE FILTER (Last 40 days)
        if (item.pubDate || item.isoDate) {
          const pubDate = new Date(item.pubDate || item.isoDate);
          if (pubDate < cutoffDate) return false;
        }

        // 2️⃣ BLOCK ACADEMY/COACHING PROMOTIONS
        const hasBlockedWord = BLOCK_WORDS.some((word) =>
          fullText.includes(word)
        );
        if (hasBlockedWord) return false;

        // 3️⃣ REMOVE DUPLICATES
        const key = title.replace(/[^a-z0-9]/g, "");
        if (seen.has(key)) return false;
        seen.add(key);

        // 4️⃣ ENGLISH ONLY
        if (/[^\x00-\x7F]/.test(title) && !/[a-zA-Z]/.test(title)) return false;

        return true;
      })
      .map((item: any) => {
        // Extract source
        let source = "News Source";
        // Prefer item.source as string if parser gives it, or extract from url
        if (item.source?.trim()) {
           source = item.source;
        } else {
             try {
                const urlObj = new URL(item.link);
                const sourceParam = urlObj.searchParams.get("source");
                 if (sourceParam) source = sourceParam;
             } catch(e) {}
        }
        
        let description = item.contentSnippet || item.content || "";
        
        // 🧼 CLEANUP: Remove CBM tracking and params from description
        description = description.replace(/CBM[a-zA-Z0-9+/=._\-]+/g, "");
        description = description.replace(/oc=\d+/g, "");
        
        // If description looks like a URL or is empty after clean, clear it
        if (description.trim().startsWith("http") || description.includes("news.google.com")) {
            description = "";
        }

        // Length limit
        if (description.length > 400) {
          description = description.substring(0, 400) + "...";
        }

        // If description is just the title
        if (description.trim().toLowerCase() === item.title.trim().toLowerCase()) {
           description = "";
        }

        // ✅ GET REAL URL (unwrap Google redirect)
        const realUrl = unwrapGoogleLink(item.link);

        return {
          title: item.title,
          link: realUrl, // Return the real URL
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source,
          description: description.trim(),
          imageUrl: null,
        };
      })
      .sort((a, b) => {
        // Sort by date, newest first
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      })
      .slice(0, 20); // Limit to 20 most recent news items

    console.log(`✅ Returning ${cleanNews.length} educational news items from Google News`);
    
    // Update cache
    cachedNews = cleanNews;
    lastFetchTime = now;
    
    return NextResponse.json({ news: cleanNews });
  } catch (err) {
    console.error("GOOGLE NEWS RSS ERROR:", err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}
