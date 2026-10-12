/**
 * All page copy and swappable content lives here. Components render from this
 * file, so replacing placeholders never touches markup.
 *
 * Values marked PENDING are not confirmed by the client. They are rendered
 * only when set (null = hidden), so nothing invented ever ships.
 */

export const site = {
  name: "Julio Juarez",
  descriptor: "Private Dining",
  city: "Kansas City",
  markShort: "JJ",
  mark: "JJ · Private Dining",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const bookCta = { label: "Book a Dinner", href: "#contact" } as const;

export const hero = {
  eyebrow: "Private Chef · Kansas City",
  headline: "Julio Juarez",
  body: "Eighteen years leading Kansas City's finest kitchens, brought to a single table — built around you, not a menu.",
  secondaryCta: { label: "His Story", href: "#about" },
  image: "/images/hero/julio-juarez-hero-kitchen.jpg",
  imageAlt: "Chef Julio Juarez at work in the kitchen",
} as const;

export const about = {
  headline: "Eighteen years, five kitchens, one standard",
  paragraphs: [
    "Julio Juarez has spent nearly two decades leading kitchens across Kansas City — from his first executive chef post at Starkers in 2008 to his most recent role at Ocean Prime, part of the nationally recognized Cameron Mitchell Restaurants group.",
    "Along the way, he ran the kitchen at JJ's Restaurant, directed banquet and event dining at The Gallery Event Space, and led the rooftop kitchen at Prime Social. Every stop shares the same discipline: precise execution, a clean kitchen, and food that doesn't need to shout.",
    "Private chef dining is the next chapter — the same standard, brought down to a single table.",
  ],
  timelineCaption: "Career timeline",
  timeline: [
    { years: "2008–2013", role: "Executive Chef", place: "Starkers Restaurant" },
    { years: "2014–2017", role: "Executive Chef", place: "The Gallery Event Space" },
    { years: "2017–2021", role: "Executive Chef", place: "JJ's Restaurant" },
    { years: "2021–2023", role: "Executive Chef", place: "Prime Social, Cameron Mitchell Restaurants" },
    { years: "2023–2026", role: "Executive Chef", place: "Ocean Prime, Cameron Mitchell Restaurants" },
  ],
  education: "B.A., Universidad Autónoma Benito Juárez de Oaxaca, Mexico",
  image: "/images/chef/julio-juarez-portrait.jpg",
  imageAlt: "Portrait of Chef Julio Juarez",
} as const;

const img = (path: string) => `/images/${path}.jpg`;

export const gallery = {
  // Visually-hidden heading: the section shows photos only.
  headline: "Gallery",
  // Two rows drifting in opposite directions. Order alternates plates and Julio
  // so neither reads as a run of one subject.
  rows: [
    [
      { src: img("dishes/ribeye-lobster-board"), alt: "Sliced ribeye and lobster tail on a wooden board with three sauces" },
      { src: img("kitchen/julio-juarez-plating-01"), alt: "Julio Juarez plating dishes in the kitchen" },
      { src: img("dishes/rack-of-lamb"), alt: "Herb-crusted rack of lamb with red cabbage and jus" },
      { src: img("kitchen/julio-juarez-hosting-table"), alt: "Julio Juarez serving guests at the table" },
      { src: img("dishes/tartare-plate"), alt: "Tartare finished with edible flowers in a dark bowl" },
      { src: img("kitchen/julio-juarez-kitchen-team-01"), alt: "Julio Juarez working with a fellow chef at the pass" },
      { src: img("dishes/bread-pudding-dessert"), alt: "Bread pudding dessert with ice cream and caramel" },
      { src: img("kitchen/julio-juarez-plating-ceviche"), alt: "Julio Juarez plating a ceviche tower with tweezers" },
      { src: img("chef/julio-juarez-ocean-prime-duo-02"), alt: "Julio Juarez and a fellow chef at Ocean Prime" },
      { src: img("kitchen/julio-juarez-plating-02"), alt: "Julio Juarez plating in a professional kitchen" },
    ],
    [
      { src: img("chef/julio-juarez-kitchen-portrait-01"), alt: "Chef Julio Juarez with arms crossed in the kitchen" },
      { src: img("dishes/lobster-tail-sauces"), alt: "Roasted lobster tail with dipping sauces" },
      { src: img("chef/julio-juarez-ocean-prime-trio"), alt: "Julio Juarez seated at the bar with two fellow chefs at Ocean Prime" },
      { src: img("kitchen/julio-juarez-molcajete"), alt: "Julio Juarez grinding with a molcajete" },
      { src: img("chef/julio-juarez-bw-lamps"), alt: "Black and white portrait of Chef Julio Juarez looking off-camera" },
      { src: img("chef/julio-juarez-kitchen-portrait-02"), alt: "Portrait of Chef Julio Juarez in his kitchen" },
      { src: img("kitchen/julio-juarez-kitchen-team-02"), alt: "Julio Juarez preparing food alongside a colleague" },
      { src: img("chef/julio-juarez-ocean-prime-duo-01"), alt: "Julio Juarez with arms crossed beside a fellow chef at Ocean Prime" },
      { src: img("chef/julio-juarez-bw-seated"), alt: "Black and white shot of Julio Juarez seated in the dining room" },
      { src: img("kitchen/julio-juarez-plating-hands"), alt: "Hands carrying a freshly plated dish" },
    ],
  ],
} as const;

// Answers come straight from Julio. Not yet confirmed, so deliberately absent:
// booking lead time, who pays for groceries, and any pricing figure.
export const faq = {
  eyebrow: "Questions",
  headline: "Before you book",
  items: [
    {
      q: "What does a private dinner include?",
      a: "A complete dinner at your table. Julio shops for everything, cooks the meal himself, and cleans up when the evening is over.",
    },
    {
      q: "Where do you cook?",
      a: "Across the Kansas City metropolitan area, at your home or wherever you're hosting.",
    },
    {
      q: "How many guests do you cook for?",
      a: "Two people at minimum.",
    },
    {
      q: "How do we plan the menu and handle allergies?",
      a: "Julio builds the menu with you, allergies and dietary needs included, when he comes to your home or office to present his proposal. That visit is free.",
    },
    {
      q: "How much does it cost?",
      a: "Every dinner is built around the people at the table, so Julio talks through details and pricing in person, once he's sat down with you.",
    },
  ],
  cta: { label: "Start an inquiry", href: "#contact" },
} as const;

export const philosophy = {
  // PENDING: Julio's sign-off before this is published under his name.
  quote:
    "I've spent my career cooking for a room. Private dining is cooking for a person — the food changes when you know exactly who it's for.",
  attribution: "Julio Juarez",
} as const;

export const contact = {
  headline: "Book a dinner",
  body: "Private chef dining in Kansas City is by inquiry. Share a few details about the occasion, and Julio will follow up to build the evening around it.",
  details: {
    location: "Kansas City, MO",
    email: "info@chefjuliojuarez.com" as string | null,
    // PENDING: confirm with Julio before publishing any number.
    phone: null as string | null,
  },
  form: {
    submit: "Send Inquiry",
    pending: "Sending…",
    success: "Your inquiry has been received.",
    successNote: "Julio will follow up to build the evening around it.",
    // PENDING: confirm a real response time with Julio (e.g. "within 48 hours"). Hidden while null.
    responseNote: null as string | null,
    error: "We couldn't send your inquiry just now. Please try again in a moment.",
    rateLimited: "You've sent several inquiries in a short time. Please try again later.",
  },
} as const;

export const footer = {
  links: [
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book a Dinner", href: "#contact" },
  ],
  // PENDING: real Instagram URL. Hidden while null.
  instagram: null as string | null,
  finePrint: "© 2026 Julio Juarez Private Dining, Kansas City, MO. All rights reserved.",
} as const;
