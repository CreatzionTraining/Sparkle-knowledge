import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const dynamic = "force-dynamic";

const parser = new Parser();

export async function GET() {
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
        // Extract source from Google News link
        let source = "News Source";
        try {
          const urlObj = new URL(item.link);
          const sourceParam = urlObj.searchParams.get("source");
          if (sourceParam) {
            source = sourceParam;
          } else {
            // Try to extract from link
            const match = item.link.match(/\/articles\/([^\/]+)/);
            if (match) {
              source = match[1].split('-').slice(0, 2).join(' ');
            }
          }
        } catch (e) {
          // Keep default source
        }

        let description = item.contentSnippet || item.content || "";
        
        // Clean up description
        if (description.length > 400) {
          description = description.substring(0, 400) + "...";
        }

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
          source: source,
          description: description || "Read more about this educational update.",
          imageUrl: null, // Google News RSS doesn't provide images
        };
      })
      .sort((a, b) => {
        // Sort by date, newest first
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      })
      .slice(0, 20); // Limit to 20 most recent news items

    console.log(`✅ Returning ${cleanNews.length} educational news items from Google News`);
    return NextResponse.json({ news: cleanNews });
  } catch (err) {
    console.error("GOOGLE NEWS RSS ERROR:", err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}
