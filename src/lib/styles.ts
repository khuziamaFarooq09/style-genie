// Forma — style definitions and the three-paragraph brief builder.
// Each style carries the emotional/abstract fields needed to compose a brief
// that is EXACTLY three paragraphs:
//   P1: the chosen style + a concept ask + mood/hierarchy/color notes
//   P2: design philosophy through emotion + UX, typography, motion, journey arc
//   P3: abstract references + premium craft influences + how they shape the page

export interface StyleDef {
  id: string;
  name: string;
  tagline: string;
  swatch: string; // CSS gradient used for thumbnails
  accent: string; // accent hex used for UI dots
  // Paragraph 1 — atmosphere & hierarchy
  mood: string; // what visitors should feel on arrival
  flow: string; // how the visual hierarchy and scroll should feel
  conceptHint: string; // seed for the business/service concept the AI should conceive
  // Paragraph 2 — philosophy through emotion & UX
  typefeel: string; // how typography should feel
  motion: string; // what sensation interactions/animations should create
  arc: string; // emotional progression from first impression to final CTA
  // Paragraph 3 — abstract references
  refs: string; // spaces, cultural movements, artistic periods, architecture
  craft: string; // premium experiences / refined craftsmanship to draw on
  essence: string; // how references shape the emotional sophistication of the final page
}

