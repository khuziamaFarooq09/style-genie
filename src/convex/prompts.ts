import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * List the signed-in user's saved briefs, newest first.
 * Usage: const briefs = useQuery(api.prompts.list);
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    const prompts = await ctx.db
      .query("prompts")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
    return prompts;
  },
});

/**
 * Save a generated brief to the signed-in user's library.
 * Usage: await savePrompt({ styleId, styleName, tagline, promptText });
 */
export const save = mutation({
  args: {
    styleId: v.string(),
    styleName: v.string(),
    tagline: v.string(),
    promptText: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("You must be signed in to save a brief.");

    const id = await ctx.db.insert("prompts", {
      userId,
      styleId: args.styleId,
      styleName: args.styleName,
      tagline: args.tagline,
      promptText: args.promptText,
      createdAt: Date.now(),
    });
    return id;
  },
});

/**
 * Delete one of the signed-in user's saved briefs.
 * Usage: await removePrompt({ id });
 */
export const remove = mutation({
  args: { id: v.id("prompts") },
  handler: async (ctx, { id }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new Error("You must be signed in.");

    const existing = await ctx.db.get(id);
    if (existing === null || existing.userId !== userId) {
      throw new Error("Brief not found.");
    }
    await ctx.db.delete(id);
  },
});
