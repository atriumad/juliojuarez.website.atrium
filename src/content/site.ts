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
  { label: "Dishes", href: "#dishes" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
] as const;

export const bookCta = { label: "Book a Dinner", href: "#contact" } as const;

export const hero = {
  headline: "Julio Juarez",
  subline: "Private Dining",
  body: "Eighteen years leading Kansas City's finest kitchens, brought to a single table — built around you, not a menu.",
  secondaryCta: { label: "His Story", href: "#about" },
  image: "/hero.jpg",
  imageAlt: "Chef Julio Juarez at work in the kitchen",
} as const;

export const about = {
  headline: "Eighteen years, five kitchens, one standard",
  paragraphs: [
    "Julio Juarez has spent nearly two decades leading kitchens across Kansas City — from his first executive chef post at Starkers in 2008 to his most recent role at Ocean Prime, part of the nationally recognized Cameron Mitchell Restaurants group.",
    "Along the way, he ran the kitchen at JJ's Restaurant, directed banquet and event dining at The Gallery Event Space, and led the rooftop kitchen at Prime Social. Every stop shares the same discipline: precise execution, a clean kitchen, and food that doesn't need to shout.",
    "Private Dining is the next chapter — the same standard, brought down to a single table.",
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
  // Placeholder portrait — swap for confirmed photography before publishing.
  image: "/_.jpeg",
  imageAlt: "Portrait of Chef Julio Juarez",
} as const;

export const dishes = {
  headline: "From the kitchen",
  subhead:
    "A preview of the kind of plates Julio brings to a private table — each menu is built around the occasion.",
  // Placeholder plates — dishes and photos to be confirmed before publishing.
  items: [
    {
      name: "Seared Diver Scallop",
      description: "Brown butter, blood orange, charred herb oil.",
      image: "/dish-scallop.jpeg",
    },
    {
      name: "Dry-Aged Ribeye",
      description: "Roasted bone marrow, red wine jus, fingerling potato.",
      image: "/dish-ribeye.jpeg",
    },
    {
      name: "Stone Fruit & Burrata",
      description: "Basil, aged balsamic, toasted pistachio.",
      image: "/dish-burrata.jpeg",
    },
  ],
  footnote: "Sample plates shown for direction — final selections to be confirmed.",
} as const;

export const philosophy = {
  // PENDING: Julio's sign-off before this is published under his name.
  quote:
    "I've spent my career cooking for a room. Private dining is cooking for a person — the food changes when you know exactly who it's for.",
  attribution: "Julio Juarez",
} as const;

export const contact = {
  headline: "Book a dinner",
  body: "Private dining is by inquiry. Share a few details about the occasion, and Julio will follow up to build the evening around it.",
  details: {
    location: "Kansas City, MO",
    // PENDING: confirm with Julio before publishing any number.
    email: null as string | null,
    phone: null as string | null,
  },
  form: {
    submit: "Send Inquiry",
    pending: "Sending…",
    success: "Your inquiry has been received.",
    successNote: "Julio will follow up to build the evening around it.",
    error: "We couldn't send your inquiry just now. Please try again in a moment.",
  },
} as const;

export const footer = {
  links: [
    { label: "About", href: "#about" },
    { label: "Dishes", href: "#dishes" },
    { label: "Book a Dinner", href: "#contact" },
  ],
  // PENDING: real Instagram URL. Hidden while null.
  instagram: null as string | null,
  finePrint: "© 2026 Julio Juarez Private Dining, Kansas City, MO. All rights reserved.",
} as const;
