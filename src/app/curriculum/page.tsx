import React from "react";
import { Metadata } from "next";
import { CurriculumExplorer } from "@/components/curriculum/CurriculumExplorer";

export const metadata: Metadata = {
  title: "Biblical Ministry Curriculum",
  description:
    "Explore the 7 prescribed modules covering Bible introduction, world religions, Christian ethics, counselling, doctrines, and Old & New Testament theology.",
  alternates: { canonical: "/curriculum" },
};

export default function CurriculumPage() {
  return <CurriculumExplorer />;
}
