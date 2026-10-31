import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";
import { z } from "zod";
import { VOLUNTEER_OPENINGS, type VolunteerOpening } from "@/content/volunteer";

const FETCH_TIMEOUT_MS = 3000;

// The member platform owns this function. It is public, read-only, and returns open roles only.
const listOpenRoles = makeFunctionReference<"query", Record<string, never>, unknown>("volunteerRoles:listOpen");

const rolesSchema = z.array(
  z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    team: z.string(),
    availability: z.string(),
    location: z.string(),
  }),
);

/**
 * Open volunteer roles from the member platform's Convex deployment.
 * Without `CONVEX_URL`, or when the request fails, times out or returns an unexpected shape,
 * the roles in `src/content/volunteer.ts` are used so the page never breaks.
 * An empty list from Convex is authoritative: it means no role is open.
 */
export async function getVolunteerOpenings(): Promise<readonly VolunteerOpening[]> {
  const url = process.env.CONVEX_URL;
  if (!url) return VOLUNTEER_OPENINGS;

  try {
    const client = new ConvexHttpClient(url, {
      fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) }),
    });
    const parsed = rolesSchema.safeParse(await client.query(listOpenRoles, {}));
    if (parsed.success) return parsed.data;
    console.error("Volunteer roles response had an unexpected shape.");
  } catch (error) {
    console.error("Could not load volunteer roles from Convex.", error);
  }
  return VOLUNTEER_OPENINGS;
}
