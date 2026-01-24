import HomeContent from "@/components/HomeContent";
import { Contact } from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sparkle Knowledge Yard | IELTS, TOEFL, PTE Coaching in Chennai",
  description:
    "Sparkle Knowledge Yard is a leading study abroad consultancy and test preparation center in Perambur, Chennai.",
  alternates: {
    canonical: "https://sparkleknowledgeyard.com",
  },
};

export default function Home() {
  return (
    <>
      <HomeContent />
      
    </>
  );
}
