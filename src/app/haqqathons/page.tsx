import type { Metadata } from "next";
import { ComingSoonHub } from "@/components/coming-soon-hub";
import { getResourceHub } from "@/content/resource-hubs";
import { pageMetadata } from "@/lib/metadata";

const hub = getResourceHub("haqqathons")!;

export const metadata: Metadata = pageMetadata({
  title: hub.title,
  description: hub.summary,
  path: hub.path,
  socialDescription: "Haqqathons for Muslim students. Hub coming soon on IHSAAN.",
});

export default function HaqqathonsPage() {
  return <ComingSoonHub hub={hub} />;
}
