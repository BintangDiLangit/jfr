import { revalidatePath } from "next/cache";

// Called by the admin CRUD UI after any write so public (statically-rendered)
// pages pick up the change on the next visit instead of waiting for redeploy.
// ponytail: open endpoint — worst case is a forced cache rebuild (mild). Gate
// behind an auth check if abuse ever shows up.
export async function POST() {
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, now: Date.now() });
}
