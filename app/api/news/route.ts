import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      console.error("Missing NEWS_API_KEY");
      return NextResponse.json({ news: [] });
    }

    // --- DATE RANGE (NewsAPI free plan = 30 days) ---
    const toDate = new Date();
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 30);

    const from = fromDate.toISOString().split("T")[0];
    const to = toDate.toISOString().split("T")[0];

    // --- QUERY (general, filtering is done later strictly) ---
    const query =
      '(IELTS OR OET OR PTE OR TOEFL OR "French language" OR "Japanese language" OR "Spanish language")';

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      query
    )}&language=en&from=${from}&to=${to}&sortBy=publishedAt&pageSize=100&apiKey=${apiKey}`;

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    if (data.status !== "ok") {
      console.error("NewsAPI Error:", data.message);
      return NextResponse.json({ news: [] });
    }

    const items = data.articles || [];

    // ======================================================
    // ❌ HARD BLOCK WORDS (PROMO / COACHING / TECH)
    // ======================================================
    const BLOCK_WORDS = [
      // coaching / sales
      "coaching",
      "academy",
      "institute",
      "classes",
      "batch",
      "course",
      "training",
      "consultancy",
      "agent",
      "agency",
      "admission",
      "apply now",
      "register",
      "enroll",
      "offer",
      "discount",
      "demo",
      "fee",

      // technical
      "software",
      "developer",
      "coding",
      "programming",
      "ai tool",
      "api",
      "framework",
    ];

    const seen = new Set<string>();

    const cleanNews = items
      .filter((item: any) => {
        if (!item?.title || !item?.url) return false;

        const title = item.title.toLowerCase();

        // 1️⃣ DATE FILTER
        if (item.publishedAt) {
          const d = new Date(item.publishedAt);
          if (d < fromDate) return false;
        }

        // 2️⃣ BLOCK PROMO / TECH WORDS
        const hasBlockedWord = BLOCK_WORDS.some((w) =>
          title.includes(w)
        );
        if (hasBlockedWord) return false;

        // 3️⃣ REMOVE DUPLICATES
        const key = title.replace(/[^a-z0-9]/g, "");
        if (seen.has(key)) return false;
        seen.add(key);

        return true;
      })
      .map((item: any) => {
        let description = item.description || "";

        // Clean NewsAPI truncation text
        if (item.content) {
          const cleanContent = item.content.replace(/\[\+\d+ chars\]/, "");
          if (cleanContent && !description.includes(cleanContent)) {
            description = `${description}\n\n${cleanContent}`.trim();
          }
        }

        if (description.length > 700) {
          description = description.substring(0, 700) + "...";
        }

        return {
          title: item.title,
          link: item.url,
          pubDate: item.publishedAt || new Date().toISOString(),
          source: item.source?.name || "Official Source",
          description: description || "Read the official update.",
          imageUrl: item.urlToImage || null,
        };
      })
      .slice(0, 25);

    console.log(`Returning ${cleanNews.length} OFFICIAL news items`);
    return NextResponse.json({ news: cleanNews });
  } catch (err) {
    console.error("OFFICIAL NEWS API ERROR:", err);
    return NextResponse.json({ news: [] }, { status: 500 });
  }
}
