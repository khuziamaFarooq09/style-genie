import { useMutation } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookmarkPlus,
  Copy,
  Dices,
  Library,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import { copyText } from "@/lib/clipboard";
import {
  buildBrief,
  buildFullText,
  shuffle,
  STYLES,
  styleById,
  type StyleDef,
} from "@/lib/styles";

/* ------------------------------------------------------------------ */
/*  Shuffle-deck hook — deals from a shuffled deck, never repeats the  */
/*  current style, and reshuffles with variety when the deck is empty. */
/* ------------------------------------------------------------------ */
function useStyleDeck() {
  const [{ deck, current }, setState] = useState(() => {
    const d = shuffle(STYLES);
    return { deck: d.slice(1), current: d[0] };
  });

  const deal = useCallback(() => {
    setState((prev) => {
      let nextDeck = prev.deck;
      if (nextDeck.length === 0) {
        // Refill with a fresh shuffle, guaranteeing a different first pick.
        nextDeck = shuffle(STYLES.filter((s) => s.id !== prev.current.id));
      }
      const [next, ...rest] = nextDeck;
      return { deck: rest, current: next };
    });
  }, []);

  const choose = useCallback((id: string) => {
    const style = styleById(id);
    if (style) setState((prev) => ({ ...prev, current: style }));
  }, []);

  return { current, deal, choose };
}

const PARAGRAPH_LABELS = [
  "01 · Style, concept & atmosphere",
  "02 · Philosophy through emotion & UX",
  "03 · Abstract references & craft",
];