export const STYLES: StyleDef[] = [
  {
    id: "neobrutalist",
    name: "Neobrutalist",
    tagline: "raw, bold, confrontational with structured impact",
    swatch: "linear-gradient(135deg,#ff5d2e 0%,#1a1a1a 70%)",
    accent: "#ff5d2e",
    mood:
      "energy and irreverence — a page that isn't asking for permission, it's stating a fact",
    flow:
      "heavy borders, hard shadows, and oversized type slam each section home like a series of bold printed statements",
    conceptHint:
      "a blunt, no-nonsense product or service with attitude to burn",
    typefeel:
      "monumental, unapologetic display type that shouts in confident lowercase and means every word",
    motion:
      "sharp and decisive — snappy clicks, instant state changes, no easing, no hesitation",
    arc: "open with a confrontational claim, escalate through blunt proof, and end on a call-to-action that dares the visitor to click",
    refs: "brutalist architecture, punk zines, protest posters, and the honesty of raw concrete",
    craft:
      "hand-set print, chunky textures, and materials that feel real enough to touch",
    essence:
      "raw materials and confident collisions — a page with the composure of a well-thrown punch",
  },
  {
    id: "swiss",
    name: "Swiss / International",
    tagline: "grid-based, systematic, ultra-clean typography",
    swatch: "linear-gradient(135deg,#e63946 0%,#111111 75%)",
    accent: "#e63946",
    mood:
      "calm authority — the quiet confidence of a perfectly aligned system",
    flow:
      "a strict modular grid gives every element a reason to exist, so scrolling feels like reading a masterfully typeset journal",
    conceptHint: "a precise, systematic service that thrives on clarity",
    typefeel:
      "heroic sans-serif with razor-sharp hierarchy — objective, rational, quietly powerful",
    motion:
      "precise and effortless — minimal, exact transitions that never get in the way of the message",
    arc: "begin with a clear thesis, progress through systematic evidence, and resolve in a call-to-action that feels like a logical conclusion",
    refs: "mid-century editorial layouts, international signage, and the precision of a well-run city",
    craft:
      "obsessive alignment, generous white space, and the discipline of restraint",
    essence:
      "measured confidence — where every line is a decision and every gap is deliberate",
  },
  {
    id: "editorial",
    name: "Editorial",
    tagline: "magazine-inspired, sophisticated typography, article-focused",
    swatch: "linear-gradient(135deg,#8b5a2b 0%,#f4ead8 75%)",
    accent: "#8b5a2b",
    mood:
      "the pleasure of a beautifully printed page — visitors slow down and want to read",
    flow:
      "oversized headlines, pull quotes, and generous line lengths turn the scroll into a story with chapters",
    conceptHint: "a publication, studio, or cultural venture with a strong voice",
    typefeel:
      "a serif-led voice with italic flourishes — cultured, narrative, and unhurried",
    motion:
      "smooth and editorial — reveals that feel like page turns and imagery that scrolls like a photo essay",
    arc: "open with a cover-worthy headline, build through stories and evidence, and close with a call-to-action phrased like a final column",
    refs: "golden-age magazine spreads, broadsheet photography, and the intimacy of a well-bound book",
    craft:
      "art direction, kerning so fine you can feel it, and the weight of good paper",
    essence:
      "intellectual warmth — a page that respects the visitor's attention enough to earn it",
  },
  {
    id: "glassmorphism",
    name: "Glassmorphism",
    tagline: "translucent layers, blurred backgrounds, depth",
    swatch: "linear-gradient(135deg,#7dd3fc 0%,#a78bfa 60%,#f9a8d4 100%)",
    accent: "#7dd3fc",
    mood:
      "floating serenity — like looking through a rain-speckled window at soft lights",
    flow:
      "frosted panels layer over a living, blurred backdrop, so depth itself guides the eye downward",
    conceptHint: "a sleek, ambient digital product for a connected world",
    typefeel:
      "light, airy sans-serif with generous weight contrast — modern, weightless, calm",
    motion:
      "liquid and glassy — cards drift, focus shifts, and everything moves like light through water",
    arc: "begin in soft haze, focus through translucent layers of proof, and end with a call-to-action that feels like stepping through the glass",
    refs: "frosted glass partitions, aquarium light, and the glow of dusk through wet streets",
    craft:
      "luminous palettes, subtle specular highlights, and the craft of making air feel tangible",
    essence:
      "quiet depth — a page that feels like a place you could walk into",
  },
  {
    id: "retro-futuristic",
    name: "Retro-futuristic",
    tagline: "80s vision of the future, refined nostalgia",
    swatch: "linear-gradient(135deg,#ff2e88 0%,#2b1e4f 60%,#0ff 100%)",
    accent: "#ff2e88",
    mood:
      "wonder and optimism — the thrill of a future promised thirty years early",
    flow:
      "sunset gradients, chrome lines, and grid horizons carry the eye like a launch countdown",
    conceptHint: "a bold, optimistic venture that feels ahead of its time",
    typefeel:
      "bold geometric type with neon undertones — confident, playful, unmistakably retro",
    motion:
      "smooth and cinematic — glowing trails, scanlines, and gentle synthwave pulses",
    arc: "open at the horizon of tomorrow, climb through visions of progress, and land on a call-to-action that says the future is now",
    refs: "vintage sci-fi posters, arcade glow, and the optimism of the space age",
    craft:
      "chrome reflections, CRT glow, and the romance of analog futures",
    essence:
      "playful yearning — a page that makes the past's future feel like your present",
  },
  {
    id: "bauhaus",
    name: "Bauhaus",
    tagline: "geometric simplicity, primary shapes, form follows function",
    swatch: "linear-gradient(135deg,#e63946 0%,#ffd166 50%,#264653 100%)",
    accent: "#e63946",
    mood:
      "joyful clarity — the satisfaction of a problem solved with pure geometry",
    flow:
      "circles, squares, and bold color blocks create a rhythm that feels engineered and alive",
    conceptHint: "a functional, honest product with design at its core",
    typefeel:
      "geometric sans-serif with circular details — democratic, disciplined, modern",
    motion:
      "crisp and mechanical — shapes snap into place with the certainty of a well-made machine",
    arc: "begin with a bold abstract statement, build through functional proof, and finish on a call-to-action as direct as a primary color",
    refs: "Bauhaus workshops, De Stijl compositions, and the honest beauty of industrial design",
    craft:
      "workshop hands, functional honesty, and geometry as a complete language",
    essence:
      "essential vitality — where less is not minimal, it is complete",
  },
  {
    id: "art-deco",
    name: "Art Deco",
    tagline: "elegant patterns, luxury, vintage sophistication",
    swatch: "linear-gradient(135deg,#1a1a2e 0%,#c9a227 75%)",
    accent: "#c9a227",
    mood:
      "gilded elegance — the hush of a jazz-age ballroom at midnight",
    flow:
      "symmetrical compositions, sunburst motifs, and gold-line borders turn the page into a procession",
    conceptHint: "a premium experience built on heritage and craftsmanship",
    typefeel:
      "tall, regal display serifs with sharp geometric serifs — luxurious and self-assured",
    motion:
      "choreographed and grand — reveals sweep in like a curtain opening",
    arc: "open as a grand entrance, move through ornate proof of excellence, and end with a call-to-action that feels like being handed a golden key",
    refs: "chrome skyscrapers, ocean-liner lounges, and the geometry of the Chrysler spire",
    craft:
      "marquetry, lacquer, and the polish of a cigarette case in an art-house film",
    essence:
      "old-money glamour — a page that makes the visitor feel invited somewhere exclusive",
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "extreme reduction, maximum whitespace, essential only",
    swatch: "linear-gradient(135deg,#f5f5f4 0%,#d6d3d1 100%)",
    accent: "#57534e",
    mood:
      "stillness — the relief of a room with nothing unnecessary in it",
    flow:
      "one idea per viewport, vast quiet space, and a scroll so gentle it feels like breathing",
    conceptHint: "an essential, focused service for people who value simplicity",
    typefeel:
      "spare, perfectly weighted sans-serif — quiet, exact, almost whispered",
    motion:
      "barely-there and buttery — the gentlest fades, the least motion that still feels alive",
    arc: "begin with a single essential line, let silence carry the middle, and end on a call-to-action that asks for nothing more than a nod",
    refs: "zen gardens, gallery walls, and the negative space in a Japanese woodblock print",
    craft:
      "museum curation, fine joinery, and the luxury of emptiness",
    essence:
      "essential poise — a page that says everything by showing almost nothing",
  },
  {
    id: "flat",
    name: "Flat",
    tagline: "no depth, solid colors, simple icons, clean",
    swatch: "linear-gradient(135deg,#60a5fa 0%,#fbbf24 100%)",
    accent: "#3b82f6",
    mood:
      "cheerful clarity — the straightforward warmth of a well-drawn children's book",
    flow:
      "solid color blocks and simple icons stack with total legibility; scrolling feels like flipping through friendly flashcards",
    conceptHint: "a friendly, accessible product for everyone",
    typefeel:
      "rounded geometric sans-serif — friendly, uncomplicated, universally legible",
    motion:
      "bright and bouncy — quick, satisfying micro-animations with no unnecessary flourish",
    arc: "open with a warm hello, progress through simple illustrated steps, and finish on a call-to-action as clear as a smile",
    refs: "mid-century poster art, wayfinding signage, and the simplicity of classic board games",
    craft:
      "color-field discipline, crisp vector edges, and the charm of the straightforward",
    essence:
      "honest optimism — a page with nothing to hide and no need for shadows",
  },
  {
    id: "material",
    name: "Material",
    tagline: "Google-inspired, cards, subtle shadows, motion",
    swatch: "linear-gradient(135deg,#4f46e5 0%,#0ea5e9 100%)",
    accent: "#4f46e5",
    mood:
      "familiar and reassuring — the comfort of a well-designed everyday object",
    flow:
      "layered cards with soft elevation carry the eye down like a tidy stack of well-organized thoughts",
    conceptHint: "a dependable everyday tool that just works",
    typefeel:
      "clear, contemporary sans-serif — friendly, legible, quietly dependable",
    motion:
      "responsive and physical — surfaces lift, ripple, and settle as if touched",
    arc: "begin with a clear entry point, guide through organized proof, and end with a call-to-action that feels like the natural next tap",
    refs: "well-designed furniture, subway signage, and the tactility of printed paper",
    craft:
      "elevation and light, thoughtful motion physics, and interface consistency",
    essence:
      "calm utility — a page that feels like it has always existed and always worked",
  },
  {
    id: "neumorphic",
    name: "Neumorphic",
    tagline: "soft shadows, extruded elements, tactile",
    swatch: "linear-gradient(135deg,#e0e0e0 0%,#f5f5f5 100%)",
    accent: "#9ca3af",
    mood:
      "tactile calm — the hush of pressing a perfectly soft button",
    flow:
      "extruded panels carved from a single background guide the eye with soft relief rather than hard lines",
    conceptHint: "a calming, tactile product for mindful interaction",
    typefeel:
      "soft, rounded sans-serif — gentle, close, and quietly modern",
    motion:
      "plush and satisfying — elements depress and release with a physical, almost felt quality",
    arc: "begin softly, build through embedded proof, and end on a call-to-action that begs to be pressed",
    refs: "sculpted clay, brushed-metal instrument panels, and the tactility of well-made objects",
    craft:
      "material subtlety, light as a modeling tool, and the feel of things made by hand",
    essence:
      "gentle depth — a page that feels soft to the touch even on a screen",
  },
  {
    id: "monochromatic",
    name: "Monochromatic",
    tagline: "single color variations, tonal depth",
    swatch: "linear-gradient(135deg,#0f172a 0%,#cbd5e1 100%)",
    accent: "#334155",
    mood:
      "focused immersion — the drama of a world rendered in one color's full range",
    flow:
      "tonal gradients and layered tints create depth without hue; scrolling feels like descending through different depths of the same water",
    conceptHint: "a focused brand that commits to a single identity",
    typefeel:
      "clean, contemporary sans-serif with weight used as the primary differentiator",
    motion:
      "smooth and tonal — transitions expressed through light and shadow rather than color",
    arc: "begin in the lightest shade, deepen through tone and texture, and end on a call-to-action that gathers all shades into one statement",
    refs: "monochrome photography, ink washes, and the mood of a moonlit landscape",
    craft:
      "tonal grading, printmaking restraint, and the power of a single commitment",
    essence:
      "disciplined atmosphere — a page that proves one color is a universe",
  },
  {
    id: "scandinavian",
    name: "Scandinavian",
    tagline: "hygge, natural materials, warm minimalism",
    swatch: "linear-gradient(135deg,#f4e9dc 0%,#a8c3a0 100%)",
    accent: "#8aa77d",
    mood:
      "warm welcome — the comfort of wool, pale wood, and candlelight",
    flow:
      "light, uncluttered sections with soft curves carry the eye like a walk through a sunlit room",
    conceptHint: "a warm, human service built around everyday comfort",
    typefeel:
      "humanist sans-serif with warm, open letterforms — friendly and unpretentious",
    motion:
      "gentle and organic — transitions as soft as morning light shifting across a floor",
    arc: "open like a calm morning, build through honest, human proof, and end on a call-to-action that feels like an invitation to sit down",
    refs: "nordic interiors, birch forests, and the ritual of fika",
    craft:
      "handmade textiles, honest wood grain, and the warmth of the imperfect",
    essence:
      "quiet togetherness — a page that feels like home at its most considered",
  },
  {
    id: "japandi",
    name: "Japandi",
    tagline: "Japanese-Scandinavian fusion, zen meets hygge",
    swatch: "linear-gradient(135deg,#e8e0d5 0%,#7c8a6f 100%)",
    accent: "#7c8a6f",
    mood:
      "serene balance — the stillness of a raked garden meeting the warmth of a wool blanket",
    flow:
      "asymmetric balance, natural textures, and breathing room guide the eye with quiet intention",
    conceptHint: "a serene, considered product for a slower way of living",
    typefeel:
      "light, airy sans-serif with subtle weight shifts — serene, restrained, refined",
    motion:
      "slow and deliberate — the unhurried grace of a tea ceremony",
    arc: "begin in stillness, progress through humble, crafted proof, and end on a call-to-action as quiet and certain as a bow",
    refs: "wabi-sabi philosophy, Japanese joinery, and nordic hygge intertwined",
    craft:
      "imperfection honored, natural materials, and the elegance of understatement",
    essence:
      "considered calm — a page that slows the visitor down without asking",
  },
  {
    id: "dark-mode-first",
    name: "Dark Mode First",
    tagline: "designed for dark interfaces, high contrast elegance",
    swatch: "linear-gradient(135deg,#0b0b12 0%,#6366f1 100%)",
    accent: "#818cf8",
    mood:
      "cinematic focus — the hush of a theater as the lights go down",
    flow:
      "deep surfaces with luminous highlights structure the eye like a night-city skyline",
    conceptHint: "a sleek, focused product built for the night",
    typefeel:
      "crisp, glowing sans-serif on near-black — sharp, premium, and effortlessly cool",
    motion:
      "smooth and luminous — glows bloom, borders breathe, and light moves like aurora",
    arc: "open in darkness, reveal through points of light, and end on a call-to-action that burns like a beacon",
    refs: "nocturnal cityscapes, observatory software, and the glow of a screen in a dark room",
    craft:
      "luminous detail, careful contrast ratios, and the luxury of the night",
    essence:
      "nocturnal elegance — a page that feels like the best part of staying up late",
  },
  {
    id: "modernist",
    name: "Modernist",
    tagline: "clean lines, functional beauty, timeless",
    swatch: "linear-gradient(135deg,#d8d8d4 0%,#4a4a44 100%)",
    accent: "#4a4a44",
    mood:
      "quiet integrity — the confidence of a building that has aged well",
    flow:
      "open, uncluttered sections with strong horizontal lines carry the eye like a walk through a designed interior",
    conceptHint: "a durable, well-made service built to last",
    typefeel:
      "rational sans-serif with clear hierarchy — honest, durable, quietly confident",
    motion:
      "economical and purposeful — every transition earns its place",
    arc: "begin with a clear statement of purpose, progress through functional proof, and end on a call-to-action that feels like a well-made door",
    refs: "modernist architecture, functionalist furniture, and the honesty of bare materials",
    craft:
      "proportion, material honesty, and design that serves people first",
    essence:
      "timeless function — a page that will look right in twenty years",
  },
  {
    id: "organic",
    name: "Organic / Fluid",
    tagline: "flowing shapes, natural curves, sophisticated blob forms",
    swatch: "linear-gradient(135deg,#34d399 0%,#818cf8 100%)",
    accent: "#34d399",
    mood:
      "liquid ease — the sensation of being carried by a gentle current",
    flow:
      "undulating blobs and fluid curves ripple down the page, making the scroll feel like a swim",
    conceptHint: "a nurturing, fluid product that feels natural",
    typefeel:
      "rounded, humanist sans-serif with soft terminals — warm, approachable, alive",
    motion:
      "liquid and continuous — shapes morph, blend, and flow without hard cuts",
    arc: "begin like a drop of water, build into a current of proof, and end on a call-to-action that feels like arriving at a shore",
    refs: "water surfaces, cloud formations, and the biology of cells under a microscope",
    craft:
      "natural motion physics, gradient depth, and the elegance of organic form",
    essence:
      "living flow — a page that feels less built than grown",
  },
  {
    id: "corporate",
    name: "Corporate Professional",
    tagline: "trust-building, established, refined",
    swatch: "linear-gradient(135deg,#0f2a4a 0%,#3b82f6 100%)",
    accent: "#3b82f6",
    mood:
      "steady reassurance — the calm of a well-run institution",
    flow:
      "ordered sections with clear governance carry the eye like reading a meticulously prepared annual report",
    conceptHint: "a credible, established service built on trust",
    typefeel:
      "solid, refined sans-serif — credible, composed, and quietly authoritative",
    motion:
      "measured and composed — deliberate transitions that signal stability",
    arc: "open with credibility, build through evidence and numbers, and end on a call-to-action that feels like signing with confidence",
    refs: "grand boardrooms, established financial districts, and the quiet authority of good tailoring",
    craft:
      "governance, precision, and the trust earned through consistency",
    essence:
      "dependable gravitas — a page that makes commitment feel safe",
  },
  {
    id: "tech-forward",
    name: "Tech Forward",
    tagline: "innovative, clean, future-focused",
    swatch: "linear-gradient(135deg,#0a2540 0%,#7c3aed 100%)",
    accent: "#7c3aed",
    mood:
      "sharp anticipation — the feeling of standing at the leading edge",
    flow:
      "clean, spacious sections with crisp lines and subtle grids carry the eye like a well-architected interface",
    conceptHint: "an ambitious product at the leading edge",
    typefeel:
      "geometric sans-serif with technical precision — sharp, fast, and forward-leaning",
    motion:
      "snappy and precise — micro-interactions that feel engineered, not decorated",
    arc: "open with the future in one sentence, build through capability and proof, and end on a call-to-action that says ship it",
    refs: "aerospace instrumentation, clean-room labs, and the clarity of good documentation",
    craft:
      "engineering precision, restrained gradients, and the polish of the inevitable",
    essence:
      "engineered optimism — a page that makes the next big thing feel inevitable",
  },
  {
    id: "luxury-minimal",
    name: "Luxury Minimal",
    tagline: "premium restraint, high-end simplicity",
    swatch: "linear-gradient(135deg,#111111 0%,#c9a96a 100%)",
    accent: "#c9a96a",
    mood:
      "hushed opulence — the stillness of a gallery after closing time",
    flow:
      "vast negative space and one object per view make every element feel curated and rare",
    conceptHint: "a rarefied, exclusive service for discerning tastes",
    typefeel:
      "refined serif with generous letter-spacing — understated, expensive, assured",
    motion:
      "slow, silken, and precise — transitions like fabric being laid down",
    arc: "begin with a single exquisite statement, deepen through rare details, and end on a call-to-action that feels like an exclusive invitation",
    refs: "boutique hotel lobbies, private viewings, and the restraint of a perfectly set table",
    craft:
      "bespoke tailoring, fine materials, and the confidence of scarcity",
    essence:
      "silent luxury — a page that whispers so softly visitors lean in",
  },
  {
    id: "neo-geo",
    name: "Neo-Geo",
    tagline: "refined geometric patterns, mathematical beauty",
    swatch: "linear-gradient(135deg,#f4f1e8 0%,#b8860b 100%)",
    accent: "#b8860b",
    mood:
      "ordered wonder — the satisfaction of geometry that resolves perfectly",
    flow:
      "repeating geometric motifs and tessellations guide the eye with the logic of a proof",
    conceptHint: "a precise, pattern-driven product with mathematical soul",
    typefeel:
      "geometric sans-serif with crisp angles — precise, intelligent, quietly dazzling",
    motion:
      "structured and rhythmic — movements that snap along invisible grids",
    arc: "begin with a single perfect shape, build through interlocking proof, and end on a call-to-action that completes the pattern",
    refs: "islamic geometric art, op-art prints, and the beauty of mathematical tiling",
    craft:
      "precision drafting, repetitive craft, and the elegance of the rule",
    essence:
      "mathematical calm — a page where every angle knows why it exists",
  },
  {
    id: "kinetic",
    name: "Kinetic",
    tagline: "motion-driven, dynamic but controlled",
    swatch: "linear-gradient(135deg,#f97316 0%,#f43f5e 100%)",
    accent: "#f97316",
    mood:
      "electric anticipation — the sense that the page is alive and performing",
    flow:
      "elements in perpetual, purposeful motion carry the eye like a choreographed dance",
    conceptHint: "a dynamic, energetic product that moves",
    typefeel:
      "bold, contemporary type that moves with the design — energetic and controlled",
    motion:
      "the centerpiece — fluid, confident choreography with rhythm and clear intent",
    arc: "open with a kinetic flourish, maintain momentum through proof, and end on a call-to-action that lands with perfect timing",
    refs: "modern dance, motion graphics, and the physics of a spinning top",
    craft:
      "choreography, timing, and restraint behind apparent chaos",
    essence:
      "controlled energy — a page that dances without ever losing its footing",
  },
  {
    id: "gradient-modern",
    name: "Gradient Modern",
    tagline: "sophisticated color transitions, depth through gradients",
    swatch: "linear-gradient(135deg,#a78bfa 0%,#34d399 60%,#fbbf24 100%)",
    accent: "#a78bfa",
    mood:
      "soft wonder — the pleasure of watching color change like a sunset",
    flow:
      "smooth, layered gradients move the eye downward like light shifting across water",
    conceptHint: "a vibrant, contemporary product full of life",
    typefeel:
      "modern sans-serif with clean lines — fresh, confident, contemporary",
    motion:
      "fluid and luminous — backgrounds shift hue gently as the visitor scrolls",
    arc: "begin in one mood of color, transition through tonal shifts, and end on a call-to-action saturated with the fullest hue",
    refs: "auroras, opals, and the gradient of sky at dusk",
    craft:
      "color theory, seamless blending, and depth made from light",
    essence:
      "living color — a page that feels like the sky between seasons",
  },
  {
    id: "typography-first",
    name: "Typography First",
    tagline: "type as the hero, letterforms as design",
    swatch: "linear-gradient(135deg,#111111 0%,#f8fafc 100%)",
    accent: "#111827",
    mood:
      "graphic force — the impact of words that are also images",
    flow:
      "oversized letterforms structure the page like architecture; scrolling feels like walking through a typographic gallery",
    conceptHint: "a words-first venture where language is the product",
    typefeel:
      "the absolute protagonist — display faces so confident they need no supporting cast",
    motion:
      "typographic reveals — letters animate with the rhythm of speech",
    arc: "open with one unforgettable word, build through typographic rhetoric, and end on a call-to-action set in type you cannot ignore",
    refs: "constructivist posters, broadsheet headlines, and the poetry of letterpress",
    craft:
      "kerning, scale, and the craft of making words feel physical",
    essence:
      "verbal monumentality — a page where type alone is the experience",
  },
  {
    id: "metropolitan",
    name: "Metropolitan",
    tagline: "urban sophistication, cultural depth",
    swatch: "linear-gradient(135deg,#2d2a32 0%,#c0b283 100%)",
    accent: "#c0b283",
    mood:
      "cosmopolitan pulse — the energy of a great city at its best hour",
    flow:
      "layered, collage-like sections with strong typographic anchors carry the eye like a walk through varied neighborhoods",
    conceptHint: "a sophisticated, culture-rich product for city life",
    typefeel:
      "bold contemporary serif-and-sans pairing — urbane, cultured, assured",
    motion:
      "sharp and stylish — transitions with the snap of a well-dressed crowd moving",
    arc: "open at street level with a magnetic headline, move through cultural depth, and end on a call-to-action that feels like an insider's tip",
    refs: "art-deco facades, street photography, and the layered history of capital cities",
    craft:
      "editorial composition, cultural curation, and the polish of urban sophistication",
    essence:
      "worldly poise — a page that feels like the address everyone wants",
  },
];

