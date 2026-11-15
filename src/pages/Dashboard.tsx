import { useMutation, useQuery } from "convex/react";
import {
  ArrowLeft,
  BookmarkPlus,
  Copy,
  Dices,
  Loader2,
  LogOut,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { copyText } from "@/lib/clipboard";
import { styleById } from "@/lib/styles";

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const prompts = useQuery(api.prompts.list);
  const removePrompt = useMutation(api.prompts.remove);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleCopy = async (text: string) => {
    const ok = await copyText(text);
    if (ok) toast.success("Brief copied to clipboard");
    else toast.error("Could not copy — please select the text manually");
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await removePrompt({ id: id as never });
      toast.success("Brief removed");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Could not remove the brief");
    } finally {
      setDeletingId(null);
    }
  };

  const loading = prompts === undefined;
  const count = prompts?.length ?? 0;

  const header = useMemo(
    () => (
      <header className="flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            Forma · brief studio
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Your library
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {loading
              ? "Loading saved briefs…"
              : count === 1
                ? "1 saved brief"
                : `${count} saved briefs`}
            {user?.name ? ` · saved by ${user.name}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="size-4" />
            Generator
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, count, user?.name, navigate],
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-6 py-10">
        {header}

        {loading ? (
          <div className="flex flex-1 items-center justify-center py-24">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : count === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-24 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <BookmarkPlus className="size-6" />
            </div>
            <h2 className="mt-6 text-xl font-semibold tracking-tight">
              No briefs yet
            </h2>
            <p className="mt-2 max-w-sm text-pretty text-sm leading-6 text-muted-foreground">
              Deal a style on the generator, then hit Save to keep the brief
              here for later.
            </p>
            <Button
              className="mt-8 cursor-pointer gap-2 rounded-full px-6"
              onClick={() => navigate("/")}
            >
              <Dices className="size-4" />
              Deal a style
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {prompts.map((p) => {
              const style = styleById(p.styleId);
              return (
                <div
                  key={p._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3 px-5 pt-5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="size-3 rounded-full"
                        style={{
                          backgroundColor: style?.accent ?? "#94a3b8",
                        }}
                      />
                      <span className="font-semibold tracking-tight">
                        {p.styleName}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(p.createdAt)}
                    </span>
                  </div>
                  <p className="px-5 pt-1.5 text-xs italic text-muted-foreground">
                    {p.tagline}
                  </p>

                  <div className="px-5 py-4">
                    <p className="line-clamp-6 text-[13px] leading-6 text-card-foreground/80">
                      {p.promptText}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center gap-2 border-t px-5 py-3.5">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer gap-1.5 rounded-full"
                      onClick={() => handleCopy(p.promptText)}
                    >
                      <Copy className="size-3.5" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer gap-1.5 rounded-full text-destructive hover:text-destructive"
                      onClick={() => handleDelete(p._id)}
                      disabled={deletingId === p._id}
                    >
                      {deletingId === p._id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                      Remove
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