function scrollToId(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ------------------------------------------------------------------ */
/*  Nav                                                                 */
/* ------------------------------------------------------------------ */
function Nav() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-2xl tracking-tight">Forma</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            brief studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <button
            type="button"
            onClick={() => scrollToId("generate")}
            className="transition-colors hover:text-foreground"
          >
            Generator
          </button>
          <button
            type="button"
            onClick={() => scrollToId("styles")}
            className="transition-colors hover:text-foreground"
          >
            All 25 styles
          </button>
          <button
            type="button"
            onClick={() => scrollToId("how")}
            className="transition-colors hover:text-foreground"
          >
            How it works
          </button>
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer gap-2"
                onClick={() => navigate("/dashboard")}
              >
                <Library className="size-4" />
                <span className="hidden sm:inline">My library</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={handleSignOut}
                aria-label="Sign out"
                title={user?.name ?? "Sign out"}
              >
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="cursor-pointer" asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero + marquee                                                      */
/* ------------------------------------------------------------------ */
function Hero({ onDeal }: { onDeal: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(50% 60% at 50% 0%, var(--hero-glow), transparent), radial-gradient(40% 50% at 80% 10%, var(--hero-glow-warm), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 text-center sm:pt-32">
        <Badge
          variant="secondary"
          className="mb-6 gap-2 rounded-full px-3 py-1 text-xs font-medium"
        >
          <Sparkles className="size-3 text-accent-foreground" />
          25 design styles · dealt at random · one page
        </Badge>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
        >
          Every landing page deserves{" "}
          <em className="font-serif font-normal italic text-accent-foreground">
            a point of view
          </em>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
        >
          Forma deals a design style from a shuffled deck of 25 — no favorites,
          no repeats — and writes a three-paragraph brief: the mood, the motion,
          the references. Paste it into your AI and let it build the page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="cursor-pointer gap-2 rounded-full px-7 shadow-sm"
            onClick={onDeal}
          >
            <Dices className="size-4" />
            Deal a style
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="cursor-pointer gap-2 rounded-full px-7"
            onClick={() => scrollToId("styles")}
          >
            Browse all 25
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground/70"
        >
          Exactly three paragraphs · one cohesive single-page brief
        </motion.p>
      </div>
    </section>
  );
}

function StyleMarquee() {
  const items = useMemo(() => [...STYLES, ...STYLES], []);
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-background/60 py-3">
      <div className="flex w-max animate-marquee items-center gap-10">
        {items.map((s, i) => (
          <span
            key={`${s.id}-${i}`}
            className="flex shrink-0 items-center gap-2.5 text-sm text-muted-foreground"
          >
            <span className="size-2 rounded-full" style={{ backgroundColor: s.accent }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Generator                                                           */
/* ------------------------------------------------------------------ */
interface GeneratorProps {
  current: StyleDef;
  deal: () => void;
  choose: (id: string) => void;
}

function Generator({ current, deal, choose }: GeneratorProps) {
  const { isAuthenticated } = useAuth();
  const savePrompt = useMutation(api.prompts.save);
  const navigate = useNavigate();
  const [spin, setSpin] = useState(0);
  const [copied, setCopied] = useState(false);

  const paragraphs = useMemo(() => buildBrief(current), [current]);
  const fullText = useMemo(() => buildFullText(current), [current]);

  const handleDeal = () => {
    deal();
    setSpin((n) => n + 1);
  };

  const handleCopy = async () => {
    const ok = await copyText(fullText);
    if (ok) {
      setCopied(true);
      toast.success("Brief copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Could not copy — please select the text manually");
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.info("Sign in to keep briefs in your library");
      navigate("/auth?returnTo=/dashboard");
      return;
    }
    try {
      await savePrompt({
        styleId: current.id,
        styleName: current.name,
        tagline: current.tagline,
        promptText: fullText,
      });
      toast.success("Saved to your library");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Could not save the brief");
    }
  };

  return (
    <section id="generate" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
          The deal
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Your brief, dealt fresh
        </h2>
        <p className="mt-3 text-pretty leading-7 text-muted-foreground">
          One style, three paragraphs, zero bias. Deal again as many times as
          you like — the deck reshuffles with genuine variety, and the same
          style never comes twice in a row.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        {/* Style card + picker */}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
            <div className="relative h-28" style={{ background: current.swatch }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                  {STYLES.findIndex((s) => s.id === current.id) + 1} /{" "}
                  {STYLES.length}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold tracking-tight">{current.name}</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {current.tagline}
              </p>
            </div>
            <div className="flex flex-wrap gap-2 border-t px-5 py-4">
              <Button
                size="sm"
                className="cursor-pointer gap-2 rounded-full"
                onClick={handleDeal}
              >
                <Dices className="size-4" />
                Deal again
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer gap-2 rounded-full"
                onClick={handleCopy}
              >
                {copied ? (
                  <span className="text-emerald-600">Copied</span>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Copy brief
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="cursor-pointer gap-2 rounded-full"
                onClick={handleSave}
              >
                <BookmarkPlus className="size-4" />
                Save
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Or pick a style
            </p>
            <div className="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto pr-1">
              {STYLES.map((s) => {
                const active = s.id === current.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => choose(s.id)}
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-all ${
                      active
                        ? "border-accent-foreground bg-accent text-accent-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-accent-foreground/40 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: s.accent }}
                    />
                    {s.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* The brief document */}
        <div className="rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b px-5 py-4">
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: current.accent }}
              />
              <span className="text-sm font-medium">The brief</span>
            </div>
            <span className="text-xs text-muted-foreground">
              3 paragraphs · one page
            </span>
          </div>

          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.id}-${spin}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="space-y-6"
              >
                {paragraphs.map((p, i) => (
                  <div key={i}>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-foreground">
                      {PARAGRAPH_LABELS[i] ?? `0${i + 1}`}
                    </p>
                    <p className="text-[15px] leading-7 text-card-foreground/90">
                      {p}
                    </p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works                                                        */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    n: "01",
    title: "A style is dealt",
    body: "A shuffled deck of 25 design directions — Swiss, Japandi, Neobrutalist, Gradient Modern and more. The deck reshuffles with real variety, so no favorite ever sneaks in.",
  },
  {
    n: "02",
    title: "The brief writes itself",
    body: "Three paragraphs composed from the style's DNA: the mood and hierarchy, the emotional philosophy behind typography and motion, and the abstract references that give it depth.",
  },
  {
    n: "03",
    title: "Your AI builds the page",
    body: "Copy the brief, paste it into your favorite image or code model, and get a single cohesive one-page landing with a complete narrative arc. Save the winners to your library.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20 border-t border-border/70 bg-background/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From shuffle to shipped page
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-serif text-3xl text-accent-foreground/80">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Styles gallery                                                      */
/* ------------------------------------------------------------------ */
function StylesGallery({ onChoose }: { onChoose: (id: string) => void }) {
  return (
    <section id="styles" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground">
            The deck
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            All 25 styles
          </h2>
          <p className="mt-3 text-pretty leading-7 text-muted-foreground">
            Every one can be dealt randomly or picked deliberately. Click any
            card to write its brief.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STYLES.map((s, i) => (
          <motion.button
            key={s.id}
            type="button"
            onClick={() => {
              onChoose(s.id);
              scrollToId("generate");
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className="group cursor-pointer overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h-20" style={{ background: s.swatch }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                {s.tagline}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA + footer                                                        */
/* ------------------------------------------------------------------ */
function CtaBand() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center text-primary-foreground shadow-lg sm:px-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(60%_80%_at_50%_0%,black,transparent)]" />
        <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Keep the briefs you love.
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-pretty leading-7 text-primary-foreground/80">
          Sign in to save styles, revisit your favorites, and grow a library of
          landing page directions.
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {isAuthenticated ? (
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer rounded-full px-7"
              onClick={() => navigate("/dashboard")}
            >
              <Library className="size-4" />
              Open my library
            </Button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              className="cursor-pointer rounded-full px-7"
              onClick={() => navigate("/auth?returnTo=/dashboard")}
            >
              Sign in to save
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif text-xl tracking-tight">Forma</span>
          <span className="text-xs text-muted-foreground">
            brief studio · dealt at random
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          25 styles · 3 paragraphs · 1 cohesive page · 0 favorites
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */
export default function Landing() {
  const { current, deal, choose } = useStyleDeck();
  const handleHeroDeal = () => {
    deal();
    scrollToId("generate");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-background text-foreground"
    >
      <Nav />
      <main>
        <Hero onDeal={handleHeroDeal} />
        <StyleMarquee />
        <Generator current={current} deal={deal} choose={choose} />
        <HowItWorks />
        <StylesGallery onChoose={choose} />
        <CtaBand />
      </main>
      <Footer />
    </motion.div>
  );
}