export function styleById(id: string): StyleDef | undefined {
  return STYLES.find((s) => s.id === id);
}

/** Cryptographically seeded Fisher–Yates shuffle — real variety, no favorites. */
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomInt(max: number): number {
  // Prefer crypto when available for genuine randomness.
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

/** Compose the EXACTLY-three-paragraph brief for a style. */
export function buildBrief(style: StyleDef): string[] {
  const p1 = [
    `Design a single, cohesive one-page landing page in the ${style.name} style — ${style.tagline}.`,
    `First, conceive an innovative business or service concept that this aesthetic would serve perfectly: ${style.conceptHint} — imagine something real or aspirational, and let the style shape the idea as much as the idea shapes the page.`,
    `Visitors should feel ${style.mood} from the moment they arrive.`,
    `Structure the visual hierarchy so that ${style.flow}.`,
    `Weave colorful elements throughout wherever they heighten emotional impact — never as decoration, always as atmosphere — and remember this is ONE page: the scroll should feel like a single continuous composition, not a stack of sections.`,
  ].join(" ");

  const p2 = [
    `Design every decision through the lens of emotion and user experience.`,
    `Typography should feel ${style.typefeel} — it sets the voice before a single word is read.`,
    `Interactions and motion should ${style.motion}, so the page responds with a sensation that matches its character.`,
    `Shape the single-page journey as a complete narrative arc: ${style.arc} — from the first impression at the top of the page to the final call-to-action at the bottom, one uninterrupted emotional progression.`,
    `Every section should hand the visitor's attention to the next like a sentence handing off to the one after it.`,
  ].join(" ");

  const p3 = [
    `Ground the aesthetic in abstract references rather than named examples: ${style.refs}.`,
    `Let the emotional register of ${style.craft} seep into every texture, spacing decision, and micro-detail.`,
    `These influences should shape the final design's sophistication and atmosphere — ${style.essence}.`,
    `The result must feel like ${style.name} in its purest form: unmistakable, cohesive, and impossible to mistake for a template, all within a single scrolling page.`,
  ].join(" ");

  return [p1, p2, p3];
}

/** Full copyable text: title line + the three paragraphs. */
export function buildFullText(style: StyleDef): string {
  const paragraphs = buildBrief(style);
  return [
    `${style.name} — ${style.tagline}`,
    "Single-page landing brief",
    "",
    ...paragraphs.map((p, i) => `Paragraph ${i + 1}: ${p}`),
  ].join("\n\n");
}
